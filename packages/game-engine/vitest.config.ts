import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    // Test against the shared sources so tests don't depend on a prior build.
    alias: {
      '@under-control/shared': fileURLToPath(new URL('../shared/src/index.ts', import.meta.url)),
    },
  },
});
