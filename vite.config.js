import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['crypto-browserify']
  },
  resolve: {
    alias: {
      crypto: 'crypto-browserify'
    }
  }
});
