import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Alias untuk node_modules (jika diperlukan)
      '@': '/src',
    },
  },
});
