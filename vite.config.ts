import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'unplugin-dts/vite';
import { resolve } from 'node:path';
import postcssNesting from 'postcss-nesting';

export default defineConfig({
    plugins: [
        react(),
        dts({
            // Vite テンプレの app 用 tsconfig を参照
            tsconfigPath: './tsconfig.app.json',
            // tsconfig 側の noEmit を打ち消す ＋ d.ts だけ吐く
            compilerOptions: {
                declaration: true,
                emitDeclarationOnly: true,
                noEmit: false,
            },
            // dist/index.d.ts をエントリとして作ってくれる
            insertTypesEntry: true,
        }),
    ],
    css: {
        postcss: {
            plugins: [postcssNesting],
        },
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'TzieReact',
            formats: ['es', 'cjs'],
            fileName: (format) => (format === 'es' ? 'index.mjs' : 'index.cjs'),
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
        sourcemap: true,
    },
});
