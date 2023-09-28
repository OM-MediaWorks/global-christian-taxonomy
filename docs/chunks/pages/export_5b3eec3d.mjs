import { a as getCategories, g as getLanguages } from './_term__6fabe765.mjs';
import '../astro_41089d00.mjs';
import 'clsx';
import 'html-escaper';
import 'jsonld';
import 'grapoi';
import '@rdfjs/namespace';
import 'n3';
import 'fs/promises';
import 'dedent';
import 'uniqolor';
/* empty css                            */
async function GET() {
  return new Response(
    JSON.stringify({
      categories: await getCategories(false),
      languages: await getLanguages(false)
    }, null, 2)
  );
}

export { GET };
