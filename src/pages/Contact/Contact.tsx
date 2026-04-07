import React, { useState } from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import SEOHead from '@/components/features/seo';
import { SITE_CONFIG } from '@/config/site';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    alert('¡Mensaje enviado! Gracias por contactarnos.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <SEOHead 
        title="Contáctanos - Explorando la Convención"
        description="¿Tienes preguntas o quieres colaborar? Contáctanos por email, teléfono o visítanos en Quillabamba, La Convención."
        keywords="contacto explorando la convención, contactar, email, teléfono, Quillabamba"
        url={`${SITE_CONFIG.url}/contact`}
      />
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#212121] dark:text-white mb-4 tracking-tight">
              Contáctanos
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              ¿Tienes preguntas, sugerencias o quieres colaborar con nosotros? 
              Estamos aquí para ayudarte.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border-l-4 border-[#1B5E20]">
                <h2 className="text-2xl md:text-3xl font-bold text-[#212121] dark:text-white mb-6 tracking-tight">
                  Información de Contacto
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-[#E8F5E9] dark:bg-slate-700 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#1B5E20] dark:text-[#4CAF50]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#212121] dark:text-white">Email</h3>
                      <p className="text-gray-600 dark:text-gray-300">{SITE_CONFIG.contact.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-[#E8F5E9] dark:bg-slate-700 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#1B5E20] dark:text-[#4CAF50]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#212121] dark:text-white">Teléfono</h3>
                      <p className="text-gray-600 dark:text-gray-300">{SITE_CONFIG.contact.phone}</p>
                      <p className="text-gray-600 dark:text-gray-300">{SITE_CONFIG.contact.schedule}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-[#E8F5E9] dark:bg-slate-700 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#1B5E20] dark:text-[#4CAF50]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#212121] dark:text-white">Oficina</h3>
                      <p className="text-gray-600 dark:text-gray-300">{SITE_CONFIG.contact.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-[#E8F5E9] dark:bg-slate-700 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Globe className="w-5 h-5 text-[#1B5E20] dark:text-[#4CAF50]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#212121] dark:text-white">Redes Sociales</h3>
                      <div className="flex space-x-4 mt-2">
                        <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-[#1B5E20] dark:hover:text-[#4CAF50] transition-colors">
                          Facebook
                        </a>
                        <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-[#1B5E20] dark:hover:text-[#4CAF50] transition-colors">
                          Instagram
                        </a>
                        <a href={SITE_CONFIG.social.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-[#1B5E20] dark:hover:text-[#4CAF50] transition-colors">
                          YouTube
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border-t-4 border-[#4CAF50]">
                <h2 className="text-2xl font-bold text-[#212121] dark:text-white mb-6">
                  Envíanos un Mensaje
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-[#212121] dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors"
                        placeholder="Tu nombre"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-[#212121] dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                      Asunto *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-[#212121] dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors"
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="colaboracion">Colaboración</option>
                      <option value="pregunta">Pregunta General</option>
                      <option value="sugerencia">Sugerencia</option>
                      <option value="publicidad">Publicidad</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-[#212121] dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors resize-vertical"
                      placeholder="Escribe tu mensaje aquí..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="bg-[#1B5E20] dark:bg-[#4CAF50] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#4CAF50] dark:hover:bg-[#1B5E20] transition-all duration-200 w-full md:w-auto"
                  >
                    Enviar Mensaje
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;