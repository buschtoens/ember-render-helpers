import type { CodemodOptions, Options } from '../types/index.js';

function getSrc(projectType: CodemodOptions['projectType']): string[] {
  switch (projectType) {
    case 'app': {
      return ['app/{components,templates}/**/*.hbs'];
    }

    case 'v1-addon': {
      return ['addon/{components,templates}/**/*.hbs'];
    }
  }
}

export function createOptions(codemodOptions: CodemodOptions): Options {
  const { projectRoot, projectType } = codemodOptions;

  return {
    projectRoot,
    src: getSrc(projectType),
  };
}
