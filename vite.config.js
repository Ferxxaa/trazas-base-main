import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      crypto: 'crypto-browserify',  // Resuelve 'crypto' a 'crypto-browserify'
    },
  },
  optimizeDeps: {
    include: ['crypto-browserify'],  // Asegura que 'crypto-browserify' sea optimizado
  },
});
