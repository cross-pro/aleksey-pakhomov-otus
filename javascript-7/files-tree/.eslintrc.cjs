module.exports = {
  env: {
    browser: true,
    es2021: true,
    "node": true
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    "ecmaVersion": 8,
     "sourceType": "module",
     "requireConfigFile": false
  },
  rules: {
  "semi": 2
  },
  "parser": "@babel/eslint-parser",
    "extends": [
      "eslint:recommended"
    ]
};
