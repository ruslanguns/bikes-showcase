const webpack = require("webpack");
const WebpackConfigFactory = require("@nestjs/ng-universal")
  .WebpackConfigFactory;
const nodeExternals = require("webpack-node-externals");
const ContextMapPlugin = require('context-map-webpack-plugin');

const webpackOptions = WebpackConfigFactory.create(webpack, {
  // This is our Nest server for Dynamic universal
  server: "./server/main.ts"
});

const whitelistedPackages = /^(?!(livereload|concurrently|mongoose|sharp|fastify-swagger|handlebars|UglifyJS)).*/;
webpackOptions.externals[1] = nodeExternals({
  whitelist: whitelistedPackages
});

webpackOptions.plugins.push(
  //https://github.com/bastidest/context-map-webpack-plugin
  new ContextMapPlugin('node_modules/uglify-js/tools', [
    '../lib/utils.js',
    '../lib/ast.js',
    '../lib/parse.js',
    '../lib/transform.js',
    '../lib/scope.js',
    '../lib/output.js',
    '../lib/compress.js',
    '../lib/sourcemap.js',
    '../lib/mozilla-ast.js',
    '../lib/propmangle.js',
    './exports.js',
  ]),
  new webpack.IgnorePlugin({
    checkResource(resource) {
      const lazyImports = [
        "@nestjs/swagger",
        "@nest-modules/mailer",
        "@nestjs/microservices",
        "@nestjs/microservices/microservices-module",
        "@nestjs/websockets/socket-module",
        "cache-manager",
        "class-validator",
        "class-transformer",
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
