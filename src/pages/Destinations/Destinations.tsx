import React, { useState } from 'react';
import PostCard from '@/components/features/blog';
import { SectionHeader } from '@/components/ui';
import { posts, categories } from '@/data/posts';
import SEOHead from '@/components/features/seo';
import { SITE_CONFIG } from '@/config/site';

const Destinations: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredPosts = selectedCategory === 'Todos' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="wp-shell">
      <SEOHead 
        title="Destinos Turísticos de La Convención - Guía Completa"
        description="Explora todos los destinos turísticos de La Convención: naturaleza, aventura, cultura y gastronomía en el corazón de Cusco."
        keywords="destinos La Convención, turismo Cusco, lugares turísticos Perú, qué visitar Quillabamba"
        url={`${SITE_CONFIG.url}/destinations`}
      />
      <div className="wp-section">
        <div className="wp-container">
          {/* Header */}
          <SectionHeader
            title="Todos los Destinos"
            subtitle="Explora nuestra colección completa de artículos sobre viajes, destinos y experiencias en La Convención."
          />

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`wp-btn ${
                  selectedCategory === category
                    ? 'bg-accent-600 text-white dark:bg-accent-500'
                    : 'bg-white dark:bg-primary-900 text-ink-900 dark:text-white border border-[var(--color-border)] dark:border-primary-700 hover:bg-primary-50 dark:hover:bg-primary-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-ink-600 dark:text-slate-300 text-lg">
                No hay artículos en esta categoría.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
