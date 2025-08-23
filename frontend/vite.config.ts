import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import environment from "vite-plugin-environment";
import { fileURLToPath } from "url";

export default defineConfig({
  build: {
    emptyOutDir: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis"
      }
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true
      }
    }
  },
  plugins: [
    react(), 
    tailwindcss(), 
    tsconfigPaths(),
    environment("all", { "prefix": "CANISTER_" }),
    environment("all", { "prefix": "DFX_" }),
  ],
  resolve: {
    alias: [
      {
        find: "declarations",
        replacement: fileURLToPath(
          new URL("../src/declarations", import.meta.url)
        )
      }
    ],
    dedupe: ["@dfinity/agent"],
  }
});
