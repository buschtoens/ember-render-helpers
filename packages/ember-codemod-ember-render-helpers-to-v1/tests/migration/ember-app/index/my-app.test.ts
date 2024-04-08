import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { migrateEmberApp } from '../../../../src/migration/ember-app/index.js';
import { inputProject, outputProject } from '../../../fixtures/my-app/index.js';
import { codemodOptions } from '../../../helpers/shared-test-setups/my-app.js';

test('migration | ember-app | index > my-app', function () {
  loadFixture(inputProject, codemodOptions);

  migrateEmberApp(codemodOptions);

  assertFixture(outputProject, codemodOptions);

  // Check idempotence
  migrateEmberApp(codemodOptions);

  assertFixture(outputProject, codemodOptions);
});
