import { defineConfig } from 'vite';

export default defineConfig({
  mode: 'production',
  build: {
    target: 'node20',
    minify: false,
    outDir: 'dist',
    rollupOptions: {
      input:{
        main : './index.ts'
      }
    }
  },
});
