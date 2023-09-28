import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute, f as renderComponent, u as unescapeHTML } from '../astro_41089d00.mjs';
import { i as image, g as getLanguages, a as getCategories, b as getStore, c as gct, r as rdf, $ as $$Layout } from './_term__6fabe765.mjs';
import JSONLD from 'jsonld';
import grapoi from 'grapoi';
import 'clsx';
import { resolve } from 'import-meta-resolve';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import Slugger from 'github-slugger';
import { visit } from 'unist-util-visit';
import { definitions } from 'mdast-util-definitions';
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index.js';
import { getHighlighter } from 'shiki';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkSmartypants from 'remark-smartypants';
import { unified } from 'unified';
import { VFile } from 'vfile';

const $$Astro$3 = createAstro();
const $$Category = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Category;
  const { category } = Astro2.props;
  const language = Astro2.locals.language;
  const categoryLabel = category.labels[language];
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(category.searchWords[language]?.join(" ") ?? "", "data-searchwords")}${addAttribute(`category circle ${category.image ? "has-image" : ""}`, "class")}${addAttribute(`--color: ${category.color}`, "style")}${addAttribute(`${Astro2.params.language ? `/${Astro2.params.language}/` : "/"}${category.slug}`, "href")}>${category.image ? renderTemplate`<img class="background-image" loading="lazy"${addAttribute(image(category.image, 145), "src")}>` : null}<h2 class="title" data-display="flex"${addAttribute(language, "data-lang-hidable")}>${categoryLabel}</h2></a>`;
}, "/home/daniel/Development/global-christian-taxonomy/src/components/Category.Circle.astro", void 0);

function isValidAstroData(obj) {
  if (typeof obj === "object" && obj !== null && obj.hasOwnProperty("frontmatter")) {
    const { frontmatter } = obj;
    try {
      JSON.stringify(frontmatter);
    } catch {
      return false;
    }
    return typeof frontmatter === "object" && frontmatter !== null;
  }
  return false;
}
class InvalidAstroDataError extends TypeError {
}
function safelyGetAstroData(vfileData) {
  const { astro } = vfileData;
  if (!astro || !isValidAstroData(astro)) {
    return new InvalidAstroDataError();
  }
  return astro;
}
function setVfileFrontmatter(vfile, frontmatter) {
  vfile.data ??= {};
  vfile.data.astro ??= {};
  vfile.data.astro.frontmatter = frontmatter;
}

const cwdUrlStr = pathToFileURL(path.join(process.cwd(), "package.json")).toString();
async function importPlugin(p) {
  if (typeof p === "string") {
    try {
      const importResult2 = await import(p);
      return importResult2.default;
    } catch {
    }
    const resolved = resolve(p, cwdUrlStr);
    const importResult = await import(resolved);
    return importResult.default;
  }
  return p;
}
function loadPlugins(items) {
  return items.map((p) => {
    return new Promise((resolve, reject) => {
      if (Array.isArray(p)) {
        const [plugin, opts] = p;
        return importPlugin(plugin).then((m) => resolve([m, opts])).catch((e) => reject(e));
      }
      return importPlugin(p).then((m) => resolve([m])).catch((e) => reject(e));
    });
  });
}

const rawNodeTypes = /* @__PURE__ */ new Set(["text", "raw", "mdxTextExpression"]);
const codeTagNames = /* @__PURE__ */ new Set(["code", "pre"]);
function rehypeHeadingIds() {
  return function(tree, file) {
    const headings = [];
    const slugger = new Slugger();
    const isMDX = isMDXFile(file);
    const astroData = safelyGetAstroData(file.data);
    visit(tree, (node) => {
      if (node.type !== "element")
        return;
      const { tagName } = node;
      if (tagName[0] !== "h")
        return;
      const [, level] = tagName.match(/h([0-6])/) ?? [];
      if (!level)
        return;
      const depth = Number.parseInt(level);
      let text = "";
      visit(node, (child, __, parent) => {
        if (child.type === "element" || parent == null) {
          return;
        }
        if (child.type === "raw") {
          if (child.value.match(/^\n?<.*>\n?$/)) {
            return;
          }
        }
        if (rawNodeTypes.has(child.type)) {
          if (isMDX || codeTagNames.has(parent.tagName)) {
            let value = child.value;
            if (isMdxTextExpression(child) && !(astroData instanceof InvalidAstroDataError)) {
              const frontmatterPath = getMdxFrontmatterVariablePath(child);
              if (Array.isArray(frontmatterPath) && frontmatterPath.length > 0) {
                const frontmatterValue = getMdxFrontmatterVariableValue(astroData, frontmatterPath);
                if (typeof frontmatterValue === "string") {
                  value = frontmatterValue;
                }
              }
            }
            text += value;
          } else {
            text += child.value.replace(/\{/g, "${");
          }
        }
      });
      node.properties = node.properties || {};
      if (typeof node.properties.id !== "string") {
        let slug = slugger.slug(text);
        if (slug.endsWith("-"))
          slug = slug.slice(0, -1);
        node.properties.id = slug;
      }
      headings.push({ depth, slug: node.properties.id, text });
    });
    file.data.__astroHeadings = headings;
  };
}
function isMDXFile(file) {
  return Boolean(file.history[0]?.endsWith(".mdx"));
}
function getMdxFrontmatterVariablePath(node) {
  if (!node.data?.estree || node.data.estree.body.length !== 1)
    return new Error();
  const statement = node.data.estree.body[0];
  if (statement?.type !== "ExpressionStatement" || statement.expression.type !== "MemberExpression")
    return new Error();
  let expression = statement.expression;
  const expressionPath = [];
  while (expression.type === "MemberExpression" && expression.property.type === (expression.computed ? "Literal" : "Identifier")) {
    expressionPath.push(
      expression.property.type === "Literal" ? String(expression.property.value) : expression.property.name
    );
    expression = expression.object;
  }
  if (expression.type !== "Identifier" || expression.name !== "frontmatter")
    return new Error();
  return expressionPath.reverse();
}
function getMdxFrontmatterVariableValue(astroData, path) {
  let value = astroData.frontmatter;
  for (const key of path) {
    if (!value[key])
      return void 0;
    value = value[key];
  }
  return value;
}
function isMdxTextExpression(node) {
  return node.type === "mdxTextExpression";
}

function remarkCollectImages() {
  return function(tree, vfile) {
    if (typeof vfile?.path !== "string")
      return;
    const definition = definitions(tree);
    const imagePaths = /* @__PURE__ */ new Set();
    visit(tree, ["image", "imageReference"], (node) => {
      if (node.type === "image") {
        if (shouldOptimizeImage(node.url))
          imagePaths.add(node.url);
      }
      if (node.type === "imageReference") {
        const imageDefinition = definition(node.identifier);
        if (imageDefinition) {
          if (shouldOptimizeImage(imageDefinition.url))
            imagePaths.add(imageDefinition.url);
        }
      }
    });
    vfile.data.imagePaths = imagePaths;
  };
}
function shouldOptimizeImage(src) {
  return !isValidUrl(src) && !src.startsWith("/");
}
function isValidUrl(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

function addAstro(Prism) {
  if (Prism.languages.astro) {
    return;
  }
  let scriptLang;
  if (Prism.languages.typescript) {
    scriptLang = "typescript";
  } else {
    scriptLang = "javascript";
    console.warn(
      "Prism TypeScript language not loaded, Astro scripts will be treated as JavaScript."
    );
  }
  let script = Prism.util.clone(Prism.languages[scriptLang]);
  let space = /(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source;
  let braces = /(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source;
  let spread = /(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;
  function re(source, flags) {
    source = source.replace(/<S>/g, function() {
      return space;
    }).replace(/<BRACES>/g, function() {
      return braces;
    }).replace(/<SPREAD>/g, function() {
      return spread;
    });
    return RegExp(source, flags);
  }
  spread = re(spread).source;
  Prism.languages.astro = Prism.languages.extend("markup", script);
  Prism.languages.astro.tag.pattern = re(
    /<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[^]|[^\\"])*"|'(?:\\[^]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/.source
  );
  Prism.languages.astro.tag.inside["tag"].pattern = /^<\/?[^\s>\/]*/i;
  Prism.languages.astro.tag.inside["attr-value"].pattern = /=(?!\{)(?:"(?:\\[^]|[^\\"])*"|'(?:\\[^]|[^\\'])*'|[^\s'">]+)/i;
  Prism.languages.astro.tag.inside["tag"].inside["class-name"] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/;
  Prism.languages.astro.tag.inside["comment"] = script["comment"];
  Prism.languages.insertBefore(
    "inside",
    "attr-name",
    {
      spread: {
        pattern: re(/<SPREAD>/.source),
        inside: Prism.languages.astro
      }
    },
    Prism.languages.astro.tag
  );
  Prism.languages.insertBefore(
    "inside",
    "special-attr",
    {
      script: {
        // Allow for two levels of nesting
        pattern: re(/=<BRACES>/.source),
        inside: {
          "script-punctuation": {
            pattern: /^=(?={)/,
            alias: "punctuation"
          },
          rest: Prism.languages.astro
        },
        alias: `language-${scriptLang}`
      }
    },
    Prism.languages.astro.tag
  );
  let stringifyToken = function(token) {
    if (!token) {
      return "";
    }
    if (typeof token === "string") {
      return token;
    }
    if (typeof token.content === "string") {
      return token.content;
    }
    return token.content.map(stringifyToken).join("");
  };
  let walkTokens = function(tokens) {
    let openedTags = [];
    for (let i = 0; i < tokens.length; i++) {
      let token = tokens[i];
      if (token.type === "style") {
        return;
      }
      let notTagNorBrace = false;
      if (typeof token !== "string") {
        if (token.type === "tag" && token.content[0] && token.content[0].type === "tag") {
          if (token.content[0].content[0].content === "</") {
            if (openedTags.length > 0 && openedTags[openedTags.length - 1].tagName === stringifyToken(token.content[0].content[1])) {
              openedTags.pop();
            }
          } else {
            if (token.content[token.content.length - 1].content === "/>") ; else {
              openedTags.push({
                tagName: stringifyToken(token.content[0].content[1]),
                openedBraces: 0
              });
            }
          }
        } else if (openedTags.length > 0 && token.type === "punctuation" && token.content === "{") {
          openedTags[openedTags.length - 1].openedBraces++;
        } else if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces > 0 && token.type === "punctuation" && token.content === "}") {
          openedTags[openedTags.length - 1].openedBraces--;
        } else {
          notTagNorBrace = true;
        }
      }
      if (notTagNorBrace || typeof token === "string") {
        if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces === 0) {
          let plainText = stringifyToken(token);
          if (i < tokens.length - 1 && (typeof tokens[i + 1] === "string" || tokens[i + 1].type === "plain-text")) {
            plainText += stringifyToken(tokens[i + 1]);
            tokens.splice(i + 1, 1);
          }
          if (i > 0 && (typeof tokens[i - 1] === "string" || tokens[i - 1].type === "plain-text")) {
            plainText = stringifyToken(tokens[i - 1]) + plainText;
            tokens.splice(i - 1, 1);
            i--;
          }
          tokens[i] = new Prism.Token("plain-text", plainText, void 0, plainText);
        }
      }
      if (token.content && typeof token.content !== "string") {
        walkTokens(token.content);
      }
    }
  };
  Prism.hooks.add("after-tokenize", function(env) {
    if (env.language !== "astro") {
      return;
    }
    walkTokens(env.tokens);
  });
}

const languageMap = /* @__PURE__ */ new Map([["ts", "typescript"]]);
function runHighlighterWithAstro(lang, code) {
  if (!lang) {
    lang = "plaintext";
  }
  let classLanguage = `language-${lang}`;
  const ensureLoaded = (language) => {
    if (language && !Prism.languages[language]) {
      loadLanguages([language]);
    }
  };
  if (languageMap.has(lang)) {
    ensureLoaded(languageMap.get(lang));
  } else if (lang === "astro") {
    ensureLoaded("typescript");
    addAstro(Prism);
  } else {
    ensureLoaded("markup-templating");
    ensureLoaded(lang);
  }
  if (lang && !Prism.languages[lang]) {
    console.warn(`Unable to load the language: ${lang}`);
  }
  const grammar = Prism.languages[lang];
  let html = code;
  if (grammar) {
    html = Prism.highlight(code, grammar, lang);
  }
  return { classLanguage, html };
}

function remarkPrism() {
  return function(tree) {
    visit(tree, "code", (node) => {
      let { lang, value } = node;
      node.type = "html";
      let { html, classLanguage } = runHighlighterWithAstro(lang, value);
      let classes = [classLanguage];
      node.value = `<pre class="${classes.join(
        " "
      )}"><code is:raw class="${classLanguage}">${html}</code></pre>`;
      return node;
    });
  };
}

