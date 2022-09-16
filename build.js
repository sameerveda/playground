const esbuild = require('esbuild');
const { readdirSync } = require('fs');
const package = require('./package.json');
const { join } = require('path');
const { postcssPlugin, sveltePlugin, esbuild_default_loaders, startServeHttp } = require('web-utils/esbuild-init');

const dev = process.argv.includes('--dev');
const prod = !dev;

esbuild
  .build({
    entryPoints: readdirSync('./src')
      .filter(s => s.endsWith('.js'))
      .map(s => join('./src', s)),
    outdir: 'public/build',
    bundle: true,
    format: 'esm',
    chunkNames: '[name]',
    splitting: true,
    loader: esbuild_default_loaders,
    minify: !dev,
    watch: dev,
    plugins: [postcssPlugin(), sveltePlugin(require('./svelte.config'))],
  })
  .then(() => dev && startServeHttp());
