import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
    js.configs.recommended,
    prettierConfig,
    {
        files: ['src/**/*.js'],
        plugins: {
            prettier,
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                window: 'readonly',
                document: 'readonly',
                console: 'readonly',
                setTimeout: 'readonly',
                setInterval: 'readonly',
                Date: 'readonly',
                Math: 'readonly',
                IntersectionObserver: 'readonly',
            },
        },
        rules: {
            'no-console': 'off',
            'no-unused-vars': 'warn',
            'prettier/prettier': 'warn',
        },
    },
    {
        ignores: ['node_modules/**', 'dist/**', 'build/**', 'vite.config.js'],
    },
];

