import React from 'react';
import { Link } from 'react-router-dom';
import { appPath, tokenizeInline } from './inlineMarkup.js';

/** Renders copy with **bold** and [label](/path) links from inlineMarkup.js. */
export function RichText({ text }) {
  return tokenizeInline(text).map((token, i) => {
    if (token.type === 'strong') return <strong key={i}>{token.value}</strong>;
    if (token.type === 'link') {
      const href = appPath(token.href);
      if (href.startsWith('/')) {
        return <Link key={i} to={href}>{token.value}</Link>;
      }
      return (
        <a key={i} href={href} rel="noopener noreferrer">
          {token.value}
        </a>
      );
    }
    return <React.Fragment key={i}>{token.value}</React.Fragment>;
  });
}
