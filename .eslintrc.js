module.exports = {
  plugins: ["@typescript-eslint", "prettier"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  env: {
    node: true,
    jest: true,
    es6: true,
  },
  rules: {
    "prettier/prettier": 1,
  },
  "overrides": [
    {
      "files": ["*.js", "*.cjs"],
      "rules": {
        "@typescript-eslint/no-var-requires": 0
      }
    }
]
};
