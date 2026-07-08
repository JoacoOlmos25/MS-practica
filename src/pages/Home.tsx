import React from 'react';
import { Link } from 'react-router-dom';
import { mockMenuItems, mockReviews } from '../data/mockData';
import { Star } from 'lucide-react';

export default function Home() {
  const featuredItems = mockMenuItems.slice(0, 4);
  const featuredReviews = mockReviews.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=2000" 
            alt="Interior del restaurante" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 drop-shadow-md">
            El Bodegón
          </h1>
          <p className="text-xl md:text-2xl text-stone-200 mb-10 font-light drop-shadow">
            Carnes a las brasas y tradición argentina en cada plato.
          </p>
          <Link 
            to="/reservas" 
            className="inline-block bg-amber-700 hover:bg-amber-600 text-white px-8 py-4 rounded-sm text-lg font-medium tracking-wide transition-all hover:scale-105 shadow-xl"
          >
            Reservar mesa
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif text-stone-900 mb-8">Nuestra Historia</h2>
          <p className="text-lg text-stone-600 leading-relaxed mb-6">
            Desde 1995, El Bodegón es sinónimo de familia, fuego y pasión por la buena mesa. 
            Comenzamos como una pequeña parrilla de barrio y, gracias al cariño de nuestros clientes, 
            crecimos sin perder la esencia: cortes seleccionados, recetas que pasan de generación en generación 
            y ese sabor inconfundible que solo el asado a la leña puede lograr.
          </p>
          <img 
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000" 
            alt="Detalle de cocina" 
            className="rounded-lg shadow-xl mt-12 w-full object-cover h-64 md:h-96 grayscale-[20%]"
          />
        </div>
      </section>

      {/* Featured Menu */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-stone-900 mb-4">Platos Destacados</h2>
            <div className="h-1 w-20 bg-amber-700 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredItems.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="overflow-hidden rounded-lg mb-4 h-64 shadow-md">
                  {/* TODO-BACKEND: Cargar imágenes desde el storage real (S3, Supabase Storage, etc) */}
                  <img 
                    src={item.imagenUrl} 
                    alt={item.nombre} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-serif text-stone-900 mb-2 group-hover:text-amber-700 transition-colors">
                  {item.nombre}
                </h3>
                <p className="text-stone-500 text-sm line-clamp-2 mb-3">{item.descripcion}</p>
                <span className="text-amber-800 font-medium">${item.precio.toLocaleString('es-AR')}</span>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/menu" className="inline-block border border-amber-800 text-amber-900 px-6 py-3 rounded hover:bg-amber-50 transition-colors">
              Ver menú completo
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Reviews */}
      <section className="py-24 bg-stone-900 text-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-white mb-4">Lo que dicen nuestros clientes</h2>
            <div className="h-1 w-20 bg-amber-700 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredReviews.map((review) => (
              <div key={review.id} className="bg-stone-800 p-8 rounded-lg shadow-lg border border-stone-700">
                <div className="flex text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className={i < review.calificacion ? 'fill-current' : 'text-stone-600'} />
                  ))}
                </div>
                <p className="text-stone-300 italic mb-6">"{review.comentario}"</p>
                <div className="font-medium text-amber-600">- {review.usuarioNombre}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
