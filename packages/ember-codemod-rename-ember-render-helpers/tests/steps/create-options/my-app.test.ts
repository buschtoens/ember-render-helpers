import { assert, test } from '@codemod-utils/tests';

import { createOptions } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-app.js';

test('steps | create-options > my-app', function () {
  assert.deepStrictEqual(createOptions(codemodOptions), options);
});
