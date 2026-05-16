// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://winup-cli.vercel.app/',
    vite: {
        plugins: [tailwindcss()],
    },
});
