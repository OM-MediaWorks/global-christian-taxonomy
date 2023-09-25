import { defineConfig } from 'astro/config';
import temp from 'temp'
import fs from 'fs'
import { fileURLToPath } from 'url';

temp.track()

const myTemp = temp.mkdirSync('astro')

const hashCode = function(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for(let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  }

// https://astro.build/config
export default defineConfig({
    outDir: 'docs',
    resolve: {
        alias: [
            { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
        ]
    },
    integrations: [
        {
            name: 'gct',
            hooks: {
                'astro:config:setup': ({ injectRoute }) => {

                    const copyInjectRoute = (route) => {
                        const newEntrypoint = myTemp + '/' + hashCode(route.entryPoint + route.variant) + '.astro'
                        fs.copyFileSync(route.entryPoint, newEntrypoint)
                        route.entryPoint = newEntrypoint
                        injectRoute(route)
                    }

                    copyInjectRoute({
                        pattern: '[language]',
                        entryPoint: 'src/pages/index.astro',
                        variant: 'a'
                    })

                    copyInjectRoute({
                        pattern: '[language]/[term]',
                        entryPoint: 'src/pages/[term].astro',
                        variant: 'a'
                    })
                }
            }
        }
    ]
});
