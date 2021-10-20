import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import url from 'rollup-plugin-url'
import { DEFAULT_EXTENSIONS as DEFAULT_BABEL_EXTENSIONS } from '@babel/core';
import babel from "@rollup/plugin-babel";

import pkg from './package.json'

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true,
            exports: 'named',
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: true,
            exports: 'named',
        }
    ],
    plugins: [
        external(),
        url({ exclude: ['**/*.svg'] }),
        resolve(),
        typescript({
            rollupCommonJSResolveHack: true,
            clean: true
        }),
        commonjs(),
        babel({
            exclude: "node_modules/**",
            extensions: [...DEFAULT_BABEL_EXTENSIONS, '.ts', '.tsx'],
        })
    ]
}