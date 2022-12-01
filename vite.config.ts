import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~material-icons': path.resolve(__dirname, 'node_modules/material-icons'),
      '~reset-css': path.resolve(__dirname, 'node_modules/reset-css')
    }
  },
  plugins: [vue()]
})
