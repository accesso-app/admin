import path from 'path';
import { defineConfig } from 'vite';

import babel from '@rollup/plugin-babel';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), babel({ extensions: ['.ts', '.tsx'] })],
  resolve: {
    alias: [{ find: '~', replacement: path.resolve('src') }],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9005/',
        changeOrigin: true,
        rewrite: (path) => path.replace('/api/', '/'),
      },
    },
  },
});
