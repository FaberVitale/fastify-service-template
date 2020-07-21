module.exports = {
  "src/**/*.{ts,tsx}": [
    // https://github.com/okonet/lint-staged#example-run-tsc-on-changes-to-typescript-files-but-do-not-pass-any-filename-arguments
    () => "npm run lint:ts",
  ],
  "src/**/*.{js,jsx,ts,tsx,cjs,mjs}": ["npm run lint:eslint:fix --"],
  "src/**/*.json": ["npm run prettify --"],
};
