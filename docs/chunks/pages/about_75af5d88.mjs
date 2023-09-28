import '@astrojs/internal-helpers/path';
import { c as createAstro, d as createComponent, A as AstroError, i as ImageMissingAlt, r as renderTemplate, m as maybeRenderHead, e as addAttribute, s as spreadAttributes, f as renderComponent, u as unescapeHTML } from '../astro_41089d00.mjs';
import { $ as $$Layout } from './_term__6fabe765.mjs';
import 'clsx';
import { g as getImage$1 } from '../astro-assets-services_c88d65cd.mjs';

const $$Astro = createAstro();
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(image.attributes)}>`;
}, "/home/daniel/Development/global-christian-taxonomy/node_modules/astro/components/Image.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[]};
					const getImage = async (options) => await getImage$1(options, imageConfig);

const images$1 = async function() {
					return {
						
					}
				};

				async function updateImageReferences$1(html) {
					return images$1().then((images) => {
						return html.replaceAll(/__ASTRO_IMAGE_="([^"]+)"/gm, (full, imagePath) =>
							spreadAttributes({
								src: images[imagePath].src,
								...images[imagePath].attributes,
							})
						);
					});
				}

				const html$1 = await updateImageReferences$1("<h1 id=\"about\">About</h1>\n<h2 id=\"imagine-a-place\">Imagine a place…</h2>\n<p><img src=\"https://images.unsplash.com/photo-1481358758723-4601c3107e65?ixlib=rb-4.0.3&#x26;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&#x26;auto=format&#x26;fit=crop&#x26;w=500&#x26;h=300&#x26;q=80\" alt=\"library\"></p>\n<p>Imagine a place where you can search for all Christian media (videos, ebooks, audio etc) in all the languages of the world. What if you could receive an email when media would be available in your language but also relevant to your <em>interests</em>?</p>\n<p>What if a sunday school teacher could get an email when there are new <em>children</em> videos about <em>bible stories</em>? The Global Christian Taxonomy is about those interests.</p>\n<h2 id=\"a-christian-standard-category-system\">A Christian standard category system</h2>\n<p><img src=\"https://images.unsplash.com/photo-1529957018945-07aed3538ad5?ixlib=rb-4.0.3&#x26;ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8b3JnYW5pemVkfGVufDB8fDB8fHww&#x26;auto=format&#x26;fit=crop&#x26;w=500&#x26;h=300&#x26;q=60\" alt=\"organized\"></p>\n<p>We want to create a Christian standard category system that will be free for all and easily translatable in any language. We want to help the Christian media landscape to apply these categories to the top 10% of all Christian media.</p>\n<p>We will not be able to do this alone. We want to create a group of organisations that will carry this cause.</p>\n<p><strong>We want to help the Christian Media landscape to achieve this, do you want to join us in this cause?</strong>\nEmail us at <a href=\"mailto:info.media@om.org\"></a><a href=\"mailto:info.media@om.org\">info.media@om.org</a>.</p>\n<h2 id=\"future-integrations\">Future integrations</h2>\n<p><img src=\"https://images.unsplash.com/photo-1610056494249-5d7f111cf78f?ixlib=rb-4.0.3&#x26;ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHVzYiUyMHBsdWd8ZW58MHx8MHx8fDA%3D&#x26;auto=format&#x26;fit=crop&#x26;w=500&#x26;h=300&#x26;q=60\" alt=\"cable\"></p>\n<p>We want to create easy integration for all kinds of systems. It should be very simple to use this category system in your existing website or media system.</p>\n<p>We want to create widgets for systems such as WordPress and Drupal. Selecting the category for a media item should be a simple click.</p>\n<h3 id=\"how-to-use-on-platforms\">How to use on platforms</h3>\n<p>Each category has an identifier such as <code>gct:bibles-and-bible-stories</code>. These identifiers can be used on platforms such as YouTube and Vimeo. On systems that you or your organisation control we should of course show the label in your language.</p>\n<h3 id=\"how-to-use-in-systems-you-own\">How to use in systems you own</h3>\n<p>An integration has to be created that would save the URL such as <code>https://taxonomy.mediaworks.global/bible-studies</code> in your database and which would display the translated label when viewing your website.</p>");

				const frontmatter$1 = {"layout":"../layouts/Layout.astro","title":"About"};
				const file$1 = "/home/daniel/Development/global-christian-taxonomy/src/pages/about.md";
				const url$1 = "/about";
				function rawContent$1() {
					return "# About\n\n## Imagine a place...\n\n![library](https://images.unsplash.com/photo-1481358758723-4601c3107e65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80)\n\nImagine a place where you can search for all Christian media (videos, ebooks, audio etc) in all the languages of the world. What if you could receive an email when media would be available in your language but also relevant to your _interests_?\n\nWhat if a sunday school teacher could get an email when there are new _children_ videos about _bible stories_? The Global Christian Taxonomy is about those interests.\n\n## A Christian standard category system\n\n![organized](https://images.unsplash.com/photo-1529957018945-07aed3538ad5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8b3JnYW5pemVkfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&h=300&q=60)\n\nWe want to create a Christian standard category system that will be free for all and easily translatable in any language. We want to help the Christian media landscape to apply these categories to the top 10% of all Christian media. \n\nWe will not be able to do this alone. We want to create a group of organisations that will carry this cause.\n\n__We want to help the Christian Media landscape to achieve this, do you want to join us in this cause?__\nEmail us at <a href=\"mailto:info.media@om.org\">info.media@om.org</a>.\n\n## Future integrations\n\n\n![cable](https://images.unsplash.com/photo-1610056494249-5d7f111cf78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHVzYiUyMHBsdWd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&h=300&q=60)\n\nWe want to create easy integration for all kinds of systems. It should be very simple to use this category system in your existing website or media system.\n\nWe want to create widgets for systems such as WordPress and Drupal. Selecting the category for a media item should be a simple click.\n\n### How to use on platforms\n\nEach category has an identifier such as `gct:bibles-and-bible-stories`. These identifiers can be used on platforms such as YouTube and Vimeo. On systems that you or your organisation control we should of course show the label in your language.\n\n### How to use in systems you own\n\nAn integration has to be created that would save the URL such as `https://taxonomy.mediaworks.global/bible-studies` in your database and which would display the translated label when viewing your website.";
				}
				function compiledContent$1() {
					return html$1;
				}
				function getHeadings$1() {
					return [{"depth":1,"slug":"about","text":"About"},{"depth":2,"slug":"imagine-a-place","text":"Imagine a place…"},{"depth":2,"slug":"a-christian-standard-category-system","text":"A Christian standard category system"},{"depth":2,"slug":"future-integrations","text":"Future integrations"},{"depth":3,"slug":"how-to-use-on-platforms","text":"How to use on platforms"},{"depth":3,"slug":"how-to-use-in-systems-you-own","text":"How to use in systems you own"}];
				}

				const Content$1 = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter$1;
					content.file = file$1;
					content.url = url$1;

					return renderTemplate`${renderComponent(result, 'Layout', $$Layout, {
								file: file$1,
								url: url$1,
								content,
								frontmatter: content,
								headings: getHeadings$1(),
								rawContent: rawContent$1,
								compiledContent: compiledContent$1,
								'server:root': true,
							}, {
								'default': () => renderTemplate`${unescapeHTML(html$1)}`
							})}`;
				});

