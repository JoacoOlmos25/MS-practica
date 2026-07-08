import { MenuItem, Review } from '../types';

export const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    categoria: 'entrada',
    nombre: 'Provoleta a la Chapa',
    descripcion: 'Queso provolone fundido con orégano, pimentón y un toque de aceite de oliva.',
    precio: 4500,
    imagenUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsCytKT-TUhy_tlqQep-rC8omJJwFF_WE4ySSgkFVpIZDQcidL4fTGJg8&s=10'
  },
  {
    id: '2',
    categoria: 'entrada',
    nombre: 'Empanadas de Carne Cortada a Cuchillo',
    descripcion: 'Dos empanadas fritas de carne de ternera, cebolla, morrón y especias.',
    precio: 3200,
    imagenUrl: 'https://images.getrecipekit.com/20230327191313-PocketSando_Empanadas.jpg?quality=90&'
  },
  {
    id: '3',
    categoria: 'entrada',
    nombre: 'Mollejas Doradas',
    descripcion: 'Mollejas de corazón crocantes al limón con ensaladita de hojas verdes.',
    precio: 8900,
    imagenUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    categoria: 'principal',
    nombre: 'Ojo de Bife (400g)',
    descripcion: 'Corte premium asado a la leña, acompañado de chimichurri casero y papas rústicas.',
    precio: 18500,
    imagenUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '5',
    categoria: 'principal',
    nombre: 'Entraña Fina',
    descripcion: 'Jugosa entraña asada, ideal para los amantes del sabor intenso, con puré de calabaza.',
    precio: 16000,
    imagenUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '6',
    categoria: 'principal',
    nombre: 'Risotto de Hongos',
    descripcion: 'Arroz carnaroli con mix de hongos de pino y portobellos, parmesano y aceite de trufas.',
    precio: 12500,
    imagenUrl: 'https://www.infobae.com/resizer/v2/DRMSHWQG45GFLI4J6YLPSY62LY.jpg?auth=b9c775f2343d4e33d01794cdc8857989f80d3804409763fa55549cb00a86e57c&smart=true&width=350&height=233&quality=85'
  },
  {
    id: '7',
    categoria: 'postre',
    nombre: 'Volcán de Dulce de Leche',
    descripcion: 'Bizcocho tibio con corazón fundido de dulce de leche, servido con helado de crema.',
    precio: 6500,
    imagenUrl: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '8',
    categoria: 'postre',
    nombre: 'Flan Casero Mixto',
    descripcion: 'Flan tradicional con abundante dulce de leche y crema chantilly.',
    precio: 4800,
    imagenUrl: 'https://www.196flavors.com/wp-content/uploads/2020/04/flan-mixto-4-FP.jpeg'
  },
  {
    id: '9',
    categoria: 'postre',
    nombre: 'Tiramisú',
    descripcion: 'Clásico italiano con mascarpone, café espresso y cacao amargo.',
    precio: 5500,
    imagenUrl: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '10',
    categoria: 'bebida',
    nombre: 'Vino Malbec Reserva',
    descripcion: 'Copa de Malbec reserva, notas a ciruela y roble.',
    precio: 4500,
    imagenUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '11',
    categoria: 'bebida',
    nombre: 'Limonada con Menta y Jengibre',
    descripcion: 'Jarra de limonada fresca recién exprimida.',
    precio: 3500,
    imagenUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '12',
    categoria: 'bebida',
    nombre: 'Cerveza Artesanal IPA',
    descripcion: 'Pinta de cerveza artesanal Indian Pale Ale.',
    precio: 3200,
    imagenUrl: 'https://ardiaprod.vtexassets.com/arquivos/ids/358754/Cerveza-Ipa-Imperial-lata-473-Ml-_1.jpg?v=638951682238000000'
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    usuarioNombre: 'Martín S.',
    calificacion: 5,
    comentario: 'La mejor entraña que probé en mi vida. El servicio impecable y el ambiente súper cálido. Definitivamente volveré.',
    fecha: '2023-10-15T20:00:00Z'
  },
  {
    id: '2',
    usuarioNombre: 'Laura G.',
    calificacion: 4,
    comentario: 'Muy buena atención. El ojo de bife estaba en su punto justo. Las porciones son abundantes.',
    fecha: '2023-10-10T21:30:00Z'
  },
  {
    id: '3',
    usuarioNombre: 'Diego F.',
    calificacion: 5,
    comentario: 'Excelente lugar para una cena romántica. Pidieron el volcán de dulce de leche, es una locura.',
    fecha: '2023-10-05T19:45:00Z'
  },
  {
    id: '4',
    usuarioNombre: 'Sofía M.',
    calificacion: 4,
    comentario: 'Lindo ambiente. La carta de vinos es muy variada y a buen precio.',
    fecha: '2023-09-28T20:15:00Z'
  },
  {
    id: '5',
    usuarioNombre: 'Julián P.',
    calificacion: 5,
    comentario: 'Fui con mi familia y nos encantó. Las empanadas cortadas a cuchillo son un 10.',
    fecha: '2023-09-20T13:00:00Z'
  },
  {
    id: '6',
    usuarioNombre: 'Camila R.',
    calificacion: 3,
    comentario: 'La comida rica pero tuvimos que esperar un poco más de lo normal para que nos traigan la cuenta.',
    fecha: '2023-09-15T22:00:00Z'
  },
  {
    id: '7',
    usuarioNombre: 'Esteban C.',
    calificacion: 5,
    comentario: 'Todo perfecto. La carne se cortaba con cuchara. Recomiendo reservar antes porque se llena.',
    fecha: '2023-09-10T20:30:00Z'
  },
  {
    id: '8',
    usuarioNombre: 'Valentina L.',
    calificacion: 5,
    comentario: 'Increíble experiencia. El risotto de hongos estaba espectacular, súper cremoso.',
    fecha: '2023-09-05T21:00:00Z'
  }
];
