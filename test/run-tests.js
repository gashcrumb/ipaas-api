#!/usr/bin/env node
const process = require('process');
const fs = require('fs');
const content = fs.readFileSync(__dirname + '/../node_modules/nodeunit/bin/nodeunit.json');
const options = JSON.parse(content);
options.recursive = true;
var reporter = undefined;
if (process.env.CIRCLE_TEST_REPORTS) {
  console.log("Using junit reporter");
  reporter = require('nodeunit').reporters.junit;
  options.output = process.env.CIRCLE_TEST_REPORTS + '/junit';
} else {
  console.log("Using console reporter");
  reporter = require('nodeunit').reporters.default;
}
console.log("Options: ", options);
reporter.run(['test'], options);

