module.exports = {

  env: {
    browser: true,
    es2021: true,
  },
  extends: "airbnb-base",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    semi: ["error", "never"],

  },
  rules: {
    semi: ["error", "never"],
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "import/prefer-default-export": "off",
  },
  "import/extensions": [
    "error",
    "ignorePackages",
    {
      "js": "never",
      "jsx": "never",
      "ts": "never",
      "tsx": "never"
    }
 ]
}
