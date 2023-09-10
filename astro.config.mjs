import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    outDir: 'docs',
    integrations: [
        {
            name: 'gct',
            hooks: {
                'astro:config:setup': ({ injectRoute }) => {
                    injectRoute({
                        pattern: '/[language]',
                        entryPoint: './src/pages/index.astro'
                    })

                    injectRoute({
                        pattern: '/[language]/[term]',
                        entryPoint: './src/pages/[term].astro'
                    })
                }
            }
        }
    ]
});
