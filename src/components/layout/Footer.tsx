import React from 'react';
import { MapPin, Phone, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-8 border-t-4 border-amber-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 mb-12">
          
          {/* Col 1 */}
          <div>
            <h3 className="font-serif text-2xl text-white mb-6">El Bodegón</h3>
            <p className="text-sm text-stone-400 mb-6 leading-relaxed">
              Auténtica cocina argentina desde 1995. Carnes a las brasas, pastas caseras y una selección de vinos pensada para acompañar cada momento.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-stone-400 hover:text-amber-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-stone-400 hover:text-amber-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-stone-400 hover:text-amber-500 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h3 className="font-serif text-xl text-white mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-amber-700 shrink-0 mt-1" />
                <span className="text-sm">Av. Libertador 1234, CABA, Argentina</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-amber-700 shrink-0" />
                <span className="text-sm">+54 11 4555-6789</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={20} className="text-amber-700 shrink-0 mt-1" />
                <span className="text-sm">
                  Mar - Dom: 12:00 - 16:00<br />
                  Mar - Sab: 20:00 - 00:00<br />
                  <span className="text-amber-500 text-xs">Lunes cerrado</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Map Placeholder */}
          <div>
            <h3 className="font-serif text-xl text-white mb-6">Ubicación</h3>
            <div className="w-full h-48 bg-stone-800 rounded-lg overflow-hidden relative group">
              {/* Map placeholder background */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-stone-900/80 p-3 rounded-full">
                  <MapPin size={24} className="text-amber-500" />
                </div>
              </div>
            </div>
          </div>
          
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500">
          <p>© {new Date().getFullYear()} El Bodegón. Todos los derechos reservados.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-stone-300">Términos y condiciones</a>
            <a href="#" className="hover:text-stone-300">Política de privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
