const version = require("./package.json").version;

module.exports = {
  files: "./dist/*.js",
  from: [/#__VERSION__#/g, /\/\*\*\s\@class\s\*\//g],
  to: [version, "/*#__PURE__*/"],
};