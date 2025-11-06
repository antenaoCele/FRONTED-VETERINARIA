#  Veterinaria - Gestión de Clientes y Mascotas

Este proyecto es una aplicación web para la gestión de una veterinaria. Permite registrar clientes y sus mascotas, visualizar listados, editar información existente y eliminar registros. El frontend fue desarrollado con React, mientras que el backend utiliza Node.js, Express y MongoDB Atlas como base de datos.

##  Tecnologías utilizadas

###  Frontend
- React (con Hooks y componentes funcionales)
- Axios para la comunicación con el backend
- React Router para la navegación entre vistas
- Tailwind CSS para estilos
- Vite como herramienta de construcción

###  Backend
- Node.js + Express para la API REST
- MongoDB Atlas como base de datos en la nube
- CORS habilitado para la conexión con el frontend
- Desplegado en Vercel

##  Funcionalidades principales

###  Clientes
- Crear nuevos clientes
- Editar o eliminar clientes existentes
- Listar todos los clientes registrados

###  Mascotas
- Registrar una mascota y asociarla a un cliente
- Editar y eliminar mascotas
- Ver el listado completo de mascotas

###  Actualización en tiempo real
- Los listados se actualizan automáticamente tras cada acción (crear, editar o eliminar)

##  Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/veterinaria-frontend.git
cd veterinaria-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con la URL del backend:

```env
VITE_API_URL=https://tu-backend.vercel.app/api
```

### 4. Ejecutar la aplicación

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🌍 Despliegue

- **Frontend**: Vercel
- **Backend**: Vercel
- **Base de datos**: MongoDB Atlas


```

##  Autor

**Celeste Tatiana Antenao Fernández**

💻 Proyecto realizado con fines educativos y de práctica en desarrollo full stack.

---

