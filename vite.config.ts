import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      buffer: 'buffer/',
    },
  },
  define: {
    'global': 'globalThis',
    'process.env': {},
  },
  optimizeDeps: {
    include: ['buffer'],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  build: {
    commonjsOptions: {
      include: [/buffer/, /node_modules/]
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Create a chunk for each dynamically imported component
          if (id.includes('/src/')) {
            const match = id.match(/\/src\/(.+?)\//);
            if (match) {
              return match[1];
            }
          }
        }
      }
    }
  },
})
