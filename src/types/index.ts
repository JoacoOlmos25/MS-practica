export interface MenuItem {
  id: string;
  categoria: 'entrada' | 'principal' | 'postre' | 'bebida';
  nombre: string;
  descripcion: string;
  precio: number;
  imagenUrl: string;
}

export interface Review {
  id: string;
  usuarioNombre: string;
  calificacion: number; // 1 a 5
  comentario: string;
  fecha: string;
}

export interface Reservation {
  id: string;
  fecha: string;
  hora: string;
  cantidadPersonas: number;
  nombre: string;
  telefono: string;
  comentario?: string;
}

export interface User {
  id: string;
  nombre: string;
  email: string;
}
