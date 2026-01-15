# Checklist (PWA)

App simple para crear múltiples **checklists**, con panel izquierdo para navegar y panel principal para añadir/marcar checks. Guarda todo **localmente** (offline) en el navegador/dispositivo.

## Requisitos

- Node.js (LTS recomendado)

## Desarrollo local

```bash
npm install
npm run dev
```

## Build (producción)

```bash
npm run build
npm run preview
```

## Publicar como PWA (Vercel)

### Opción 1: Importar desde GitHub (recomendado)

- Sube este repo a GitHub.
- En Vercel: **New Project** → importa el repo.
- Settings:
  - **Framework**: Vite
  - **Build Command**: `npm run build`
  - **Output Directory**: `dist`
- Deploy.

### Opción 2: Vercel CLI

```bash
npm i -g vercel
vercel
vercel --prod
```

## Publicar (Netlify)

- Build command: `npm run build`
- Publish directory: `dist`

> Nota: incluye `public/_redirects` para SPA.

## Instalar en Android (Tablet)

- Abre la URL pública (Vercel/Netlify) en Chrome.
- Menú ⋮ → **Instalar aplicación** / **Agregar a pantalla de inicio**.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
