import { defineConfig } from 'astro/config';
import temp from 'temp';
import fs from 'fs';
import { fileURLToPath } from 'url';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  outDir: 'docs',
  resolve: {
    alias: [{
      find: '@',
      replacement: fileURLToPath(new URL('./src', import.meta.url))
    }]
  },
  integrations: [{
    name: 'gct',
    hooks: {
      'astro:config:setup': ({}) => {
        const index = fs.readFileSync('src/pages/index.astro');
        fs.writeFileSync('src/pages/[language]/index.astro', index);
        const term = fs.readFileSync('src/pages/[term].astro');
        fs.writeFileSync('src/pages/[language]/[term].astro', term);
      }
    }
  }, mdx()]
});