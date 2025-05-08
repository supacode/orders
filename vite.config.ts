import tailwindcss from '@tailwindcss/vite';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  server: {},
  plugins: [react(), tailwindcss()],
  test: {
    ...configDefaults,
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
  },
});
