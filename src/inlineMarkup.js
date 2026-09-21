const TOKEN =
  /<a href="([^"]+)">([^<]*)<\/a>|\*\*([^*]+)\*\*|\[([^\]]+)\]\((\/[^)\s]+|https?:\/\/[^)\s]+)\)/g;

export function tokenizeInline(text) {
  const source = String(text ?? '');
  const tokens = [];
  let last = 0;
  const re = new RegExp(TOKEN.source, 'g');
  let match;
  while ((match = re.exec(source))) {
    if (match.index > last) {
      tokens.push({ type: 'text', value: source.slice(last, match.index) });
    }
    if (match[1] != null) {
      tokens.push({ type: 'link', href: match[1], value: match[2] });
    } else if (match[3] != null) {
      tokens.push({ type: 'strong', value: match[3] });
    } else {
      tokens.push({ type: 'link', href: match[5], value: match[4] });
    }
    last = match.index + match[0].length;
  }
  if (last < source.length) tokens.push({ type: 'text', value: source.slice(last) });
  return tokens.length ? tokens : [{ type: 'text', value: source }];
}

export function appPath(href) {
  if (!href) return href;
  if (href.startsWith('/')) return href;
  try {
    const url = new URL(href);
    if (url.hostname === 'www.ebookwriters.us' || url.hostname === 'ebookwriters.us') {
      return `${url.pathname}${url.search}${url.hash}` || '/';
    }
  } catch {
    /* keep original */
  }
  return href;
}

export function inlineHtml(text, escapeFn) {
  return tokenizeInline(text)
    .map(token => {
      if (token.type === 'strong') return `<strong>${escapeFn(token.value)}</strong>`;
      if (token.type === 'link') {
        return `<a href="${escapeFn(token.href)}">${escapeFn(token.value)}</a>`;
      }
      return escapeFn(token.value);
    })
    .join('');
}
