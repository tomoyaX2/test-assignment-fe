import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
export default defineConfig(function (_a) {
  var mode = _a.mode;
  //@ts-expect-error
  var env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    base: "/test-assignment-fe",
    define: {
      "process.env": {
        VITE_API_URL: env.VITE_API_URL,
        VITE_API_KEY: env.VITE_API_KEY,
      },
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
        },
      },
    },
  };
});
