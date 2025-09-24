module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'prettier'
  ],
  plugins: [
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off', // Allow console.log for our scripts
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-process-exit': 'off', // Allow process.exit in our scripts
    'no-undef': 'error',
    'no-unused-expressions': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'eqeqeq': 'error',
    'curly': 'error',
  },
  globals: {
    process: 'readonly',
  },
};