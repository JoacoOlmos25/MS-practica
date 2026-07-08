import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { supabase } from '../lib/supabase';

export default function Reservations() {
  const { isLoggedIn, user } = useAuth();
  
  // Variables de estado simples para el mockup
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [personas, setPersonas] = useState('2');
  const [nombre, setNombre] = useState(user?.nombre || '');
  const [telefono, setTelefono] = useState('');
  const [comentario, setComentario] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('reservations', {
        body: {
          fecha,
          hora,
          cantidad_comensales: parseInt(personas),
          nombre_contacto: nombre,
          telefono_contacto: telefono,
          notas: comentario
        }
      });
      
      if (error) throw error;

      toast.success('¡Reserva confirmada! Te esperamos.');
      // Reset form
      setFecha('');
      setHora('');
      setPersonas('2');
      setTelefono('');
      setComentario('');
    } catch (error: any) {
      toast.error(error.message || 'Error al procesar tu reserva. Intentá nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-32 bg-stone-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Reservá tu mesa</h1>
          <p className="text-stone-600">
            Asegurá tu lugar y vení a disfrutar de la mejor carne argentina.
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg border border-stone-100">
          {!isLoggedIn ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-serif text-stone-900 mb-4">Iniciá sesión para reservar</h2>
              <p className="text-stone-600 mb-8 max-w-md mx-auto">
                Para poder confirmar y gestionar tu reserva necesitamos que ingreses con tu cuenta.
              </p>
              <button 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  toast.info('Utilizá el botón "Iniciar sesión" en la barra de navegación superior.');
                }}
                className="bg-amber-800 text-white px-8 py-3 rounded-md font-medium hover:bg-amber-900 transition-colors inline-block"
              >
                Ir a iniciar sesión
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Fecha</label>
                  <input 
                    type="date"
                    required
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Hora</label>
                  <select 
                    required
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                    className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-600 outline-none"
                  >
                    <option value="">Seleccionar horario</option>
                    <option value="20:00">20:00 hs</option>
                    <option value="20:30">20:30 hs</option>
                    <option value="21:00">21:00 hs</option>
                    <option value="21:30">21:30 hs</option>
                    <option value="22:00">22:00 hs</option>
                    <option value="22:30">22:30 hs</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Cantidad de personas</label>
                  <select 
                    required
                    value={personas}
                    onChange={(e) => setPersonas(e.target.value)}
                    className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-600 outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'persona' : 'personas'}</option>
                    ))}
                    <option value="mas">Más de 10 (contactarse)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Teléfono de contacto</label>
                  <input 
                    type="tel"
                    required
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="Ej: 11 1234-5678"
                    className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Aclaraciones o pedidos especiales</label>
                <textarea 
                  rows={3}
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  placeholder="¿Alguna alergia o preferencia? ¿Es un cumpleaños?"
                  className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-600 outline-none resize-none"
                ></textarea>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full text-white px-8 py-4 rounded-md text-lg font-medium transition-all ${
                    isSubmitting ? 'bg-stone-400 cursor-not-allowed' : 'bg-amber-800 hover:bg-amber-900 shadow-md'
                  }`}
                >
                  {isSubmitting ? 'Procesando...' : 'Confirmar Reserva'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
