import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, Calendar, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { Post } from '@/types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article
      className="group wp-card wp-card-interactive h-full flex flex-col overflow-hidden hover:border-primary-500 dark:hover:border-primary-500"
      role="article"
      aria-label={`Artículo: ${post.title}`}
    >
      <Link
        to={`/post/${post.id}`}
        className="relative h-52 overflow-hidden bg-earth-200 dark:bg-primary-700 block"
        aria-label={`Ver artículo completo: ${post.title}`}
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      <div className="p-5 flex-1 flex flex-col">
        <Link to={`/post/${post.id}`} className="group/title">
          <h3 className="font-heading text-xl font-bold text-ink-900 dark:text-white mb-2 line-clamp-2 leading-snug group-hover/title:text-primary-700 dark:group-hover/title:text-primary-300 transition-colors duration-300">
            {post.title}
          </h3>
        </Link>

        <p className="text-ink-600 dark:text-slate-300 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
          {post.excerpt}
        </p>

        <div className="h-px bg-gradient-to-r from-transparent via-earth-200 dark:via-primary-700 to-transparent mb-4" />

        <div className="space-y-2.5">
          <div className="flex items-center text-sm text-ink-700 dark:text-slate-200">
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-500/10 dark:bg-primary-500/20 mr-2.5">
              <User size={14} className="text-accent-600" />
            </div>
            <span className="font-medium">{post.author}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-ink-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <Calendar size={13} className="text-ink-400 dark:text-slate-500" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-earth-100 dark:bg-primary-800/60 px-2.5 py-1 rounded-full">
              <Clock size={13} className="text-ink-400 dark:text-slate-500" />
              <span className="font-medium">{post.readTime}</span>
            </div>
          </div>
        </div>

        <Link
          to={`/post/${post.id}`}
          className="mt-4 w-full wp-btn-secondary group/btn"
          aria-label={`Leer el artículo completo: ${post.title}`}
        >
          <span>Leer artículo</span>
          <ArrowRight
            size={18}
            className="transform group-hover/btn:translate-x-1 transition-transform duration-200"
          />
        </Link>
      </div>
    </article>
  );
};

export default PostCard;
