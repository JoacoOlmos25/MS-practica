# El Bodegón

Sitio web mockup de restaurante. Single-page app con navegación cliente, contexto de autenticación y validación de formularios.

## Stack

- **Framework:** React 19 + React Router 7
- **Build:** Vite 6, TypeScript 5.8
- **Estilos:** Tailwind CSS 4
- **Formularios:** react-hook-form + zod
- **UI:** lucide-react, motion, sonner
- **Fechas:** date-fns

## Requisitos

- Node.js 18+

## Instalación

```bash
npm install
npm run dev
```

El servidor de desarrollo levanta en `http://localhost:3000`.

## Scripts

| Comando             | Descripción                              |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Servidor de desarrollo en puerto 3000    |
| `npm run build`     | Build de producción                      |
| `npm run preview`   | Preview del build de producción          |
| `npm run lint`      | Type-check con `tsc --noEmit`            |
| `npm run clean`     | Elimina `dist` y `server.js`             |

## Estructura

```
src/
├── components/
│   ├── auth/         # LoginModal
│   └── layout/       # AppLayout, Header, Footer
├── context/          # AuthContext
├── data/             # mockData
├── pages/            # Home, Menu, Reservations, Reviews
└── types/            # Tipos compartidos
```

## Rutas

- `/` — `Home`
- `/menu` — `Menu`
- `/resenas` — `Reviews`
- `/reservas` — `Reservations`
