import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { supabase } from '../lib/supabase';

export default function Reservations() {
  const { isLoggedIn, user } = useAuth();
  
  // Variables form
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [personas, setPersonas] = useState('2');
  const [nombre, setNombre] = useState(user?.nombre || '');
  const [telefono, setTelefono] = useState('');
  const [comentario, setComentario] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservations, setReservations] = useState<any[]>([]);
  const [isLoadingReservations, setIsLoadingReservations] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      loadReservations();
    }
  }, [isLoggedIn]);

  const loadReservations = async () => {
    setIsLoadingReservations(true);
    try {
      const { data, error } = await supabase.functions.invoke('reservations', { method: 'GET' });
      if (error) throw error;
      setReservations(data || []);
    } catch (err: any) {
      toast.error(err.message || 'Error cargando tus reservas');
    } finally {
      setIsLoadingReservations(false);
    }
  };

  const handleCancel = async (id: string) => {
    try {
      const { error } = await supabase.functions.invoke('reservations', {
        method: 'DELETE',
        body: { id }
      });
      if (error) throw error;
      toast.success('Reserva cancelada');
      setReservations(reservations.map(r => r.id === id ? { ...r, estado: 'cancelada' } : r));
    } catch (err: any) {
      toast.error(err.message || 'Error al cancelar la reserva');
    }
  };

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
      setFecha('');
      setHora('');
      setPersonas('2');
      setTelefono('');
      setComentario('');
      loadReservations();
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
          <p className="text-stone-600">Asegurá tu lugar y vení a disfrutar de la mejor carne argentina.</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg border border-stone-100">
          {!isLoggedIn ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-serif text-stone-900 mb-4">Iniciá sesión para reservar</h2>
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
            <>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Formulario omitido visualmente para no alargar tanto el bloque pero se mantiene */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Fecha</label>
                    <input type="date" required value={fecha} onChange={(e) => setFecha(e.target.value)} className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-600 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Hora</label>
                    <select required value={hora} onChange={(e) => setHora(e.target.value)} className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-600 outline-none">
                      <option value="">Seleccionar horario</option>
                      <option value="20:00">20:00 hs</option>
                      <option value="21:00">21:00 hs</option>
                      <option value="22:00">22:00 hs</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Cantidad de personas</label>
                    <select required value={personas} onChange={(e) => setPersonas(e.target.value)} className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-600 outline-none">
                      {[1, 2, 3, 4, 5, 6].map(n => (<option key={n} value={n}>{n} personas</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Teléfono de contacto</label>
                    <input type="tel" required value={telefono} onChange={(e) => setTelefono(e.target.value)} className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-600 outline-none" />
                  </div>
                </div>

                <div className="pt-4">
                  <button type="submit" disabled={isSubmitting} className={`w-full text-white px-8 py-4 rounded-md text-lg font-medium transition-all ${isSubmitting ? 'bg-stone-400 cursor-not-allowed' : 'bg-amber-800 hover:bg-amber-900 shadow-md'}`}>
                    {isSubmitting ? 'Procesando...' : 'Confirmar Reserva'}
                  </button>
                </div>
              </form>

              <div className="mt-12 pt-8 border-t border-stone-200">
                <h3 className="text-2xl font-serif text-stone-900 mb-6">Mis Reservas</h3>
                {isLoadingReservations ? (
                  <p>Cargando reservas...</p>
                ) : reservations.length === 0 ? (
                  <p className="text-stone-600">No tenés reservas todavía.</p>
                ) : (
                  <ul className="space-y-4">
                    {reservations.map(res => (
                      <li key={res.id} className="p-4 border border-stone-200 rounded flex justify-between items-center">
                        <div>
                          <p className="font-medium text-lg">{res.fecha} a las {res.hora}</p>
                          <p className="text-sm text-stone-600">{res.cantidad_comensales} personas - Estado: <span className="font-bold">{res.estado}</span></p>
                        </div>
                        {res.estado === 'pendiente' || res.estado === 'confirmada' ? (
                          <button onClick={() => handleCancel(res.id)} className="bg-red-100 text-red-700 px-4 py-2 rounded font-medium hover:bg-red-200">Cancelar</button>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
