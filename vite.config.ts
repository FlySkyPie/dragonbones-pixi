import path from "path";
import { defineConfig } from "vite";
import dts from 'vite-plugin-dts'

export default defineConfig({
  resolve: {
    alias: {
      "@dragonbones-pixi": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'dragonBonesPixi',
      formats: ['es'],
      fileName: 'dragonbones-pixi',
    },
  },
  plugins: [dts({ rollupTypes: true })],
  define: {
    global: {},
  },
});