const highlighterCacheAsync = /* @__PURE__ */ new Map();
function remarkShiki({
  langs = [],
  theme = "github-dark",
  wrap = false
} = {}) {
  const cacheID = typeof theme === "string" ? theme : theme.name;
  let highlighterAsync = highlighterCacheAsync.get(cacheID);
  if (!highlighterAsync) {
    highlighterAsync = getHighlighter({ theme }).then((hl) => {
      hl.setColorReplacements({
        "#000001": "var(--astro-code-color-text)",
        "#000002": "var(--astro-code-color-background)",
        "#000004": "var(--astro-code-token-constant)",
        "#000005": "var(--astro-code-token-string)",
        "#000006": "var(--astro-code-token-comment)",
        "#000007": "var(--astro-code-token-keyword)",
        "#000008": "var(--astro-code-token-parameter)",
        "#000009": "var(--astro-code-token-function)",
        "#000010": "var(--astro-code-token-string-expression)",
        "#000011": "var(--astro-code-token-punctuation)",
        "#000012": "var(--astro-code-token-link)"
      });
      return hl;
    });
    highlighterCacheAsync.set(cacheID, highlighterAsync);
  }
  let highlighter;
  return async (tree) => {
    if (!highlighter) {
      highlighter = await highlighterAsync;
      for (const lang of langs) {
        await highlighter.loadLanguage(lang);
      }
    }
    visit(tree, "code", (node) => {
      let lang;
      if (typeof node.lang === "string") {
        const langExists = highlighter.getLoadedLanguages().includes(node.lang);
        if (langExists) {
          lang = node.lang;
        } else {
          console.warn(`The language "${node.lang}" doesn't exist, falling back to plaintext.`);
          lang = "plaintext";
        }
      } else {
        lang = "plaintext";
      }
      let html = highlighter.codeToHtml(node.value, { lang });
      html = html.replace(/<pre class="(.*?)shiki(.*?)"/, `<pre is:raw class="$1astro-code$2"`);
      if (node.lang === "diff") {
        html = html.replace(
          /<span class="line"><span style="(.*?)">([\+|\-])/g,
          '<span class="line"><span style="$1"><span style="user-select: none;">$2</span>'
        );
      }
      if (wrap === false) {
        html = html.replace(/style="(.*?)"/, 'style="$1; overflow-x: auto;"');
      } else if (wrap === true) {
        html = html.replace(
          /style="(.*?)"/,
          'style="$1; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;"'
        );
      }
      node.type = "html";
      node.value = html;
      node.children = [];
    });
  };
}

