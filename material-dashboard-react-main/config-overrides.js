module.exports = function override(config, env) {
  // source-map-loader 경고 무시 설정
  config.ignoreWarnings = [
    function ignoreSourcemapsloaderWarnings(warning) {
      return (
        warning.module &&
        warning.module.resource.includes("node_modules") &&
        warning.details &&
        warning.details.includes("source-map-loader")
      );
    },
  ];

  // 또는 source-map-loader 완전히 비활성화
  config.module.rules.forEach((rule) => {
    if (rule.oneOf) {
      rule.oneOf.forEach((oneOfRule) => {
        if (
          oneOfRule.loader &&
          oneOfRule.loader.includes("source-map-loader")
        ) {
          oneOfRule.exclude = [/node_modules/];
        }
      });
    }
  });

  return config;
};

