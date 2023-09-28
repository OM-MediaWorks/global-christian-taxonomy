import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute, f as renderComponent, F as Fragment, g as renderSlot, h as renderHead, u as unescapeHTML } from '../astro_41089d00.mjs';
import JSONLD from 'jsonld';
import grapoi from 'grapoi';
import namespace from '@rdfjs/namespace';
import { Parser, Store } from 'n3';
import fs from 'fs/promises';
import dedent from 'dedent';
import uniqolor from 'uniqolor';
/* empty css                            */import 'clsx';

const schema = namespace("https://schema.org/");
const rdf = namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
namespace("http://www.w3.org/ns/shacl#");
namespace("http://www.w3.org/2001/XMLSchema#");
const rdfs = namespace("http://www.w3.org/2000/01/rdf-schema#");
namespace("https://github.com/danielbeeke/shacl-form/ontology#");
namespace("http://datashapes.org/dash#");
namespace("https://schemas.link/shacl-next#");
const gct = namespace("http://taxonomy.mediaworks.global/");
const gctl = namespace("http://taxonomy.mediaworks.global/language/");

const getStore = async () => {
  const parser = new Parser();
  const files = await fs.readdir("./public/taxonomy");
  const store = new Store();
  for (const file of files) {
    const data = await fs.readFile(`./public/taxonomy/${file}`, { encoding: "utf8" });
    const quads = await parser.parse(data);
    store.addQuads(quads);
  }
  return store;
};
const translationPrefix = gctl().value + "translation-";
const getLanguages = async (includePointers = true) => {
  const store = await getStore();
  const pointers = grapoi({ dataset: store, term: gctl("Language") }).in([rdf("type")]);
  const categories = await getCategories();
  const languages = Object.fromEntries(pointers.map((pointer) => {
    const langCode = pointer.term.value.split("/").pop();
    const translatedCount = categories.reduce((accumulator, category) => accumulator += category.labels[langCode] ? 1 : 0, 0);
    const percentage = Math.round(translatedCount / categories.length * 100);
    const label = pointer.out([rdfs("label")]).value;
    const description = pointer.out([gctl("description")]).value;
    const welcome = pointer.out([gctl("welcome")]).value;
    const title = pointer.out([gctl("title")]).value;
    const translations = {};
    for (const quad of [...pointer.out().quads()]) {
      if (quad.predicate.value.startsWith(translationPrefix)) {
        const translationKey = quad.predicate.value.replace(translationPrefix, "");
        translations[translationKey] = quad.object.value;
      }
    }
    const language = [langCode, {
      label,
      percentage,
      translations,
      description: description ? dedent`${description}` : "",
      welcome: welcome ? dedent`${welcome}` : "",
      title: title ? dedent`${title}` : "",
      background: pointer.out([gctl("background")]).value,
      bcp47: pointer.out([gctl("bcp47")]).value
    }];
    if (includePointers)
      language.pointer = pointer;
    return language;
  }));
  for (const language of Object.values(languages)) {
    const fallbackProperties = ["background", "title", "welcome", "description"];
    for (const fallbackProperty of fallbackProperties) {
      if (!language[fallbackProperty])
        language[fallbackProperty] = languages["en"][fallbackProperty];
    }
  }
  return languages;
};
const getCategories = async (includePointers = true) => {
  const store = await getStore();
  const pointer = grapoi({ dataset: store, term: gct("Category") }).in([rdf("type")]);
  return pointer.map((categoryPointer) => {
    const searchWords = {};
    for (const term of categoryPointer.out([gct("searchWords")]).terms) {
      if (!searchWords[term.language]) {
        searchWords[term.language] = [];
      }
      searchWords[term.language].push(term.value);
    }
    const slug = categoryPointer.term.value.split("/").pop();
    const category = {
      uri: categoryPointer.term.value,
      color: uniqolor(slug, { lightness: [10, 40] }).color,
      slug,
      searchWords,
      labels: Object.fromEntries(categoryPointer.out([rdfs("label")]).terms.map((term) => [term.language, term.value])),
      descriptions: Object.fromEntries(categoryPointer.out([rdfs("comment")]).terms.map((term) => [term.language, term.value])),
      image: categoryPointer.out([schema("image")]).value
      // ?? backgroundFallback
    };
    if (includePointers)
      category.pointer = categoryPointer;
    return category;
  });
};
const getCategory = async (slug) => {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug);
};