function rehypeImages() {
  return () => function(tree, file) {
    visit(tree, (node) => {
      if (node.type !== "element")
        return;
      if (node.tagName !== "img")
        return;
      if (node.properties?.src) {
        if (file.data.imagePaths?.has(node.properties.src)) {
          node.properties["__ASTRO_IMAGE_"] = node.properties.src;
          delete node.properties.src;
        }
      }
    });
  };
}

const markdownConfigDefaults = {
  syntaxHighlight: "shiki",
  shikiConfig: {
    langs: [],
    theme: "github-dark",
    wrap: false
  },
  remarkPlugins: [],
  rehypePlugins: [],
  remarkRehype: {},
  gfm: true,
  smartypants: true
};
const isPerformanceBenchmark = Boolean(process.env.ASTRO_PERFORMANCE_BENCHMARK);
async function createMarkdownProcessor(opts) {
  const {
    syntaxHighlight = markdownConfigDefaults.syntaxHighlight,
    shikiConfig = markdownConfigDefaults.shikiConfig,
    remarkPlugins = markdownConfigDefaults.remarkPlugins,
    rehypePlugins = markdownConfigDefaults.rehypePlugins,
    remarkRehype: remarkRehypeOptions = markdownConfigDefaults.remarkRehype,
    gfm = markdownConfigDefaults.gfm,
    smartypants = markdownConfigDefaults.smartypants
  } = opts ?? {};
  const loadedRemarkPlugins = await Promise.all(loadPlugins(remarkPlugins));
  const loadedRehypePlugins = await Promise.all(loadPlugins(rehypePlugins));
  const parser = unified().use(remarkParse);
  if (!isPerformanceBenchmark) {
    if (gfm) {
      parser.use(remarkGfm);
    }
    if (smartypants) {
      parser.use(remarkSmartypants);
    }
  }
  for (const [plugin, pluginOpts] of loadedRemarkPlugins) {
    parser.use(plugin, pluginOpts);
  }
  if (!isPerformanceBenchmark) {
    if (syntaxHighlight === "shiki") {
      parser.use(remarkShiki, shikiConfig);
    } else if (syntaxHighlight === "prism") {
      parser.use(remarkPrism);
    }
    parser.use(remarkCollectImages);
  }
  parser.use(remarkRehype, {
    allowDangerousHtml: true,
    passThrough: [],
    ...remarkRehypeOptions
  });
  for (const [plugin, pluginOpts] of loadedRehypePlugins) {
    parser.use(plugin, pluginOpts);
  }
  parser.use(rehypeImages());
  if (!isPerformanceBenchmark) {
    parser.use(rehypeHeadingIds);
  }
  parser.use(rehypeRaw).use(rehypeStringify, { allowDangerousHtml: true });
  return {
    async render(content, renderOpts) {
      const vfile = new VFile({ value: content, path: renderOpts?.fileURL });
      setVfileFrontmatter(vfile, renderOpts?.frontmatter ?? {});
      const result = await parser.process(vfile).catch((err) => {
        err = prefixError(err, `Failed to parse Markdown file "${vfile.path}"`);
        console.error(err);
        throw err;
      });
      const astroData = safelyGetAstroData(result.data);
      if (astroData instanceof InvalidAstroDataError) {
        throw astroData;
      }
      return {
        code: String(result.value),
        metadata: {
          headings: result.data.__astroHeadings ?? [],
          imagePaths: result.data.imagePaths ?? /* @__PURE__ */ new Set(),
          frontmatter: astroData.frontmatter ?? {}
        },
        // Compat for `renderMarkdown` only. Do not use!
        __renderMarkdownCompat: {
          result
        }
      };
    }
  };
}
async function renderMarkdown(content, opts) {
  const processor = await createMarkdownProcessor(opts);
  const result = await processor.render(content, {
    fileURL: opts.fileURL,
    frontmatter: opts.frontmatter
  });
  return {
    code: result.code,
    metadata: {
      headings: result.metadata.headings,
      source: content,
      html: result.code
    },
    vfile: result.__renderMarkdownCompat.result
  };
}
function prefixError(err, prefix) {
  if (err?.message) {
    try {
      err.message = `${prefix}:
${err.message}`;
      return err;
    } catch (error) {
    }
  }
  const wrappedError = new Error(`${prefix}${err ? `: ${err}` : ""}`);
  try {
    wrappedError.stack = err.stack;
    wrappedError.cause = err;
  } catch {
  }
  return wrappedError;
}

