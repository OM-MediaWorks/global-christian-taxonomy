import { g as getLanguages } from './chunks/pages/_term__6fabe765.mjs';
import './chunks/astro_41089d00.mjs';
import 'clsx';
import 'html-escaper';
import 'jsonld';
import 'grapoi';
import '@rdfjs/namespace';
import 'n3';
import 'fs/promises';
import 'dedent';
import 'uniqolor';
/* empty css                                  */
const languages = await getLanguages();
const onRequest = ({ params, locals, url }, next) => {
  let language = params.language;
  if (!language) {
    const pathParts = url.pathname.split("/").filter(Boolean);
    if (pathParts[0] in languages) {
      language = pathParts[0];
    }
  }
  if (!language)
    language = "en";
  locals.language = language;
  return next();
};

export { onRequest };
