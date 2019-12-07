const { LiveReloadCompiler } = require('@nestjs/ng-universal');

const compiler = new LiveReloadCompiler({
  projectName: 'bikes-showcase'
});
compiler.run();
