// @ts-check
import { defineConfig } from 'astro/config';
import icon from "astro-icon";
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://aidaoropeza.beyondtechnology.net/',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [icon(), sitemap()],
});