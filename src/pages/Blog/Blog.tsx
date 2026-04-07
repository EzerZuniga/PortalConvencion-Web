import React, { useState } from 'react';
import { Calendar, User, Search } from 'lucide-react';
import SEOHead from '@/components/features/seo';
import { SITE_CONFIG } from '@/config/site';
import { blogPosts, blogCategories } from '@/data/gastronomia';

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "Todos" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <SEOHead 
        title="Blog de Viajes - Explorando la Convención | Artículos y Consejos de Turismo"
        description="Lee nuestros últimos artículos sobre viajes, destinos turísticos de La Convención y Cusco, consejos prácticos y experiencias de viaje en Perú."
        keywords="blog de viajes, artículos de turismo, consejos de viaje, destinos Perú, La Convención, blog turismo"
        url={`${SITE_CONFIG.url}/blog`}
        type="blog"
      />
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center text-white">
        <img 
          src="/images/destinos/andes-trekking.jpg" 
          alt="Blog" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg tracking-tight">Blog</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto px-4 font-light">
            Historias, consejos y descubrimientos de La Convención
          </p>
        </div>
      </section>

      {/* Buscador y Filtros */}
      <section className="section-padding bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Buscador */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-[#212121] dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
              />
            </div>
            
            {/* Filtros por categoría */}
            <div className="flex flex-wrap gap-2">
              {blogCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-[#1B5E20] dark:bg-[#4CAF50] text-white'
                      : 'bg-gray-200 dark:bg-slate-700 text-[#212121] dark:text-white hover:bg-gray-300 dark:hover:bg-slate-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Posts del Blog */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 dark:text-gray-300">No se encontraron artículos que coincidan con tu búsqueda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <article key={post.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#1B5E20]">
                  <div className="relative h-48">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-4 left-4 bg-[#212121] dark:bg-white text-white dark:text-[#212121] px-3 py-1 rounded-full text-sm font-semibold">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#212121] dark:text-white mb-3 hover:text-[#1B5E20] dark:hover:text-[#4CAF50] transition-colors cursor-pointer">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-slate-700 pt-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                      </div>
                      <span className="text-[#212121] dark:text-white font-medium">{post.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-gradient-to-r from-[#1B5E20] to-[#4CAF50] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Suscríbete a Nuestro Newsletter</h2>
          <p className="text-lg mb-8">Recibe las últimas noticias, consejos y artículos directamente en tu correo</p>
          <form className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-6 py-3 rounded-lg text-[#212121] focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-white text-[#1B5E20] font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Suscribirme
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Blog;
