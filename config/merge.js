module.exports = function merge(config1, config2, options = {}) {
  var config = Object.assign({}, config1);

  for (var key in config2) {
    var type = options[key];

    if (type === "append") {
      var value1 = config1[key];
      var value2 = config2[key];

      if (!value1 || typeof value2 !== "object") {
        config[key] = config2[key];
      } else if (Array.isArray(value2)) {
        config[key] = [].concat(value1, value2);
      } else {
        config[key] = Object.assign({}, value1, value2);
      }
    } else {
      config[key] = config2[key];
    }
  }
  return config;
}