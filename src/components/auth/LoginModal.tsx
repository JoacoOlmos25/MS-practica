import React, { useState } from 'react';
import { useForm } from 'react-form'; // I will use react-hook-form
import { useAuth } from '../../context/AuthContext';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '../../lib/supabase';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isRegister, setIsRegister] = useState(false);
  const { login } = useAuth();
  
  // Usamos state simple para el form mock, aunque en app real usaríamos react-hook-form + zod
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || (isRegister && !nombre)) {
      toast.error('Por favor completá todos los campos');
      return;
    }

    try {
      if (isRegister) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              nombre
            }
          }
        });
        if (error) throw error;
        toast.success('Registro exitoso. ¡Bienvenido!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        toast.success('Inicio de sesión exitoso');
      }
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Ocurrió un error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-2xl font-serif text-gray-900">
            {isRegister ? 'Crear cuenta' : 'Iniciar sesión'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isRegister && (
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Nombre completo</label>
              <input 
                type="text" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-600 focus:border-amber-600 outline-none transition-all"
                placeholder="Juan Pérez"
              />
            </div>
          )}
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-600 focus:border-amber-600 outline-none transition-all"
              placeholder="tu@email.com"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-600 focus:border-amber-600 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-amber-700 text-white py-3 rounded-md font-medium hover:bg-amber-800 transition-colors mt-6"
          >
            {isRegister ? 'Registrarme' : 'Ingresar'}
          </button>
          
          <div className="text-center mt-4">
            <button 
              type="button" 
              onClick={() => setIsRegister(!isRegister)}
              className="text-sm text-amber-700 hover:text-amber-800 font-medium"
            >
              {isRegister ? '¿Ya tenés cuenta? Iniciar sesión' : '¿No tenés cuenta? Registrate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
