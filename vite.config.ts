import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react', 'react-icons'],
        },
      },
    },
    // react-snap usa un Chromium antiguo para prerender, por eso necesitamos sintaxis transpileada.
    target: 'es2017',
    minify: 'esbuild',
  },
})
