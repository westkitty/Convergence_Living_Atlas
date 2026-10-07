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

const externalScripts = [...html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
assert(externalScripts.length === 0, 'no external runtime script dependencies');

const externalUrls = [...html.matchAll(/https?:\/\//g)];
assert(externalUrls.length === 0, 'index.html must remain self-contained apart from local repo assets');

assert(!/class="book-cover-large[^"]*"[^>]*><\/button>/.test(html), 'Book Lens must not contain a dead cover button');

console.log('VALIDATION PASS');
console.log(JSON.stringify({
  bytes: Buffer.byteLength(html),
  coverRefs,
  externalScripts: externalScripts.length,
  externalUrls: externalUrls.length
}, null, 2));
