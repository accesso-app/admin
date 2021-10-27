import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import babel from '@rollup/plugin-babel';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), babel({ extensions: ['.ts', '.tsx', '.mjs', '.cjs', '.js'] })],
  resolve: {
    alias: [{ find: '~', replacement: path.resolve('src') }],
  },
});
