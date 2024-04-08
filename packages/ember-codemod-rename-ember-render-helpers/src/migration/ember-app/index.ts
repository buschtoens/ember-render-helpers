import type { CodemodOptions } from '../../types/index.js';
import { createOptions } from '../../utils/steps/create-options.js';
import { updateTemplates } from './steps/index.js';

export function migrateEmberApp(codemodOptions: CodemodOptions): void {
  const options = createOptions(codemodOptions);

  updateTemplates(options);
}
