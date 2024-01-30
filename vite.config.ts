import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import autoprefixer from 'autoprefixer';

// @ts-expect-error (webstorm can't resolve path)
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer()
      ],
    },
    modules: {
      localsConvention: 'camelCaseOnly',
    }
  },
  resolve: {
    alias: {
      // @ts-expect-error (__dirname not defined)
      '~': resolve(__dirname, 'src'),
    }
  }
});
