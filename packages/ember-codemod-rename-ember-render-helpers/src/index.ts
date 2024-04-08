import { migrateEmberApp, migrateEmberV1Addon } from './migration/index.js';
import type { CodemodOptions } from './types/index.js';

export function runCodemod(codemodOptions: CodemodOptions): void {
  switch (codemodOptions.projectType) {
    case 'app': {
      migrateEmberApp(codemodOptions);
      break;
    }

    case 'v1-addon': {
      migrateEmberV1Addon(codemodOptions);
      break;
    }
  }
}