const $$Astro$2 = createAstro();
class HTMLString extends String {
  get [Symbol.toStringTag]() {
    return "HTMLString";
  }
}
const $$Markdown = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Markdown;
  const output = await renderMarkdown(Astro2.props.of ?? "", {}).then((result) => new HTMLString(result.code));
  return renderTemplate`${output}`;
}, "/home/daniel/Development/global-christian-taxonomy/src/components/Markdown.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Astro$1 = createAstro();
async function getStaticPaths$1() {
  const languages = [...Object.keys(await getLanguages())].filter((language) => language !== "en");
  return languages.map((language) => ({ params: { language } }));
}
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index$1;
  const categories = await getCategories();
  const languages = await getLanguages();
  const language = languages[Astro2.locals.language];
  const store = await getStore();
  const pointer = grapoi({ dataset: store, term: gct("Category") }).in([rdf("type")]);
  const quads = [...pointer.quads() ?? []];
  let doc = await JSONLD.fromRDF(quads);
  doc[0]["@type"] = [...new Set(doc[0]["@type"])];
  doc.push({
    "@type": [
      "http://www.w3.org/ns/ldp#Container",
      "http://www.w3.org/ns/ldp#BasicContainer",
      "http://www.w3.org/ns/ldp#Resource"
    ],
    "http://www.w3.org/ns/ldp#contains": pointer.terms.map((term) => ({ "@id": term.value }))
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Overview", "bodyClass": "home" }, { "default": ($$result2) => renderTemplate(_a$1 || (_a$1 = __template$1(["", '<input type="search" id="grid-filter" class="search-input" placeholder="Search..."><div class="overview grid categories" id="categories-grid">', '<div class="empty circle category"></div><div class="empty circle category"></div><div class="empty circle category"></div><div class="empty circle category"></div><div class="empty circle category"></div><div class="empty circle category"></div><div class="empty circle category"></div><div class="empty circle category"></div><div class="empty circle category"></div></div><script type="application/ld+json">', "<\/script>"])), maybeRenderHead(), categories.map((category) => renderTemplate`${renderComponent($$result2, "Category", $$Category, { "category": category })}`), unescapeHTML(JSON.stringify(doc, null, 2))), "hero": ($$result2) => renderTemplate`<div class="site-introduction"><div class="top"><img loading="lazy" class="image"${addAttribute(image(language.background, 1280, 300), "src")}><div class="title">${renderComponent($$result2, "Markdown", $$Markdown, { "of": language.welcome })}</div></div><div class="logo"><img src="/logo.svg"></div><div class="description">${renderComponent($$result2, "Markdown", $$Markdown, { "of": language.description ?? "" })}</div></div>` })}`;
}, "/home/daniel/Development/global-christian-taxonomy/src/pages/index.astro", void 0);

