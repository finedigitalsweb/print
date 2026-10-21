import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002,
    host: true,
    open: false,
    warmup: {
      clientFiles: ['./src/main.jsx', './src/App.jsx', './src/components/Home/HomePage.jsx', './src/components/Header/Header.jsx']
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3005',
        changeOrigin: true
      }
    }
  }
});
