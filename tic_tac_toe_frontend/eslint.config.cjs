const globals = require('globals')
const js = require('@eslint/js')

const { FlatCompat } = require('@eslint/eslintrc')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

module.exports = [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  ...compat.extends('eslint:recommended'),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      ecmaVersion: 2020,
      sourceType: 'module',

      parserOptions: {
        parser: 'babel-eslint',
      },
    },

    rules: {
      // Disable console and debugger checks (not syntax errors)
      'no-console': 'off',
      'no-debugger': 'off',
      
      // Turn off all formatting rules
      'quotes': 'off',
      'semi': 'off',
      'no-extra-boolean-cast': 'off',

      // Keep only actual code quality issues
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: 'res|next|^err',
        },
      ],
    },
  },
]
