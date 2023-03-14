import react from '@vitejs/plugin-react';
import visualizer from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['lodash'],
      },
    }),
    process.env.ANALYZE
      ? visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true,
        })
      : undefined,
  ],
  resolve: {
    alias: [{ find: /^src(.*)/, replacement: `${__dirname}/src$1` }],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'root-entry-name': 'variable',
        },
      },
    },
  },
});
