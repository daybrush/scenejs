module.exports = function (config) {
    const karmaConfig = {
      frameworks: ["mocha", "chai", "karma-typescript"],
      mime: {
        'text/x-typescript': ['ts', 'tsx']
      },
      client: {
        mocha: {
          opts: "./mocha.opts",
        },
      },
      files: [
        "./src/**/*.ts",
        "./test/unit/**/*.ts",
      ],
      preprocessors: {
        "src/**/*.ts": ["karma-typescript"],
        "test/unit/**/*.ts": ["karma-typescript"],
      },
      karmaTypescriptConfig: {
        tsconfig: "./tsconfig.test.json",
        reports: {
          html: {
            "directory": "coverage",
            "subdirectory": "./"
          },
          lcovonly: {
            "directory": "coverage",
            "filename": "lcov.info",
            "subdirectory": "."
          },
        },
        coverageOptions: {
          instrumentation: true,
          exclude: /test/i,
        }
      },
      browsers: [],
      customLaunchers: {
        CustomChromeHeadless: {
          base: "ChromeHeadless",
          flags: ["--window-size=400,400", "--no-sandbox", "--disable-setuid-sandbox"],
        },
      },
      reporters: ["mocha"],
    };

    karmaConfig.browsers.push(config.chrome ? "Chrome" : "CustomChromeHeadless");

    if (config.coverage) {
      karmaConfig.reporters.push("karma-typescript");
      karmaConfig.singleRun = true;
    }

    config.set(karmaConfig);
  };