const image = (image2, width, height) => {
  if (!height)
    height = width;
  return `https://wsrv.nl/?url=${image2}&w=${width}&h=${height}&fit=cover&a=attention`;
};

const $$Astro$5 = createAstro();
const $$LanguageSelector = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$LanguageSelector;
  const languages = await getLanguages();
  const pageLanguage = Astro2.locals.language;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(Object.keys(languages).join(","), "data-languages")} class="language-switcher" id="language-switcher"><select class="mobile">${Object.entries(languages).map(async ([langcode, { label, percentage }]) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`<option${addAttribute(pageLanguage === langcode, "selected")}${addAttribute(langcode === "en" ? "" : langcode, "value")}>${langcode}</option>` })}`)}</select><select class="desktop">${Object.entries(languages).map(async ([langcode, { label, percentage }]) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`<option${addAttribute(pageLanguage === langcode, "selected")}${addAttribute(langcode === "en" ? "" : langcode, "value")}>${`${label}${percentage === 100 ? "" : ` (${percentage}%)`}`}</option>` })}`)}</select></div>`;
}, "/home/daniel/Development/global-christian-taxonomy/src/components/LanguageSelector.astro", void 0);

const $$Astro$4 = createAstro();
const $$MenuItem = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$MenuItem;
  let localizedLink = (Astro2.locals.language === "en" ? "" : "/" + Astro2.locals.language) + Astro2.props.link;
  if (localizedLink.length > 1 && localizedLink.at(-1) === "/")
    localizedLink = localizedLink.substring(0, localizedLink.length - 1);
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(Astro2.props.target, "target")}${addAttribute(`link ${localizedLink === Astro2.url.pathname ? "active" : ""}`, "class")}${addAttribute(localizedLink, "href")}>${renderSlot($$result, $$slots["default"])}</a>`;
}, "/home/daniel/Development/global-christian-taxonomy/src/components/MenuItem.astro", void 0);

const $$Astro$3 = createAstro();
const $$MainMenu = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$MainMenu;
  return renderTemplate`${maybeRenderHead()}<nav class="main-menu">${renderComponent($$result, "MenuItem", $$MenuItem, { "link": "/" }, { "default": ($$result2) => renderTemplate`Home` })}${renderComponent($$result, "MenuItem", $$MenuItem, { "link": "/download" }, { "default": ($$result2) => renderTemplate`Download` })}${renderComponent($$result, "MenuItem", $$MenuItem, { "link": "/about" }, { "default": ($$result2) => renderTemplate`About` })}</nav>`;
}, "/home/daniel/Development/global-christian-taxonomy/src/components/MainMenu.astro", void 0);

const $$Astro$2 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, bodyClass } = Astro2.props;
  const languages = await getLanguages();
  const language = languages[Astro2.locals.language];
  const pageTitle = `${title ?? Astro2.props.frontmatter.title} | Global Christian Taxonomy`;
  return renderTemplate`<html${addAttribute(Astro2.params.language ?? "en", "lang")}><head><meta charset="UTF-8"><meta name="description"${addAttribute(pageTitle, "content")}><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/logo.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${pageTitle}</title>${renderHead()}</head><body${addAttribute(bodyClass ?? "", "class")}><header class="site-header"><a class="site-link"${addAttribute(Astro2.locals.language === "en" ? "/" : `/${Astro2.locals.language}`, "href")}><img src="/logo.svg" class="site-logo"><h1 class="site-title">${language.title}</h1></a>${renderComponent($$result, "LanguageSelector", $$LanguageSelector, {})}</header>${renderComponent($$result, "MainMenu", $$MainMenu, {})}${renderSlot($$result, $$slots["hero"], renderTemplate`<div slot="hero" class="hero has-image empty"><img class="image"${addAttribute(image(language.background, 1e3, 200), "src")}></div>`)}<main class="site-main">${renderSlot($$result, $$slots["default"])}</main><footer class="site-footer">${renderSlot($$result, $$slots["footer"])}<div class="links"><ul><li><a href="https://github.com/OM-MediaWorks/" target="_blank">GitHub</a></li><li><a href="https://om.org" target="_blank">OM International</a></li><li><a href="https://om.org/mediaworks" target="_blank">MediaWorks</a></li></ul><img class="image"${addAttribute(image("https://images.unsplash.com/photo-1604549944235-3e5579b15cc2", 1e3), "src")}></div></footer></body></html>`;
}, "/home/daniel/Development/global-christian-taxonomy/src/layouts/Layout.astro", void 0);

