import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import autoprefixer from 'autoprefixer';
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
      '~': resolve(__dirname, 'src'),
    }
  }
});
