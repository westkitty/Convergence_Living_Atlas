import fs from 'node:fs';

const html = fs.readFileSync('index.html', 'utf8');
const fail = (message) => {
  console.error('VALIDATION FAIL:', message);
  process.exit(1);
};
const assert = (condition, message) => {
  if (!condition) fail(message);
};

const scriptMatch = html.match(/<script>([\s\S]*)<\/script>\s*<\/body>/);
assert(scriptMatch, 'inline application script not found');

try {
  new Function(scriptMatch[1]);
} catch (error) {
  fail('JavaScript syntax: ' + error.message);
}

const required = [
  ['assets/covers.webp', 'cover sprite is wired into the UI'],
  ['function renderBook(n)', 'Book Lens exists'],
  ["case'book':renderBook(r.a)", 'Book Lens route exists'],
  ['if(n>STATE.scopeBook)', 'Book Lens spoiler gate exists'],
  ["!withinScope(c.first)){routeTo('characters')", 'character deep-link spoiler gate exists'],
  ['const scopedChars=CHARACTERS.filter(c=>withinScope(c.first))', 'compare spoiler guard exists'],
  ["RELATIONSHIPS.filter(r=>withinScope(r.first))", 'relationships honor scope'],
  ["KNOWLEDGE.filter(k=>withinScope(k.book))", 'knowledge honors scope'],
  ["EVENTS.filter(e=>e.book<=STATE.scopeBook)", 'events honor scope'],
  ['max="${STATE.scopeBook}"', 'timeline range is spoiler-capped'],
  ['if(destroyed||document.hidden)return', 'hidden-tab graph rendering pauses'],
  ['role="dialog" aria-modal="true"', 'modal semantics exist'],
  ["if(e.key==='Tab')", 'dialog keyboard focus containment exists'],
  ['prefers-reduced-motion', 'reduced-motion handling exists']
];
for (const [needle, label] of required) assert(html.includes(needle), label);

const coverRefs = (html.match(/assets\/covers\.webp/g) || []).length;
assert(coverRefs >= 5, 'cover sprite must be used across multiple surfaces');

const generatedAssets = ["hero.webp","atlas-bg.webp","characters.webp","relationships.webp","timeline.webp","events.webp","groups.webp","contradictions.webp","compare.webp","archive.webp","evidence.webp","keys.webp","kaz-duke.webp","paris.webp","cosmic.webp","app-icon.webp","annie.webp","azib.webp","boots.webp","sentinel.webp","guardian.webp","recon.webp","anomaly.webp","tactical.webp","temporal.webp"];
for (const file of generatedAssets) {
  const path = 'assets/generated/' + file;
  assert(fs.existsSync(path), 'missing generated asset: ' + path);
  assert(fs.statSync(path).size > 10_000, 'generated asset unexpectedly small: ' + path);
}
const integratedAssets = ["hero.webp","atlas-bg.webp","characters.webp","relationships.webp","timeline.webp","events.webp","groups.webp","contradictions.webp","compare.webp","archive.webp","evidence.webp","keys.webp","kaz-duke.webp","paris.webp","cosmic.webp","app-icon.webp","annie.webp","azib.webp","boots.webp"];
for (const file of integratedAssets) assert(html.includes(file), 'generated production asset is not wired into HTML: ' + file);
assert(html.includes("gdriveAsset('atlas-bg.webp')"), 'Atlas must render the verified generated background');
assert(html.includes("gdriveAsset('hero.webp')"), 'Overview must render the verified generated hero');
assert(html.includes('generated-gallery'), 'Overview visual archive must exist');

const externalScripts = [...html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
assert(externalScripts.length === 0, 'no external runtime script dependencies');

const externalUrls = [...html.matchAll(/https?:\/\//g)];
assert(externalUrls.length === 0, 'index.html must remain self-contained apart from local repo assets');

assert(!/class="book-cover-large[^"]*"[^>]*><\/button>/.test(html), 'Book Lens must not contain a dead cover button');

console.log('VALIDATION PASS');
console.log(JSON.stringify({
  bytes: Buffer.byteLength(html),
  coverRefs,
  generatedAssets: generatedAssets.length,
  integratedAssets: integratedAssets.length,
  externalScripts: externalScripts.length,
  externalUrls: externalUrls.length
}, null, 2));
