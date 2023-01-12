module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaVersion: 2020
  },
  rules: {
    'no-console': 'off',
    'no-underscore-dangle': [2, { "allow": ["__filename", "__dirname"] }],
    'import/extensions': [0, {  "<js>": "always"  }]
  },
};
