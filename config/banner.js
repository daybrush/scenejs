const pkg = require("../package.json");
module.exports = `/*
Copyright (c) 2018 ${pkg.author}
@name: ${pkg.name}
license: ${pkg.license}
author: ${pkg.author}
repository: ${pkg.repository.url}
@version ${pkg.version}
*/`;