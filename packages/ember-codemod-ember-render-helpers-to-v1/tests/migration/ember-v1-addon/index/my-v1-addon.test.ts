import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { migrateEmberV1Addon } from '../../../../src/migration/ember-v1-addon/index.js';
import {
  inputProject,
  outputProject,
} from '../../../fixtures/my-v1-addon/index.js';
import { codemodOptions } from '../../../helpers/shared-test-setups/my-v1-addon.js';

test('migration | ember-app | index > my-v1-addon', function () {
  loadFixture(inputProject, codemodOptions);

  migrateEmberV1Addon(codemodOptions);

  assertFixture(outputProject, codemodOptions);

  // Check idempotence
  migrateEmberV1Addon(codemodOptions);

  assertFixture(outputProject, codemodOptions);
});
