#!/usr/bin/env node
/**
 * iStarEcho Landing — Production Build
 *
 * Purpose: Strip developer comments / internal notes / decision dates from
 * source files before deploying to public CDN. Source files keep all comments
 * for team collaboration; built output is what end-users see.
 *
 * Pipeline:
 *   1. Copy all assets (images, favicon, _headers, og-images, etc.) to dist/
 *   2. Minify HTML (strip comments, preserve whitespace where it matters)
 *   3. Minify CSS (strip comments, keep formatting readable enough)
 *   4. Minify JS (strip comments, keep variable names — i18n keys must work)
 *
 * Run:  npm run build   (or: node build.js)
 * Output: ./dist/
 *
 * Build pipeline version: 1.0.0
 */

const fs = require('fs');
const path = require('path');
const { minify: minifyHtml } = require('html-minifier-terser');
const CleanCSS = require('clean-css');
const { minify: minifyJs } = require('terser');

const SRC = __dirname;
const DIST = path.join(SRC, 'dist');

// Files that go through minification
const HTML_FILES = ['index.html', 'philosophy.html', 'proof.html', 'business.html'];
const CSS_FILES = ['style.css'];
const JS_FILES = ['i18n.js'];

// Files / dirs to copy as-is (no minification, no source-edit)
const COPY_ASSETS = [
    'images',
    '_headers',
    'favicon.ico',
    'favicon.svg',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'favicon-48x48.png',
    'favicon-64x64.png',
    'favicon-180x180.png',
    'favicon-192x192.png',
    'favicon-512x512.png',
    'apple-touch-icon.png',
    'og-image.png',
    'og-image-zh-TW.png',
    'og-image-zh-CN.png',
    'og-image-ja.png',
];

function ensureDist() {
    if (fs.existsSync(DIST)) {
        fs.rmSync(DIST, { recursive: true, force: true });
    }
    fs.mkdirSync(DIST, { recursive: true });
}

function copyRecursive(src, dest) {
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
        fs.mkdirSync(dest, { recursive: true });
        for (const entry of fs.readdirSync(src)) {
            copyRecursive(path.join(src, entry), path.join(dest, entry));
        }
    } else {
        fs.copyFileSync(src, dest);
    }
}

function copyAssets() {
    for (const asset of COPY_ASSETS) {
        const srcPath = path.join(SRC, asset);
        const destPath = path.join(DIST, asset);
        if (fs.existsSync(srcPath)) {
            copyRecursive(srcPath, destPath);
            console.log(`  copy: ${asset}`);
        }
    }
    // _headers extra step: strip `#` comments (Cloudflare server config — not
    // exposed to clients, but keeping it clean as defense-in-depth).
    const headersPath = path.join(DIST, '_headers');
    if (fs.existsSync(headersPath)) {
        const original = fs.readFileSync(headersPath, 'utf8');
        const cleaned = original
            .split('\n')
            .filter((line) => !line.trim().startsWith('#'))
            .filter((line, idx, arr) => !(line.trim() === '' && idx > 0 && arr[idx - 1].trim() === ''))
            .join('\n');
        fs.writeFileSync(headersPath, cleaned, 'utf8');
        console.log(`  strip-comments: _headers  (${original.length} → ${cleaned.length} bytes)`);
    }
}

async function buildHtml() {
    for (const file of HTML_FILES) {
        const srcPath = path.join(SRC, file);
        if (!fs.existsSync(srcPath)) continue;
        const src = fs.readFileSync(srcPath, 'utf8');
        const out = await minifyHtml(src, {
            // Strip all HTML comments (the actual goal of this build)
            removeComments: true,
            // Keep readable enough — we are not optimizing for byte size, just stripping internals
            collapseWhitespace: false,
            // Don't touch attribute order / values — i18n / data-* must work
            sortAttributes: false,
            sortClassName: false,
            // Don't minify inline JS / CSS — let our own dedicated steps handle them
            minifyJS: false,
            minifyCSS: false,
            // Safety: preserve case for tags / attrs (Cloudflare email-decode etc.)
            caseSensitive: true,
        });
        fs.writeFileSync(path.join(DIST, file), out, 'utf8');
        console.log(`  html: ${file}  (${src.length} → ${out.length} bytes)`);
    }
}

function buildCss() {
    const cleaner = new CleanCSS({
        // Strip comments (main goal)
        format: false,
        level: {
            1: { all: false, removeQuotes: false, specialComments: 0 },
            2: { all: false },
        },
        // We don't want aggressive optimization — just comment removal + light cleanup
        returnPromise: false,
    });
    for (const file of CSS_FILES) {
        const srcPath = path.join(SRC, file);
        if (!fs.existsSync(srcPath)) continue;
        const src = fs.readFileSync(srcPath, 'utf8');
        // Manual: strip /* ... */ comments while preserving readability
        const out = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\n{3,}/g, '\n\n');
        fs.writeFileSync(path.join(DIST, file), out, 'utf8');
        console.log(`  css : ${file}  (${src.length} → ${out.length} bytes)`);
    }
}

async function buildJs() {
    for (const file of JS_FILES) {
        const srcPath = path.join(SRC, file);
        if (!fs.existsSync(srcPath)) continue;
        const src = fs.readFileSync(srcPath, 'utf8');
        const result = await minifyJs(src, {
            // Strip comments (main goal)
            format: { comments: false },
            // Don't mangle / compress — i18n keys must be readable for debugging
            mangle: false,
            compress: false,
        });
        fs.writeFileSync(path.join(DIST, file), result.code, 'utf8');
        console.log(`  js  : ${file}  (${src.length} → ${result.code.length} bytes)`);
    }
}

async function main() {
    console.log('iStarEcho landing — production build');
    console.log(`  src:  ${SRC}`);
    console.log(`  dist: ${DIST}`);
    console.log('');

    ensureDist();
    console.log('[1/4] copy assets...');
    copyAssets();
    console.log('[2/4] build html (strip comments)...');
    await buildHtml();
    console.log('[3/4] build css (strip comments)...');
    buildCss();
    console.log('[4/4] build js (strip comments)...');
    await buildJs();

    console.log('');
    console.log('build complete: ./dist/');
}

main().catch((err) => {
    console.error('build failed:', err);
    process.exit(1);
});
