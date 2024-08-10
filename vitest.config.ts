import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Enable global APIs like `describe`, `it`, etc.
    environment: 'jsdom', // Use jsdom environment for testing browser-like behavior
    // setupFiles: './src/setupTests.ts', // Path to setup files (optional)
    include: ['**/*.{test,spec}.{js,ts,jsx,tsx}'], // Include pattern for test files
    exclude: ['**/node_modules/**', '**/dist/**'], // Exclude pattern for test files
  },
});
