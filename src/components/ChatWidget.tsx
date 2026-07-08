import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export default function ChatWidget() {
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState<{rol: string, contenido: string}[]>([]);
  const [conversacionId, setConversacionId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  if (!isLoggedIn) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mensaje.trim()) return;

    const userMsg = mensaje.trim();
    setMensaje('');
    setMensajes(prev => [...prev, { rol: 'user', contenido: userMsg }]);
    setIsTyping(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat-gemini', {
        body: { mensaje: userMsg, conversacion_id: conversacionId }
      });

      if (error) throw error;
      
      if (data.conversacion_id && !conversacionId) {
        setConversacionId(data.conversacion_id);
      }
      
      setMensajes(prev => [...prev, { rol: 'assistant', contenido: data.respuesta }]);
    } catch (error: any) {
      toast.error('Error al enviar el mensaje');
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-amber-800 text-white rounded-full p-4 shadow-lg hover:bg-amber-900"
        >
          💬 Reservar con IA
        </button>
      ) : (
        <div className="bg-white w-80 h-96 rounded-lg shadow-xl flex flex-col border border-stone-200">
          <div className="bg-amber-800 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-serif">Asistente Virtual</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-stone-200">X</button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50">
            {mensajes.length === 0 && (
              <p className="text-stone-500 text-sm text-center mt-4">¡Hola! ¿Para cuándo te gustaría reservar?</p>
            )}
            {mensajes.map((msg, i) => (
              <div key={i} className={`flex ${msg.rol === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-2 rounded-lg text-sm ${msg.rol === 'user' ? 'bg-amber-100 text-amber-900' : 'bg-white text-stone-800 border border-stone-200'}`}>
                  {msg.contenido}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-stone-400 text-xs italic">Escribiendo...</div>}
          </div>
          
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-stone-100 flex gap-2">
            <input 
              type="text" 
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Escribí acá..."
              className="flex-1 px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-amber-600"
            />
            <button type="submit" disabled={isTyping || !mensaje.trim()} className="bg-amber-800 text-white px-3 rounded hover:bg-amber-900 disabled:opacity-50">
              ➤
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
