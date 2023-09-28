import 'cookie';
import 'kleur/colors';
import 'string-width';
import '@astrojs/internal-helpers/path';
import './chunks/astro_41089d00.mjs';
import 'clsx';
import 'mime';
import { compile } from 'path-to-regexp';
import 'html-escaper';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

new TextEncoder();

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"","routes":[{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.0a14b13b.js"}],"styles":[{"type":"external","src":"/_astro/_term_.0ed8bfb6.css"}],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/export.json","type":"endpoint","pattern":"^\\/export\\.json$","segments":[[{"content":"export.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/export.json.ts","pathname":"/export.json","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.07af1bcc.js"}],"styles":[{"type":"external","src":"/_astro/_term_.0ed8bfb6.css"}],"routeData":{"route":"/download","type":"page","pattern":"^\\/download\\/?$","segments":[[{"content":"download","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/download.mdx","pathname":"/download","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.07af1bcc.js"}],"styles":[{"type":"external","src":"/_astro/_term_.0ed8bfb6.css"}],"routeData":{"route":"/about","type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.md","pathname":"/about","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.07af1bcc.js"}],"styles":[{"type":"external","src":"/_astro/_term_.0ed8bfb6.css"}],"routeData":{"route":"/nl/download","type":"page","pattern":"^\\/nl\\/download\\/?$","segments":[[{"content":"nl","dynamic":false,"spread":false}],[{"content":"download","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/nl/download.mdx","pathname":"/nl/download","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.07af1bcc.js"}],"styles":[{"type":"external","src":"/_astro/_term_.0ed8bfb6.css"}],"routeData":{"route":"/nl/about","type":"page","pattern":"^\\/nl\\/about\\/?$","segments":[[{"content":"nl","dynamic":false,"spread":false}],[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/nl/about.md","pathname":"/nl/about","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.47e712a5.js"}],"styles":[{"type":"external","src":"/_astro/_term_.0ed8bfb6.css"}],"routeData":{"route":"/[language]","type":"page","pattern":"^\\/([^/]+?)\\/?$","segments":[[{"content":"language","dynamic":true,"spread":false}]],"params":["language"],"component":"src/pages/[language]/index.astro","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.07af1bcc.js"}],"styles":[{"type":"external","src":"/_astro/_term_.0ed8bfb6.css"}],"routeData":{"route":"/[language]/[term]","type":"page","pattern":"^\\/([^/]+?)\\/([^/]+?)\\/?$","segments":[[{"content":"language","dynamic":true,"spread":false}],[{"content":"term","dynamic":true,"spread":false}]],"params":["language","term"],"component":"src/pages/[language]/[term].astro","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.07af1bcc.js"}],"styles":[{"type":"external","src":"/_astro/_term_.0ed8bfb6.css"}],"routeData":{"route":"/[term]","type":"page","pattern":"^\\/([^/]+?)\\/?$","segments":[[{"content":"term","dynamic":true,"spread":false}]],"params":["term"],"component":"src/pages/[term].astro","prerender":false,"_meta":{"trailingSlash":"ignore"}}}],"base":"/","compressHTML":true,"componentMetadata":[["/home/daniel/Development/global-christian-taxonomy/src/pages/[language]/[term].astro",{"propagation":"none","containsHead":true}],["/home/daniel/Development/global-christian-taxonomy/src/pages/[language]/index.astro",{"propagation":"none","containsHead":true}],["/home/daniel/Development/global-christian-taxonomy/src/pages/[term].astro",{"propagation":"none","containsHead":true}],["/home/daniel/Development/global-christian-taxonomy/src/pages/about.md",{"propagation":"none","containsHead":true}],["/home/daniel/Development/global-christian-taxonomy/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/daniel/Development/global-christian-taxonomy/src/pages/nl/about.md",{"propagation":"none","containsHead":true}],["/home/daniel/Development/global-christian-taxonomy/src/pages/download.mdx",{"propagation":"none","containsHead":true}],["/home/daniel/Development/global-christian-taxonomy/src/pages/nl/download.mdx",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var r=(i,c,s)=>{let n=async()=>{await(await i())()},t=new IntersectionObserver(e=>{for(let o of e)if(o.isIntersecting){t.disconnect(),n();break}});for(let e of s.children)t.observe(e)};(self.Astro||(self.Astro={})).visible=r;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"/home/daniel/Development/global-christian-taxonomy/src/middleware.ts":"middleware2.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/export.json@_@ts":"pages/export.json.astro.mjs","\u0000@astro-page:src/pages/download@_@mdx":"pages/download.astro.mjs","\u0000@astro-page:src/pages/about@_@md":"pages/about.astro.mjs","\u0000@astro-page:src/pages/nl/download@_@mdx":"pages/nl/download.astro.mjs","\u0000@astro-page:src/pages/nl/about@_@md":"pages/nl/about.astro.mjs","\u0000@astro-page:src/pages/[language]/index@_@astro":"pages/_language_.astro.mjs","\u0000@astro-page:src/pages/[language]/[term]@_@astro":"pages/_language_/_term_.astro.mjs","\u0000@astro-page:src/pages/[term]@_@astro":"pages/_term_.astro.mjs","\u0000@astro-renderers":"renderers.mjs","/src/pages/export.json.ts":"chunks/pages/export_5b3eec3d.mjs","\u0000@astrojs-manifest":"manifest_b50908f9.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.0a14b13b.js","/astro/hoisted.js?q=1":"_astro/hoisted.47e712a5.js","/astro/hoisted.js?q=2":"_astro/hoisted.07af1bcc.js","astro:scripts/before-hydration.js":""},"assets":[]});

export { manifest };
