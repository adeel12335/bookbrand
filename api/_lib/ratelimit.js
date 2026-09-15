/**
 * Per-instance sliding-window limiter.
 *
 * Serverless means this is not a global count — a burst spread across many cold
 * instances gets a fresh budget each time. It is still worth having: the cheap
 * attacks (one machine hammering one endpoint) reuse a warm instance and get
 * stopped, and it costs nothing. For a hard global limit you would put the
 * counter in Neon or a KV store; that is a deliberate trade, not an oversight.
 */
const buckets = new Map();
const MAX_KEYS = 5000;

function prune(now) {
  for (const [key, bucket] of buckets) {
    if (bucket.reset <= now) buckets.delete(key);
  }
  // Pathological case: thousands of live keys. Drop the oldest half rather than
  // letting the map grow without bound.
  if (buckets.size > MAX_KEYS) {
    const sorted = [...buckets.entries()].sort((a, b) => a[1].reset - b[1].reset);
    for (const [key] of sorted.slice(0, Math.floor(sorted.length / 2))) buckets.delete(key);
  }
}

export function rateLimit(key, { limit, windowMs }) {
  const now = Date.now();
  if (buckets.size > 64) prune(now);

  const bucket = buckets.get(key);
  if (!bucket || bucket.reset <= now) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  bucket.count += 1;
  if (bucket.count > limit) {
    return { ok: false, retryAfter: Math.max(1, Math.ceil((bucket.reset - now) / 1000)) };
  }
  return { ok: true, retryAfter: 0 };
}

/** Writes the 429 and returns false when the caller should stop. */
export function enforceLimit(req, res, key, options) {
  const { ok, retryAfter } = rateLimit(key, options);
  if (ok) return true;
  res.statusCode = 429;
  res.setHeader('Retry-After', String(retryAfter));
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify({
    error: `Too many attempts. Try again in ${retryAfter} second${retryAfter === 1 ? '' : 's'}.`,
  }));
  return false;
}
