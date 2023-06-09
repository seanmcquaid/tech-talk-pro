import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
    include: [
      'src/**/*.test.tsx',
      'src/**/*.test.ts',
      'src/**/*.test.js',
      'src/**/*.test.jsx',
    ],
    coverage: {
      reporter: ['lcov'],
    },
  },
});
