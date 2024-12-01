import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx', // Treat `.js` files as JSX
    include: /src\/.*\.js$/, // Only apply this loader to files in the `src` directory
  },
});
