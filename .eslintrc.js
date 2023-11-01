module.exports = {
  env: {
    browser: true,
  },
  settings: { react: { version: 'detect' } },
  extends: ['plugin:react/recommended', 'prettier', 'plugin:jest-dom/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: [
    'eslint-plugin-jsdoc',
    'eslint-plugin-react',
    'eslint-plugin-import',
    '@typescript-eslint',
    'testing-library',
    'jest-dom',
    'react-hooks',
  ],
  overrides: [
    {
      // enable eslint-plugin-testing-library rules or preset only for matching files
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
      rules: {
        'testing-library/await-async-query': 'off',
      },
    },
  ],
  rules: {
    'no-restricted-imports': [
      'warn',
      {
        patterns: ['src/**'],
        paths: [
          {
            name: 'react',
            importNames: ['default'],
            message: 'Use named imports instead',
          },
          {
            name: 'lodash',
            message: 'Import [module] from lodash/[module] instead',
          },
        ],
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'off',
      {
        multiline: {
          delimiter: 'none',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'function',
        // Allow PascalCase for React components
        format: ['camelCase', 'PascalCase'],
      },
    ],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-shadow': [
      'warn',
      {
        hoist: 'all',
      },
    ],
    '@typescript-eslint/no-unused-expressions': [
      'warn',
      {
        allowShortCircuit: true,
      },
    ],
    '@typescript-eslint/no-use-before-define': [
      'warn',
      { functions: false, classes: false, ignoreTypeReferences: true },
    ],
    '@typescript-eslint/quotes': ['warn', 'single', { avoidEscape: true }],
    '@typescript-eslint/semi': ['off', null],
    '@typescript-eslint/type-annotation-spacing': 'warn',
    'arrow-parens': ['off', 'always'],
    'brace-style': ['warn', '1tbs'],
    'comma-dangle': [
      'warn',
      {
        objects: 'always-multiline',
        arrays: 'always-multiline',
        imports: 'always-multiline',
        functions: 'never',
      },
    ],
    curly: ['warn', 'multi-line'],
    'default-case': 'warn',
    'dot-notation': 'warn',
    'eol-last': 'warn',
    eqeqeq: ['warn', 'smart'],
    'guard-for-in': 'warn',
    'id-blacklist': ['warn', 'any', 'Number', 'String', 'string', 'Boolean', 'boolean', 'Undefined', 'undefined'],
    'id-match': 'warn',
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    indent: 'off',
    'jsdoc/check-alignment': 'warn',
    'jsdoc/check-indentation': 'off',
    'jsdoc/newline-after-description': 'warn',
    'jsx-quotes': ['warn', 'prefer-double'],
    'linebreak-style': 'off',
    'max-len': [
      'warn',
      {
        code: 120,
        ignoreStrings: true,
      },
    ],
    'new-parens': 'off',
    'newline-per-chained-call': 'off',
    'no-bitwise': 'warn',
    'no-caller': 'warn',
    'no-console': [
      'warn',
      {
        allow: [
          'warn',
          'dir',
          'timeLog',
          'assert',
          'clear',
          'count',
          'countReset',
          'group',
          'groupEnd',
          'table',
          'dirxml',
          'error',
          'groupCollapsed',
          'Console',
          'profile',
          'profileEnd',
          'timeStamp',
          'context',
        ],
      },
    ],
    'no-debugger': 'warn',
    'no-empty': 'warn',
    'no-eval': 'warn',
    'no-extra-semi': 'off',
    'no-fallthrough': 'off',
    'no-irregular-whitespace': 'off',
    'no-multiple-empty-lines': 'warn',
    'no-new-wrappers': 'warn',
    'no-redeclare': 'warn',
    'no-trailing-spaces': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-labels': 'warn',
    'no-use-before-define': 'off',
    'padded-blocks': [
      'off',
      {
        blocks: 'never',
      },
      {
        allowSingleLineBlocks: true,
      },
    ],
    'quote-props': 'off',
    quotes: 'off',
    radix: 'warn',
    'react/no-unescaped-entities': 'off',
    'react/jsx-boolean-value': 'off',
    'react/jsx-curly-spacing': 'off',
    'react/jsx-curly-brace-presence': ['warn', { props: 'never' }],
    'react/jsx-equals-spacing': 'off',
    'react/jsx-key': 'warn',
    'react/jsx-no-bind': 'off',
    'react/jsx-tag-spacing': [
      'off',
      {
        afterOpening: 'allow',
        closingSlash: 'allow',
      },
    ],
    'react/display-name': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/prop-types': 'off',
    'react/self-closing-comp': 'warn',
    semi: 'off',
    'sort-imports': ['warn', { ignoreDeclarationSort: true }],
    'space-before-function-paren': 'off',
    'space-in-parens': ['off', 'never'],
    'spaced-comment': [
      'warn',
      'always',
      {
        markers: ['/'],
      },
    ],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
  },
}
