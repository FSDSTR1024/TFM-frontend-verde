# React + Vite

# Guía de Uso: Comandos de ESLint y Prettier

Este archivo explica los comandos básicos y su utilidad para trabajar con ESLint y Prettier en nuestro proyecto. Además, he incluido información sobre cómo configurar correctamente el entorno para usar este proyecto.
Debemos consultar regularmente para sacar el máximo partido a la automatización de las herramientas.

## Índice

1. **Configurar el Entorno**
   - Instalar las Dependencias
   - Habilitar Husky (opcional)
   - Configurar Variables de Entorno
   - Ejecutar el Proyecto
2. **Comandos ESLint**
   - Ejecutar ESLint en el Proyecto
   - Solucionar Problemas Automáticamente
   - Ejecutar ESLint en un Archivo o Carpeta Específica
   - Mostrar Ayuda de ESLint
3. **Comandos Prettier**
   - Formatear Todo el Código
   - Verificar el Formato sin Modificar el Código
   - Formatear un Archivo Específico
   - Mostrar Ayuda de Prettier
4. **Husky: Automatizando Buenas Prácticas con Git**
   - ¿Qué es Husky?
   - Configurar Husky
   - Ejecutar Linters Automáticamente Antes de Confirmar Cambios
   - Simular un Pre-commit Manualmente
5. **Buenas Prácticas**

---

## 1. Configurar el Entorno

### 1.1 Instalar las Dependencias

Una vez clonado el proyecto, navega al directorio del mismo y ejecuta:

```bash
npm install
```

- **Qué hace:** Descarga e instala todas las dependencias listadas en `package.json`, creando la carpeta `node_modules/`.
- **Resultado esperado:** El entorno estará listo para ejecutar el proyecto y utilizar las herramientas configuradas.

### 1.2 Habilitar Husky (opcional)

Si Husky está configurado en el proyecto para gestionar hooks de Git, activa su funcionalidad ejecutando:

```bash
npm run prepare
```

Esto crea los hooks necesarios para automatizar tareas como formateo o ejecución de linters (herramienta de análisis de código estático que ayuda a mantener la calidad y consistencia del código) antes de realizar commits.

### 1.3 Ejecutar el Proyecto

Para iniciar el proyecto en modo desarrollo, usa:

```bash
npm run dev
```

Accede a la URL proporcionada (por defecto, `http://localhost:3000` o similar).

---

## 2. Comandos ESLint

### 2.1 Ejecutar ESLint en el Proyecto

```bash
npx eslint .
```

- **Qué hace:** Verifica todos los archivos del proyecto en busca de problemas de estilo o errores según las reglas configuradas en `eslint.config.js`.
- **Uso recomendado:** Ejecuta este comando regularmente para asegurarte de que el código cumple con las normas establecidas.

### 2.2 Solucionar Problemas Automáticamente

```bash
npx eslint . --fix
```

- **Qué hace:** Intenta solucionar automáticamente los problemas de estilo detectados (por ejemplo, ajustar la indentación o corregir espacios).
- **Uso recomendado:** Antes de confirmar cambios en Git, usa este comando para limpiar el código.

### 2.3 Ejecutar ESLint en un Archivo o Carpeta Específica

```bash
npx eslint src/components
```

- **Qué hace:** Verifica problemas en un archivo o carpeta específicos.
- **Uso recomendado:** útil si estás trabajando en un componente específico y deseas comprobar solo esa parte del código.

### 2.4 Mostrar Ayuda de ESLint

```bash
npx eslint --help
```

- **Qué hace:** Muestra información sobre todos los comandos disponibles y las opciones de configuración.
- **Uso recomendado:** útil para descubrir funcionalidades adicionales de ESLint.

---

## 3. Comandos Prettier

### 3.1 Formatear Todo el Código

```bash
npx prettier --write .
```

- **Qué hace:** Aplica el formato configurado en el archivo `.prettierrc` a todos los archivos del proyecto.
- **Uso recomendado:** Ejecuta este comando regularmente para garantizar un código limpio y consistente.

### 3.2 Verificar el Formato sin Modificar el Código

```bash
npx prettier --check .
```

- **Qué hace:** Verifica si los archivos cumplen con las reglas de Prettier sin realizar cambios.
- **Uso recomendado:** Para comprobar si el código está bien formateado antes de aplicar cambios automáticos.

### 3.3 Formatear un Archivo Específico

```bash
npx prettier --write src/components/Button.jsx
```

- **Qué hace:** Aplica el formato de Prettier a un archivo específico.
- **Uso recomendado:** útil si deseas formatear un archivo en particular sin afectar el resto del proyecto.

### 3.4 Mostrar Ayuda de Prettier

```bash
npx prettier --help
```

- **Qué hace:** Muestra información sobre los comandos disponibles y las opciones de configuración.
- **Uso recomendado:** útil para explorar más funcionalidades de Prettier.

---

## 4. Husky: Automatizando Buenas Prácticas con Git

### 4.1 ¿Qué es Husky?

Husky es una herramienta que permite integrar hooks personalizados en Git. Los hooks son acciones que se ejecutan automáticamente en eventos específicos, como antes de realizar un commit (`pre-commit`) o antes de realizar un push (`pre-push`). Con Husky, puedes garantizar que el código pase por verificaciones automáticas antes de ser enviado al repositorio.

### 4.2 Ejecutar Linters Automáticamente Antes de Confirmar Cambios

Si has configurado `lint-staged`, este proceso incluirá:

1. Ejecutar `eslint --fix` para solucionar problemas de estilo.
2. Ejecutar `prettier --write` para formatear el código.

### 4.3 Simular un Pre-commit Manualmente

```bash
npx lint-staged
```

- **Qué hace:** Simula el comportamiento de los linters configurados en `lint-staged`.
- **Uso recomendado:** Para probar si los linters funcionarán correctamente antes de un commit.

---

## 5. Buenas Prácticas

1. **Integrar Comandos en tu Flujo de Trabajo:**

   - Ejecuta `npx eslint . --fix` y `npx prettier --write .` antes de confirmar cualquier cambio.
   - Usa Husky para automatizar estas tareas con `git commit`.

2. **Verificar el Código Regularmente:**

   - Asegúrate de que todo el código cumpla con las reglas configuradas para evitar problemas al trabajar en equipo.

3. **Personalizar Reglas Según tus Necesidades:**

   - Ajustamos las configuraciones en `eslint.config.js` y `.prettierrc` para adaptarlas al estilo del equipo o proyecto.

---

PSDTA: Aseguraos de que vuestro .gitignore contenga:

# Logs

logs
_.log
npm-debug.log_
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
\*.local

# Editor directories and files

.vscode/_
!.vscode/extensions.json
.idea
.DS_Store
_.suo
_.ntvs_
_.njsproj
_.sln
\*.sw?

---

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---
