import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 使用 @ 代替 src 目录
      "@": path.resolve("./src"),
      // 使用 # 代替 types 目录
      "#": path.resolve("./src/types"),
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5118',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