const Layout = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Layout
}, Symbol.toStringTag, { value: 'Module' }));

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Astro$1 = createAstro();
async function getStaticPaths$1() {
  const categories = await getCategories();
  const languages = [...Object.keys(await getLanguages())].filter((language) => language !== "en");
  return languages.flatMap((language) => categories.map((category) => ({ params: { language, term: category.slug } })));
}
const $$term$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$term$1;
  const languages = await getLanguages();
  const category = await getCategory(Astro2.params.term);
  if (!category)
    throw new Error("Category does not exist");
  const pageLanguage = Astro2.locals.language;
  const translations = languages[pageLanguage].translations;
  const categoryLabel = category.labels[pageLanguage];
  const categoryDescription = category.descriptions[pageLanguage];
  const otherLanguages = Object.fromEntries(Object.keys(category.labels).filter((langCode) => langCode !== pageLanguage).map((langCode) => [langCode, languages[langCode].label]));
  const categorySearchWords = category.searchWords[pageLanguage];
  const formatter = new Intl.ListFormat(pageLanguage, { style: "long", type: "conjunction" });
  const quads = [...category.pointer?.out().quads() ?? []];
  let doc = await JSONLD.fromRDF(quads);
  doc[0]["@type"] = [...new Set(doc[0]["@type"])];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": category.labels.en }, { "default": ($$result2) => renderTemplate(_a$1 || (_a$1 = __template$1(["", '<div><nav class="breadcrumb"><a class="link" href="/">', '</a><span class="divider"></span><a class="link"', ">", "</a></nav>", '<div class="field identifier"><label class="label">', '</label><div class="items"><span class="item">gct:', "</span></div></div>", "", '</div><script type="application/ld+json">', "<\/script>"])), maybeRenderHead(), translations["all"], addAttribute(Astro2.url, "href"), categoryLabel, categoryDescription ? renderTemplate`<div class="description field">${categoryDescription}</div>` : null, translations["identifier"], Astro2.params.term, Object.keys(otherLanguages).length ? renderTemplate`<div class="field other-translations"><label class="label">${translations["other-translations"]}</label><div class="items">${Object.entries(otherLanguages).map(([langCode, otherLanguage]) => renderTemplate`<a${addAttribute(`${langCode !== "en" ? "/" + langCode : ""}/${Astro2.params.term}`, "href")} class="item link-outline">${otherLanguage}</a>`)}</div></div>` : null, categorySearchWords ? renderTemplate`<div class="field search-words"><label class="label">${translations["search-words"]}</label><div class="items"><span class="item">${formatter.format(categorySearchWords)}</span></div></div>` : null, unescapeHTML(JSON.stringify(doc, null, 2))), "footer": ($$result2) => renderTemplate`<div class="translate"><img class="image" src="https://images.unsplash.com/photo-1531266752426-aad472b7bbf4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGdsb2JlfGVufDB8fDB8fHww&auto=format&fit=crop&w=1000&q=60"><h1>Don't see your language?</h1><p>Help our common cause by transating the text.</p><a class="cta-button" href="mailto:info.media@om.org?subject=I would like to translate Global Christian Taxonomy">Translate</a></div>`, "hero": ($$result2) => renderTemplate`<div${addAttribute(`hero ${category.image ? "has-image" : ""}`, "class")}${addAttribute({ "--color": category.color }, "style")}>${category.image ? renderTemplate`<img${addAttribute(image(category.image, 1280, 400), "src")} class="image">` : null}<div class="title">${categoryLabel}</div></div>` })}`;
}, "/home/daniel/Development/global-christian-taxonomy/src/pages/[language]/[term].astro", void 0);

