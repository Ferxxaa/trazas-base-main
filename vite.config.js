import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Manual chunking para separar las dependencias de node_modules en un archivo 'vendor'
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          // Se puede añadir más reglas de chunking si se requiere
          if (id.includes('src/components/')) {
            return 'components';
          }
        }
      }
    },
    // Ajuste del límite de tamaño para advertencias de chunks grandes (en kilobytes)
    chunkSizeWarningLimit: 1000, // Puedes ajustarlo a lo que necesites
  }
})
