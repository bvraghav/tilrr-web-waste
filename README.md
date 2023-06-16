# tilrr-web-app

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
pnpm install
```

### Setup Firebase Config ###
Add the following config to `.env.local`:
```conf
# Firebase Conf
# -----------------------------------------------------
VITE_FIRE_API_KEY=
VITE_FIRE_AUTH_DOMAIN=
VITE_FIRE_DATABASE_URL=
VITE_FIRE_PROJECT_ID=
VITE_FIRE_STORAGE_BUCKET=
VITE_FIRE_MESSAGING_SENDER_ID=
VITE_FIRE_APP_ID=
VITE_FIRE_MEASUREMENT_ID=
# -----------------------------------------------------
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
