import { defineConfig } from 'vite';

export default defineConfig({
  mode: 'production',
  build: {
    target: ['web', 'es5'],
    minify: false,
    outDir: 'dist',
    rollupOptions: {
      input:{
        main : './index.js'
      }
    }
  },
});
