import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { findFiles } from '@codemod-utils/files';

import { Options } from '../../../types/index.js';
import { renameHelpers } from '../../../utils/steps/update-templates/rename-helpers.js';

export function updateTemplates(options: Options): void {
  const { projectRoot, src } = options;

  const filePaths = findFiles(src, {
    projectRoot,
  });

  filePaths.forEach((filePath) => {
    const oldPath = join(projectRoot, filePath);
    const oldFile = readFileSync(oldPath, 'utf8');

    const newFile = renameHelpers(oldFile);

    writeFileSync(oldPath, newFile, 'utf8');
  });
}
