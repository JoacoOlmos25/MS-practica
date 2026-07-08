import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockReviews } from '../data/mockData';
import { Star } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'sonner';

export default function Reviews() {
  const { isLoggedIn, user } = useAuth();
  
  // TODO-BACKEND: Reemplazar el estado local con fetch('/api/reviews')
  const [reviews, setReviews] = useState(mockReviews);
  
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
      toast.error('Por favor escribí un comentario');
      return;
    }

    // TODO-BACKEND: Llamar a API POST /api/reviews
    const newReview = {
      id: Math.random().toString(),
      usuarioNombre: user?.nombre || 'Anónimo',
      calificacion: newRating,
      comentario: newComment,
      fecha: new Date().toISOString()
    };

    setReviews([newReview, ...reviews]);
    setNewComment('');
    setNewRating(5);
    toast.success('¡Gracias por tu reseña!');
  };

  return (
    <div className="pt-24 pb-32 bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Reseñas</h1>
          <p className="text-stone-600">Conocé la experiencia de nuestros clientes</p>
        </div>

        {/* Formulario de Reseña */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100 mb-12">
          <h2 className="text-2xl font-serif text-stone-900 mb-6">Dejá tu opinión</h2>
          
          {isLoggedIn ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Calificación</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className={`p-1 transition-colors ${
                        star <= newRating ? 'text-amber-500' : 'text-stone-300 hover:text-amber-300'
                      }`}
                    >
                      <Star size={32} className={star <= newRating ? 'fill-current' : ''} />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-stone-700 mb-2">
                  Comentario
                </label>
                <textarea
                  id="comment"
                  rows={4}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-600 focus:border-amber-600 outline-none transition-all resize-none"
                  placeholder="¿Cómo estuvo la comida? ¿Y la atención?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-amber-800 text-white px-8 py-3 rounded-md font-medium hover:bg-amber-900 transition-colors"
              >
                Publicar reseña
              </button>
            </form>
          ) : (
            <div className="text-center py-8 bg-stone-50 rounded-lg border border-stone-200 border-dashed">
              <p className="text-stone-600 mb-4">Iniciá sesión para dejarnos tu reseña y calificar tu experiencia.</p>
              <button 
                onClick={() => {
                  // Pequeño hack visual para el mockup si quisieramos abrir el modal desde acá.
                  // Lo más limpio en react real sería exponer un método `openLoginModal` en un contexto UI,
                  // pero para este test podemos pedirle al usuario que use el botón del header.
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  toast.info('Hacé click en "Iniciar sesión" arriba a la derecha');
                }}
                className="text-amber-800 font-medium hover:text-amber-900 bg-amber-100 px-6 py-2 rounded-md"
              >
                Quiero iniciar sesión
              </button>
            </div>
          )}
        </div>

        {/* Listado de Reseñas */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm border border-stone-100 flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="sm:w-1/4 shrink-0">
                <div className="font-medium text-stone-900 mb-1">{review.usuarioNombre}</div>
                <div className="text-sm text-stone-500">
                  {format(new Date(review.fecha), "d 'de' MMMM, yyyy", { locale: es })}
                </div>
              </div>
              <div className="sm:w-3/4">
                <div className="flex text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < review.calificacion ? 'fill-current' : 'text-stone-200'} />
                  ))}
                </div>
                <p className="text-stone-700 leading-relaxed">{review.comentario}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
