import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 6100,
  },
  plugins: [
    vue(),
    svgLoader(),
    eslintPlugin({
      eslintOptions: {
        cache: false,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    dedupe: [
      'vue',
    ],
  },
});
