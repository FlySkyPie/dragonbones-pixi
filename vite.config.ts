import path from "path";
import { defineConfig } from "vite";
import dts from 'vite-plugin-dts'

export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    return {
      resolve: {
        alias: {
          "@dragonbones-pixi": path.resolve(__dirname, "./src"),
        },
      },
      define: {
        global: '({})'
      },
    }
  };

  if (mode === 'demo') {
    const input = [
      "AnimationBase",
      "BoundingBox",
      "EyeTracking",
      "InverseKinematics",
      "PerformanceTest",
      "ReplaceSkin",
      "AnimationLayer",
      "BoneOffset",
      "CoreElement",
      "DragonBonesEvent",
      "HelloDragonBones",
      "MultiTextureAltas",
      "ReplaceAnimation",
      "ReplaceSlotDisplay",
    ].reduce<{ [key: string]: string }>((t, name) => {
      t[name] = path.resolve(__dirname, `demo/${name}/index.html`);
      return t;
    }, {})

    return {
      base: '',
      resolve: {
        alias: {
          "@dragonbones-pixi": path.resolve(__dirname, "./src"),
        },
      },
      build: {
        outDir: path.resolve(__dirname, 'dist-demo'),
        assetsInlineLimit: 0,
        rollupOptions: {
          input,
        }
      },
    }
  }

  return {
    publicDir: false,
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'dragonBonesPixi',
        //formats: ['es'],
        fileName: 'dragonbones-pixi',
      },
      rollupOptions: {
        external: "pixi.js",
      }
    },
    plugins: [dts({ rollupTypes: true })],
  }
});