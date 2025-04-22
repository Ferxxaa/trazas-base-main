import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Manual chunking: separa las dependencias de node_modules en un archivo llamado 'vendor'
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    },
    // Ajustar el límite de tamaño para advertencias de chunks grandes (en kilobytes)
    chunkSizeWarningLimit: 1000, // Puedes ajustar el límite a lo que necesites
  }
})
