import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute, _ as __astro_tag_component__, F as Fragment, j as createVNode } from '../astro_41089d00.mjs';
import '@astrojs/internal-helpers/path';
import { $ as $$Image } from './about_75af5d88.mjs';
import 'clsx';
import { g as getLanguages } from './_term__6fabe765.mjs';

const $$Astro = createAstro();
const $$Downloadables = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Downloadables;
  const languages = await getLanguages();
  return renderTemplate`${maybeRenderHead()}<ul><li><a href="/taxonomy/core.ttl">Core</a></li>${Object.entries(languages).map(([langCode, language]) => renderTemplate`<li><a${addAttribute(`/taxonomy/${langCode}.ttl`, "href")}>${language.label}</a></li>`)}</ul>`;
}, "/home/daniel/Development/global-christian-taxonomy/src/components/Downloadables.astro", void 0);

const MDXLayout$1 = async function ({
  children
}) {
  const Layout = (await import('./_term__6fabe765.mjs').then(n => n.L)).default;
  const {
    layout,
    ...content
  } = frontmatter$1;
  content.file = file$1;
  content.url = url$1;
  return createVNode(Layout, {
    file: file$1,
    url: url$1,
    content,
    frontmatter: content,
    headings: getHeadings$1(),
    "server:root": true,
    children
  });
};
const frontmatter$1 = {
  "layout": "../layouts/Layout.astro",
  "title": "Download"
};
function getHeadings$1() {
  return [{
    "depth": 1,
    "slug": "download",
    "text": "Download"
  }];
}
const __usesAstroImage$1 = true;
function _createMdxContent$1(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    ul: "ul",
    li: "li",
    a: "a"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "download",
      children: "Download"
    }), "\n", createVNode(_components.p, {
      children: "The data is available as RDF turtle at:"
    }), "\n", createVNode($$Downloadables, {}), "\n", createVNode(_components.p, {
      children: "We also have a JSON export (currently unstable):"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/export.json",
          children: "JSON"
        })
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "At a later stage we will add Excel sheets. We also want to create integrations to other systems such as WordPress and Drupal."
    }), "\n", createVNode(_components.p, {
      children: ["Read more at the ", createVNode(_components.a, {
        href: "/about",
        children: "about page"
      }), "."]
    })]
  });
}
function MDXContent$1(props = {}) {
  return createVNode(MDXLayout$1, {
    ...props,
    children: createVNode(_createMdxContent$1, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$1, "astro:jsx");
__astro_tag_component__(MDXContent$1, "astro:jsx");
const url$1 = "/download";
const file$1 = "/home/daniel/Development/global-christian-taxonomy/src/pages/download.mdx";
const Content$1 = (props = {}) => MDXContent$1({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content$1[Symbol.for('mdx-component')] = true;
Content$1[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$1.layout);
Content$1.moduleId = "/home/daniel/Development/global-christian-taxonomy/src/pages/download.mdx";

const download$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    Content: Content$1,
    __usesAstroImage: __usesAstroImage$1,
    default: Content$1,
    file: file$1,
    frontmatter: frontmatter$1,
    getHeadings: getHeadings$1,
    url: url$1
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout = async function ({
  children
}) {
  const Layout = (await import('./_term__6fabe765.mjs').then(n => n.L)).default;
  const {
    layout,
    ...content
  } = frontmatter;
  content.file = file;
  content.url = url;
  return createVNode(Layout, {
    file,
    url,
    content,
    frontmatter: content,
    headings: getHeadings(),
    "server:root": true,
    children
  });
};
const frontmatter = {
  "layout": "../../layouts/Layout.astro",
  "title": "Download"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "download",
    "text": "Download"
  }];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    ul: "ul",
    li: "li",
    a: "a"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "download",
      children: "Download"
    }), "\n", createVNode(_components.p, {
      children: "De data is beschikbaar als RDF turtle:"
    }), "\n", createVNode($$Downloadables, {}), "\n", createVNode(_components.p, {
      children: "We hebben ook een JSON export (onstabiel op het moment)"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "/export.json",
          children: "JSON"
        })
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "Op een later moment zullen we ook Excel toevoegen. We willen ook integraties met andere systemen aanbieden zoals WordPress en Drupal."
    }), "\n", createVNode(_components.p, {
      children: ["Lees meer op de ", createVNode(_components.a, {
        href: "/about",
        children: "Over pagina"
      }), "."]
    })]
  });
}
function MDXContent(props = {}) {
  return createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings, "astro:jsx");
__astro_tag_component__(MDXContent, "astro:jsx");
const url = "/nl/download";
const file = "/home/daniel/Development/global-christian-taxonomy/src/pages/nl/download.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/daniel/Development/global-christian-taxonomy/src/pages/nl/download.mdx";

const download = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    Content,
    __usesAstroImage,
    default: Content,
    file,
    frontmatter,
    getHeadings,
    url
}, Symbol.toStringTag, { value: 'Module' }));

export { download as a, download$1 as d };
