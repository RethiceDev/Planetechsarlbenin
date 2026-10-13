import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Alias "@" -> /src pour des imports courts et lisibles
    alias: { '@': path.resolve(__dirname, './src') },
  },
  server: {
    port: 5173,
    // Décommentez pour éviter les problèmes de CORS pendant le dev avec Laravel :
    // proxy: { '/api': { target: 'http://localhost:8000', changeOrigin: true } },
  },
});
