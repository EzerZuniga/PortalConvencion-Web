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
      className="group bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden border border-gray-100 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500"
      role="article"
      aria-label={`Artículo: ${post.title}`}
    >
      <Link
        to={`/post/${post.id}`}
        className="relative h-52 overflow-hidden bg-gray-200 dark:bg-slate-700 block"
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
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-snug group-hover/title:text-primary-500 transition-colors duration-200">
            {post.title}
          </h3>
        </Link>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
          {post.excerpt}
        </p>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-slate-600 to-transparent mb-4" />

        <div className="space-y-2.5">
          <div className="flex items-center text-sm text-gray-700 dark:text-gray-200">
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-500/10 dark:bg-primary-500/20 mr-2.5">
              <User size={14} className="text-primary-500" />
            </div>
            <span className="font-medium">{post.author}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <Calendar size={13} className="text-gray-400 dark:text-gray-500" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-slate-700/50 px-2.5 py-1 rounded-full">
              <Clock size={13} className="text-gray-400 dark:text-gray-500" />
              <span className="font-medium">{post.readTime}</span>
            </div>
          </div>
        </div>

        <Link
          to={`/post/${post.id}`}
          className="mt-4 w-full inline-flex items-center justify-center gap-2 text-primary-900 hover:text-white dark:text-white bg-primary-500/10 dark:bg-primary-500/20 hover:bg-primary-500 dark:hover:bg-primary-900 font-semibold py-3 px-4 rounded-xl transition-all duration-300 group/btn focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
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