const $$file$1 = "/home/daniel/Development/global-christian-taxonomy/src/pages/index.astro";
const $$url$1 = "";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$1,
    file: $$file$1,
    getStaticPaths: getStaticPaths$1,
    url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
async function getStaticPaths() {
  const languages = [...Object.keys(await getLanguages())].filter((language) => language !== "en");
  return languages.map((language) => ({ params: { language } }));
}
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const categories = await getCategories();
  const languages = await getLanguages();
  const language = languages[Astro2.locals.language];
  const store = await getStore();
  const pointer = grapoi({ dataset: store, term: gct("Category") }).in([rdf("type")]);
  const quads = [...pointer.quads() ?? []];
  let doc = await JSONLD.fromRDF(quads);
  doc[0]["@type"] = [...new Set(doc[0]["@type"])];
  doc.push({
    "@type": [
      "http://www.w3.org/ns/ldp#Container",
      "http://www.w3.org/ns/ldp#BasicContainer",
      "http://www.w3.org/ns/ldp#Resource"
    ],
    "http://www.w3.org/ns/ldp#contains": pointer.terms.map((term) => ({ "@id": term.value }))
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Overview", "bodyClass": "home" }, { "default": ($$result2) => renderTemplate(_a || (_a = __template(["", '<input type="search" id="grid-filter" class="search-input" placeholder="Search..."><div class="overview grid categories" id="categories-grid">', '<div class="empty circle category"></div><div class="empty circle category"></div><div class="empty circle category"></div><div class="empty circle category"></div><div class="empty circle category"></div><div class="empty circle category"></div><div class="empty circle category"></div><div class="empty circle category"></div><div class="empty circle category"></div></div><script type="application/ld+json">', "<\/script>"])), maybeRenderHead(), categories.map((category) => renderTemplate`${renderComponent($$result2, "Category", $$Category, { "category": category })}`), unescapeHTML(JSON.stringify(doc, null, 2))), "hero": ($$result2) => renderTemplate`<div class="site-introduction"><div class="top"><img loading="lazy" class="image"${addAttribute(image(language.background, 1280, 300), "src")}><div class="title">${renderComponent($$result2, "Markdown", $$Markdown, { "of": language.welcome })}</div></div><div class="logo"><img src="/logo.svg"></div><div class="description">${renderComponent($$result2, "Markdown", $$Markdown, { "of": language.description ?? "" })}</div></div>` })}`;
}, "/home/daniel/Development/global-christian-taxonomy/src/pages/[language]/index.astro", void 0);

const $$file = "/home/daniel/Development/global-christian-taxonomy/src/pages/[language]/index.astro";
const $$url = "/[language]";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    getStaticPaths,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { index as a, index$1 as i };
