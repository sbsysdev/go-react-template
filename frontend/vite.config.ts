import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';

export default defineConfig({
  plugins: [react()],
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      drafts: {
        customMedia: true,
      },
      targets: browserslistToTargets(browserslist('>= 0.25%')),
      cssModules: true,
    },
  },
  build: {
    cssMinify: 'lightningcss',
  },
  resolve: {
    alias: {
      /* src */
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      /* pkgs */
      '@ui': fileURLToPath(new URL('./pkgs/ui', import.meta.url)),
      '@utilities': fileURLToPath(new URL('./pkgs/utilities', import.meta.url)),
    },
  },
});
