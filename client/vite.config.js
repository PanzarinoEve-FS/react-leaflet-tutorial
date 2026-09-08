import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    // Fail loudly instead of drifting to another port if 5174 is taken.
    strictPort: true,
    proxy: {
      // Anything starting with /api is forwarded to the Express server,
      // so the browser only ever talks to one origin in development.
      '/api': 'http://localhost:4000',
    },
  },
});
