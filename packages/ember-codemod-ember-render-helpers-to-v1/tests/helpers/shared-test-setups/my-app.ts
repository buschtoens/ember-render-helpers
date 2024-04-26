import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  projectRoot: 'tmp/my-app',
  projectType: 'app',
};

const options: Options = {
  projectRoot: 'tmp/my-app',
  src: ['app/{components,templates}/**/*.hbs'],
};

export { codemodOptions, options };
