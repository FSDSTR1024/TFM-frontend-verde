# Documentación del Frontend - TFM Project

## 1. Configuración del Proyecto

- **Framework:** React.js para la creación de interfaces de usuario.
- **Gestor de Paquetes:** Vite para un entorno de desarrollo rápido y eficiente.
- **Control de Estilos:** CSS módulos para un manejo encapsulado de los estilos.
- **Gestión de Estado:** Context API de React para la administración del estado global.
- **Storybook:** Herramienta para el desarrollo y documentación de componentes UI de forma aislada.

## 2. Estructura de Componentes

### Átomos

- **Button:** Componente reutilizable para botones, con soporte para diferentes variantes y estados.
- **Input:** Campo de entrada genérico adaptable a diferentes tipos de datos.
- **Logo:** Componente para mostrar el logotipo de la aplicación de forma consistente.
- **PasswordToggle:** Campo de entrada para contraseñas con la funcionalidad de mostrar/ocultar texto.

### Moléculas

- **NavLinks:** Conjunto de enlaces de navegación para la barra de menú.

### Organismos

- **AuthCard:** Componente que gestiona los formularios de registro e inicio de sesión.
- **Header:** Cabecera de la aplicación que incluye el logotipo y enlaces de navegación.
- **Navbar:** Barra de navegación principal que organiza los enlaces del usuario.

## 3. Gestión de Autenticación

- **AuthContext:** Contexto global para manejar el estado de autenticación del usuario.
- **login:** Método para establecer la sesión del usuario tras la autenticación.
- **logout:** Método para cerrar la sesión del usuario de forma segura.
- **isAuthenticated:** Verifica si el usuario está autenticado basándose en la presencia del token.

## 4. Integración con Backend

- **Axios:** Cliente HTTP configurado para la comunicación con el backend.
- **Interceptors:** Registro de solicitudes y manejo global de errores.
- **Autenticación:** Envío de tokens JWT en las cabeceras para mantener la sesión.

## 5. Manejo de Errores y Depuración

- **Console Logs:** Inclusión de `console.log` para depuración de solicitudes y respuestas HTTP.
- **Manejo de Errores:** Visualización de mensajes de error personalizados en la interfaz del usuario.

## 6. Gestión de Dependencias y Versionado

- **Limpieza de Dependencias:** Eliminación de paquetes innecesarios para optimizar el rendimiento.
- **Actualización de Dependencias:** Mantenimiento de paquetes actualizados para garantizar la compatibilidad.

## 7. Control de Versiones (Git)

- **Commits Detallados:** Documentación de cada cambio significativo en el frontend.
- **Gestión de Ramas:** Fusión de ramas de desarrollo en `main` tras pruebas exitosas.
- **Historial de Cambios:** Seguimiento claro de la evolución del frontend.

## 8. Documentación de Componentes con Storybook

- **Desarrollo Aislado:** Permite crear y probar componentes de UI de forma independiente.
- **Visualización:** Facilita la visualización de los estados y variantes de cada componente.
- **Documentación:** Generación automática de documentación para mejorar la colaboración en equipo.

## Notas Finales

- Se han implementado mejoras de accesibilidad y rendimiento.
- La estructura modular facilita la escalabilidad y el mantenimiento del código.
- Se recomienda revisar los commits para entender la progresión del proyecto.
- **Storybook** mejora la eficiencia en el desarrollo y la documentación de componentes.
