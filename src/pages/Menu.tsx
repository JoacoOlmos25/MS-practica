import React, { useState } from 'react';
import { mockMenuItems } from '../data/mockData';

const categories = [
  { id: 'todos', label: 'Todos' },
  { id: 'entrada', label: 'Entradas' },
  { id: 'principal', label: 'Principales' },
  { id: 'postre', label: 'Postres' },
  { id: 'bebida', label: 'Bebidas' }
] as const;

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  // TODO-BACKEND: Reemplazar mockMenuItems por llamada a API: fetch('/api/menu')
  const filteredItems = activeCategory === 'todos' 
    ? mockMenuItems 
    : mockMenuItems.filter(item => item.categoria === activeCategory);

  return (
    <div className="pt-24 pb-32 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Nuestro Menú</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Seleccionamos los mejores ingredientes de estación para ofrecerte platos 
            abundantes y con el verdadero sabor de la cocina argentina.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-amber-800 text-white shadow-md'
                  : 'bg-white text-stone-600 hover:bg-amber-100 border border-stone-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {filteredItems.map(item => (
            <div key={item.id} className="flex gap-6 group bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-stone-100">
              <div className="w-32 h-32 shrink-0 rounded-lg overflow-hidden bg-stone-200">
                <img 
                  src={item.imagenUrl} 
                  alt={item.nombre} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-grow flex flex-col justify-center">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-serif font-medium text-stone-900">{item.nombre}</h3>
                  <span className="text-amber-800 font-bold ml-4 shrink-0">
                    ${item.precio.toLocaleString('es-AR')}
                  </span>
                </div>
                <p className="text-sm text-stone-500 leading-relaxed">
                  {item.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
