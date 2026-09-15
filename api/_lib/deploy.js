/**
 * The blog is prerendered at build time so each article ships real HTML for
 * crawlers. Writing a post to Neon therefore is not enough on its own — the
 * site has to rebuild for the new article to exist as an indexable page.
 * Set DEPLOY_HOOK_URL to a Vercel deploy hook and publishing does that itself.
 */
export async function triggerRebuild() {
  const url = process.env.DEPLOY_HOOK_URL;
  if (!url) return { triggered: false, reason: 'DEPLOY_HOOK_URL is not set' };
  try {
    const res = await fetch(url, { method: 'POST' });
    if (!res.ok) return { triggered: false, reason: `Deploy hook returned ${res.status}` };
    return { triggered: true };
  } catch (error) {
    return { triggered: false, reason: error.message };
  }
}
