import React from 'react';
import { Link } from 'react-router-dom';
import { IconBook } from './icons.jsx';

export function PostCard({ post }) {
  return (
    <Link className="br_post_link" to={`/blog/${post.slug}`}>
      {post.image ? (
        <div className="br_post_media">
          <img
            className="br_post_thumb"
            src={post.image}
            alt={post.imageAlt || post.title}
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : (
        <div className="br_post_media br_post_media--blank" aria-hidden="true">
          <IconBook />
        </div>
      )}
      <div className="br_post_body">
        <ul className="br_post_tags">
          <li>{post.category}</li>
        </ul>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <div className="br_post_foot">
          <time dateTime={post.date}>{post.dateLabel}</time>
          <span className="br_post_read">{post.readTime}</span>
        </div>
      </div>
    </Link>
  );
}
