import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import copy from 'rollup-plugin-copy';

const filesizeConfig = {
    showGzippedSize: true,
    showBrotliSize: false,
    showMinifiedSize: false,
};

const copyConfig = {
    targets: [
        { src: 'node_modules/@webcomponents', dest: 'build-modern/node_modules' },
        { src: 'images', dest: 'build-modern' },
        { src: 'data', dest: 'build-modern' },
        { src: 'index.html', dest: 'build-modern', rename: 'index.html' },
    ],
};

// The main JavaScript bundle for modern browsers that support
// JavaScript modules and other ES2015+ features.
const config = {
    input: 'src/components/shop-app.js',
    output: {
        dir: 'build-modern/src/components',
        format: 'es',
    },
    plugins: [
        minifyHTML(),
        copy(copyConfig),
        resolve(),
        filesize(filesizeConfig)
    ],
    preserveEntrySignatures: false,
};

if (process.env.NODE_ENV !== 'development') {
    config.plugins.push(terser());
}

export default config;