import type { CodemodOptions, Options } from '../types/index.js';

const source = {
  app: ['app/{components,templates}/**/*.hbs'],
  'v1-addon': ['addon/{components,templates}/**/*.hbs'],
};

export function createOptions(codemodOptions: CodemodOptions): Options {
  const { projectRoot, projectType } = codemodOptions;

  const src = source[projectType];

  return {
    projectRoot,
    src,
  };
}
