import React, { useState } from 'react';
import PostCard from '@/components/features/blog';
import { posts, categories } from '@/data/posts';
import SEOHead from '@/components/features/seo';
import { SITE_CONFIG } from '@/config/site';

const Destinations: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredPosts = selectedCategory === 'Todos' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <SEOHead 
        title="Destinos Turísticos de La Convención - Guía Completa"
        description="Explora todos los destinos turísticos de La Convención: naturaleza, aventura, cultura y gastronomía en el corazón de Cusco."
        keywords="destinos La Convención, turismo Cusco, lugares turísticos Perú, qué visitar Quillabamba"
        url={`${SITE_CONFIG.url}/destinations`}
      />
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#212121] dark:text-white mb-4 tracking-tight">
              Todos los Destinos
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              Explora nuestra colección completa de artículos sobre viajes, destinos y experiencias en La Convención.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-[#1B5E20] dark:bg-[#4CAF50] text-white'
                    : 'bg-white dark:bg-slate-800 text-[#212121] dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700'
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
              <p className="text-gray-600 dark:text-gray-300 text-lg">
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