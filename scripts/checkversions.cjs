"use strict";

const checkversion = require("check-node-version");
const { default: invariant } = require("tiny-invariant");
const pkg = require("../package.json");
const { isString } = require("lodash");
const os = require("os");

function assertValidEngines(engines) {
  invariant(
    typeof engines === "object" && engines,
    `expected package.json to include 'engines' object`
  );

  invariant(
    isString(engines.node) && isString(engines.npm),
    `expected package.json to include 'engines: { node: string, npm: string }',` +
      `got '${engines ? JSON.stringify(engines) : engines}' instead`
  );
}

function checkVersions() {
  assertValidEngines(pkg.engines);

  checkversion(pkg.engines, (err, results) => {
    if (err) {
      throw err;
    }

    if (!results.isSatisfied) {
      let errorMessage = ["checkversion invariant error:"];

      if (!results.versions.node.isSatisfied) {
        errorMessage.push(
          `  - node: ${results.versions.node.version}, wanted: ${results.versions.node.wanted}`
        );
      }

      if (!results.versions.npm.isSatisfied) {
        errorMessage.push(
          `  - npm: ${results.versions.npm.version}, wanted: ${results.versions.npm.wanted}`
        );
      }

      console.error(errorMessage.join(os.EOL));
      process.exitCode = 1;
    }
  });
}

module.exports = checkVersions;

if (require.main === module) {
  checkVersions();
}
