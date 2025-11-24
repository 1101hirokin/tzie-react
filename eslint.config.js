// eslint.config.js
// @ts-check

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
    // 0. 無視するディレクトリ
    globalIgnores(['dist', 'coverage', 'node_modules']),

    // 1. フロントエンド（ブラウザ側）コード: src 配下の TS/TSX
    {
        files: ['src/**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
            eslintConfigPrettier, // ← Prettier と競合するルールを全部 OFF
        ],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            globals: globals.browser,
        },
        rules: {
            // _ プレフィックスの未使用変数は許容
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                },
            ],
            // any はとりあえず warn（好みに応じて 'off' / 'error' に変えてOK）
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },

    // 2. Node 向けファイル（設定・スクリプト etc.）
    {
        files: [
            'vite.config.*',
            'eslint.config.*',
            'scripts/**/*.{js,ts}',
            '**/*.config.{js,cjs,mjs,ts,cts,mts}',
        ],
        extends: [js.configs.recommended, tseslint.configs.recommended, eslintConfigPrettier],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            globals: globals.node,
        },
    },
]);
