import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import svgr from "vite-plugin-svgr"
import dts from "vite-plugin-dts"
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), dts()],
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
