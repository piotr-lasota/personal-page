module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  rules: {
    'react/function-component-definition': 'off',
    '@typescript-eslint/explicit-module-boundary-types': ['error'],
    '@typescript-eslint/no-empty-function': [
      'error',
      {
        allow: ['arrowFunctions']
      }
    ],
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-use-before-define': ['error'],
    eqeqeq: ['error', 'always'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    'no-param-reassign': [
      'error',
      {
        ignorePropertyModificationsFor: ['state'],
        props: true
      }
    ],
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    'prettier/prettier': 'error',
    quotes: [
      2,
      'single',
      {
        avoidEscape: true
      }
    ],
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-filename-extension': 'off'
  },
  overrides: [
    {
      files: ['*.stories.tsx'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'react/jsx-props-no-spreading': 'off'
      }
    }
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
};
