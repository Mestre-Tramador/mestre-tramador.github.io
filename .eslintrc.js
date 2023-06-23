/**
 * This configuration has more React.js style
 * than my own rules.
 *
 * @type {import("@types/eslint").ESLint.ConfigData}
 */
module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
    rules: {
        camelcase: 'error',
        quotes: ['error', 'single'],
        indent: ['error', 4, { SwitchCase: 1 }],
        semi: ['error', 'always'],
        'linebreak-style': ['error', 'unix'],
        'react/react-in-jsx-scope': 'off',
        'spaced-comment': ['error', 'always', { markers: ['/', '#region', '#endregion'] }],
        'no-duplicate-imports': 'error',
        'no-restricted-imports': ['error', { patterns: ['../'] }],
        'prettier/prettier': ['error'],
        'react/self-closing-comp': ['error', { component: true, html: true }],
        'react-hooks/exhaustive-deps': ['error'],
        '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }]
    },
    settings: {
        'import/resolver': {
            typescript: {}
        }
    }
};