const $$file$1 = "/home/daniel/Development/global-christian-taxonomy/src/pages/[language]/[term].astro";
const $$url$1 = "/[language]/[term]";

const _term_$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$term$1,
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
  const categories = await getCategories();
  const languages = [...Object.keys(await getLanguages())].filter((language) => language !== "en");
  return languages.flatMap((language) => categories.map((category) => ({ params: { language, term: category.slug } })));
}
const $$term = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$term;
  const languages = await getLanguages();
  const category = await getCategory(Astro2.params.term);
  if (!category)
    throw new Error("Category does not exist");
  const pageLanguage = Astro2.locals.language;
  const translations = languages[pageLanguage].translations;
  const categoryLabel = category.labels[pageLanguage];
  const categoryDescription = category.descriptions[pageLanguage];
  const otherLanguages = Object.fromEntries(Object.keys(category.labels).filter((langCode) => langCode !== pageLanguage).map((langCode) => [langCode, languages[langCode].label]));
  const categorySearchWords = category.searchWords[pageLanguage];
  const formatter = new Intl.ListFormat(pageLanguage, { style: "long", type: "conjunction" });
  const quads = [...category.pointer?.out().quads() ?? []];
  let doc = await JSONLD.fromRDF(quads);
  doc[0]["@type"] = [...new Set(doc[0]["@type"])];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": category.labels.en }, { "default": ($$result2) => renderTemplate(_a || (_a = __template(["", '<div><nav class="breadcrumb"><a class="link" href="/">', '</a><span class="divider"></span><a class="link"', ">", "</a></nav>", '<div class="field identifier"><label class="label">', '</label><div class="items"><span class="item">gct:', "</span></div></div>", "", '</div><script type="application/ld+json">', "<\/script>"])), maybeRenderHead(), translations["all"], addAttribute(Astro2.url, "href"), categoryLabel, categoryDescription ? renderTemplate`<div class="description field">${categoryDescription}</div>` : null, translations["identifier"], Astro2.params.term, Object.keys(otherLanguages).length ? renderTemplate`<div class="field other-translations"><label class="label">${translations["other-translations"]}</label><div class="items">${Object.entries(otherLanguages).map(([langCode, otherLanguage]) => renderTemplate`<a${addAttribute(`${langCode !== "en" ? "/" + langCode : ""}/${Astro2.params.term}`, "href")} class="item link-outline">${otherLanguage}</a>`)}</div></div>` : null, categorySearchWords ? renderTemplate`<div class="field search-words"><label class="label">${translations["search-words"]}</label><div class="items"><span class="item">${formatter.format(categorySearchWords)}</span></div></div>` : null, unescapeHTML(JSON.stringify(doc, null, 2))), "footer": ($$result2) => renderTemplate`<div class="translate"><img class="image" src="https://images.unsplash.com/photo-1531266752426-aad472b7bbf4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGdsb2JlfGVufDB8fDB8fHww&auto=format&fit=crop&w=1000&q=60"><h1>Don't see your language?</h1><p>Help our common cause by transating the text.</p><a class="cta-button" href="mailto:info.media@om.org?subject=I would like to translate Global Christian Taxonomy">Translate</a></div>`, "hero": ($$result2) => renderTemplate`<div${addAttribute(`hero ${category.image ? "has-image" : ""}`, "class")}${addAttribute({ "--color": category.color }, "style")}>${category.image ? renderTemplate`<img${addAttribute(image(category.image, 1280, 400), "src")} class="image">` : null}<div class="title">${categoryLabel}</div></div>` })}`;
}, "/home/daniel/Development/global-christian-taxonomy/src/pages/[term].astro", void 0);

const $$file = "/home/daniel/Development/global-christian-taxonomy/src/pages/[term].astro";
const $$url = "/[term]";

const _term_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$term,
    file: $$file,
    getStaticPaths,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, Layout as L, _term_$1 as _, getCategories as a, getStore as b, gct as c, _term_ as d, getLanguages as g, image as i, rdf as r };
