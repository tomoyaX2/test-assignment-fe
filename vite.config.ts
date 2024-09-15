import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import checker from "vite-plugin-checker";
import runtimeEnv from "vite-plugin-runtime-env";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

export default defineConfig(({ mode }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const env = loadEnv(mode, process.cwd(), "");

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return {
    plugins: [react(), runtimeEnv(), checker({ typescript: true })],
    base: "/test-assignment-fe",
    resolve: {
      alias: {
        "@modules": resolve(__dirname, "src/modules"),
        "@store": resolve(__dirname, "src/store"),
        "@components": resolve(__dirname, "src/components"),
        "@shared": resolve(__dirname, "src/shared"),
      },
    },
    define: {
      "process.env": {
        VITE_API_URL: env.VITE_API_URL,
        VITE_API_KEY: env.VITE_API_KEY,
      },
    },
  };
});
