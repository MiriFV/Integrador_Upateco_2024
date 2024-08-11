Documentación del Proyecto Integrador: Aplicación Web de Recetas
1. Descripción General del Proyecto
Este proyecto consiste en el desarrollo de una aplicación web de recetas utilizando ReactJS como framework de frontend y una API RESTful para el backend. La aplicación permite a los usuarios buscar, ver, crear y gestionar recetas de cocina. Además, incluye un sistema de autenticación basado en JWT para garantizar que solo los usuarios autenticados puedan acceder a ciertas funcionalidades, como la creación y edición de recetas.

2. Estructura del Proyecto
Frontend (ReactJS)

Componentes principales:
Navbar: Barra de navegación que cambia según el estado de autenticación del usuario.
Recetario: Página principal donde se listan las recetas disponibles.
RecetarioDetail: Página de detalles de una receta específica.
Login: Página de inicio de sesión.
Profile: Página de perfil del usuario autenticado.
CreateRecipe: Página para crear nuevas recetas (accesible solo para usuarios autenticados).
Hooks personalizados:
useAuth: Hook para gestionar el estado de autenticación.
Contexto:
AuthContext: Proporciona el estado de autenticación y las acciones asociadas a todo el árbol de componentes.
Backend (API RESTful)

Endpoints principales:
/login: Autenticación de usuarios y emisión de JWT.
/recipes: CRUD de recetas.
/users: Gestión de usuarios (registro, perfil, etc.).
3. Autenticación y Manejo de Sesiones
Implementación de autenticación utilizando JWT.
El token JWT se almacena en el localStorage y se incluye en los encabezados de las solicitudes a la API.
Al iniciar sesión, se almacena el token y se actualiza el estado global de autenticación. Al cerrar sesión, el token se elimina y el estado se restablece.
4. Consumo de la API
Operaciones CRUD:
Crear, leer, actualizar y eliminar recetas mediante peticiones a los endpoints de la API.
Manejo de errores:
Implementación de mensajes de error amigables al usuario en caso de fallos en la comunicación con la API.
5. Enrutamiento
Uso de React Router para la navegación entre diferentes secciones de la aplicación.
Rutas principales:
/: Página de inicio que lista las recetas.
/login: Página de inicio de sesión.
/profile: Página de perfil del usuario autenticado.
/recipes/:id: Página de detalle de una receta específica.
/create-recipe: Página para crear una nueva receta (protegida).
Implementación de rutas protegidas que requieren autenticación.
6. Diseño e Interfaz de Usuario
Estilo visual:
Se ha optado por un diseño centrado en la calidez y la comodidad, usando colores tierra y una tipografía amigable.
La interfaz es intuitiva y facilita la navegación, con botones y formularios claramente etiquetados.
Componentización:
Los componentes están diseñados para ser reutilizables y modulares.
CSS:
Uso de CSS puro con un enfoque en la simplicidad y la eficacia.
Implementación de media queries para garantizar que la aplicación sea responsive y se vea bien en diferentes dispositivos.
7. Control de Versiones
Repositorio Git:
Todo el código fuente se maneja mediante Git, con un flujo de trabajo basado en Git Flow.
Uso de ramas para la gestión de características y correcciones de errores.
El repositorio está alojado en GitHub, donde cada integrante del equipo realiza commits regulares.
8. Despliegue
La aplicación está desplegada en Vercel (o cualquier otro servicio de hosting gratuito), permitiendo acceso público para evaluación.
Enlace al repositorio: Enlace al repositorio en GitHub.
Enlace a la aplicación desplegada: Enlace a la aplicación desplegada.
9. Evaluación y Presentación
Defensa del proyecto:
Se realizará una presentación del proyecto ante el profesor, donde se explicará la arquitectura utilizada, las decisiones de diseño y se demostrará el funcionamiento de la aplicación.
La defensa incluirá una demostración en vivo del flujo de usuario y la manipulación de datos a través de la aplicación.
10. Conclusión
Este proyecto integrador es una excelente oportunidad para aplicar los conocimientos adquiridos en ReactJS, consumo de APIs RESTful y manejo de autenticación con JWT. La aplicación desarrollada cumple con los requisitos establecidos y se ha trabajado en equipo utilizando buenas prácticas de desarrollo.
