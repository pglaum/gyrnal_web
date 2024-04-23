// required packages
// - eslint
// - eslint-import-resolver-typescript
// - eslint-plugin-import
// - eslint-plugin-simple-import-sort
// - eslint-plugin-no-relative-import-paths
// - eslint-plugin-tailwindcss
// - eslint-plugin-unused-imports
// - eslint-plugin-vue
// - @kalimahapps/eslint-plugin-tailwind
// - @nuxt/eslint-config
// - @stylistic/eslint-plugin
// - @typescript-eslint/parser

module.exports = {
    root: true,
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    plugins: [
        '@kalimahapps/eslint-plugin-tailwind',
        '@stylistic',
        'no-relative-import-paths',
        'simple-import-sort',
        'unused-imports',
    ],
    extends: [
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:tailwindcss/recommended',
        'plugin:vue/vue3-recommended',
        "@nuxt/eslint-config",
    ],
    settings: {
        'import/resolver': {
            typescript: true,
            node: true,
        },
    },
    rules: {
        // standard typescript rules
        'array-bracket-spacing': [
            'error',
            'always',
        ],
        'arrow-parens': [
            'error',
            'always',
        ],
        'arrow-spacing': [
            'error',
            {
                before: true,
                after: true,
            },
        ],
        'block-spacing': [
            'error',
            'always',
        ],
        'brace-style': [
            'error',
            '1tbs',
        ],
        'comma-dangle': [
            'error',
            {
                'arrays': 'always',
                'objects': 'always',
                'imports': 'always',
                'exports': 'always',
                'functions': 'never',
            },
        ],
        'comma-spacing': [ 'error', ],
        'computed-property-spacing': [ 'error', ],
        'dot-location': [
            'error',
            'property',
        ],
        'max-statements-per-line': [ 'error', ],
        'no-trailing-spaces': [ 'error', ],
        'no-unused-vars': [ 'off', ],
        '@typescript-eslint/no-unused-vars': [ 'off', ],
        'object-curly-spacing': [
            'error',
            'always',
        ],
        'object-property-newline': [ 'error', ],
        'semi': [
            'error',
            'never',
        ],
        'space-before-function-paren': [
            'error',
            'always',
        ],

        // vue stuff
        'vue/component-name-in-template-casing': [
            'error',
            'PascalCase',
        ],
        'vue/html-indent': [
            'error',
            4,
            { ignores: [ 'noscript', ], },
        ],
        'vue/multi-word-component-names': 'off',
        'vue/script-indent': [
            'error',
            4,
            { switchCase: 1, },
        ],
        'vue/no-v-html': 'off',
        'vue/require-default-prop': 'off',

        // import stuff
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'no-relative-import-paths/no-relative-import-paths': [
            'error',
            { prefix: '@', },
        ],
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
            'error',
            {
                vars: 'all',
                varsIgnorePattern: '^_',
                args: 'after-used',
                argsIgnorePattern: '^_',
            },
        ],

        // tailwind stuff
        'tailwindcss/no-custom-classname': [
            'error',
            {
                config: './tailwind.config.js',
                whitelist: [
                    'drag(.*_?)',
                    'calendar',
                ],
            },
        ],
        '@kalimahapps/tailwind/multiline': [
            'error',
            {
                maxLen: 120,
                quoteOnNewLine: true,
            },
        ],
    },
}