const about$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$1,
  compiledContent: compiledContent$1,
  default: Content$1,
  file: file$1,
  frontmatter: frontmatter$1,
  getHeadings: getHeadings$1,
  rawContent: rawContent$1,
  url: url$1
}, Symbol.toStringTag, { value: 'Module' }));

const images = async function() {
					return {
						
					}
				};

				async function updateImageReferences(html) {
					return images().then((images) => {
						return html.replaceAll(/__ASTRO_IMAGE_="([^"]+)"/gm, (full, imagePath) =>
							spreadAttributes({
								src: images[imagePath].src,
								...images[imagePath].attributes,
							})
						);
					});
				}

				const html = await updateImageReferences("<h1 id=\"about\">About</h1>\n<p>Deze pagina is nog niet vertaald. Lees het in het <a href=\"/about\">Engels</a>.</p>");

				const frontmatter = {"layout":"../../layouts/Layout.astro","title":"About"};
				const file = "/home/daniel/Development/global-christian-taxonomy/src/pages/nl/about.md";
				const url = "/nl/about";
				function rawContent() {
					return "# About\n\nDeze pagina is nog niet vertaald. Lees het in het [Engels](/about).";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":1,"slug":"about","text":"About"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${renderComponent(result, 'Layout', $$Layout, {
								file,
								url,
								content,
								frontmatter: content,
								headings: getHeadings(),
								rawContent,
								compiledContent,
								'server:root': true,
							}, {
								'default': () => renderTemplate`${unescapeHTML(html)}`
							})}`;
				});

const about = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content,
  compiledContent,
  default: Content,
  file,
  frontmatter,
  getHeadings,
  rawContent,
  url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Image as $, about$1 as a, about as b };
