import { defineConfig } from 'tsup';

export default defineConfig({
  name: 'use-relay-pagination',
  entry: ['src/**/*.ts'],
  splitting: false,
  dts: true,
  format: ['cjs', 'esm'],
  treeshake: false,
  target: 'es2022',
  bundle: true,
  sourcemap: false,
  clean: true,
});
