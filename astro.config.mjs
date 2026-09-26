import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://davidsugianto.github.io',
  integrations: [sitemap()],
});
