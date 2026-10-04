import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 相対パスで出力し、どの階層に置いても動くようにする
  base: './',
  build: {
    assetsInlineLimit: 2048,
    rollupOptions: {
      output: {
        // framer-motion を分離し、初期JSを軽くする
        manualChunks: { motion: ['framer-motion'] },
      },
    },
  },
});
