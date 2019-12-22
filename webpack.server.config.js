const webpack = require("webpack");
const WebpackConfigFactory = require("@nestjs/ng-universal")
  .WebpackConfigFactory;

const nodeExternals = require("webpack-node-externals");

const webpackOptions = WebpackConfigFactory.create(webpack, {
  // This is our Nest server for Dynamic universal
  server: "./server/main.ts"
});

const whitelistedPackages = /^(?!(livereload|concurrently|mongoose|sharp|fastify-swagger)).*/;
webpackOptions.externals[1] = nodeExternals({
  whitelist: whitelistedPackages
});

webpackOptions.plugins.push(
  new webpack.IgnorePlugin({
    checkResource(resource) {
      const lazyImports = [
        "@nestjs/swagger",
        "@nestjs/microservices",
        "@nestjs/microservices/microservices-module",
        "@nestjs/websockets/socket-module",
        "cache-manager",
        "class-validator",
        "class-transformer"
      ];
      if (!lazyImports.includes(resource)) {
        return false;
      }
      try {
        require.resolve(resource);
      } catch (err) {
        return true;
      }
      return false;
    }
  })
);

module.exports = webpackOptions;
