module.exports = {
  env: {
    node: true,
    es2022: true,
    jest: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "commonjs",
  },
  rules: {
    "no-unused-vars": "error",
    "no-undef": "error",
    semi: ["error", "always"],
    quotes: ["error", "single"],
    indent: ["error", 2],
    "no-trailing-spaces": "error",
    "eol-last": "error",
    "no-multiple-empty-lines": ["error", { max: 1 }],
  },
};
