import { assert, test } from '@codemod-utils/tests';

import { createOptions } from '../../../../src/utils/steps/create-options.js';
import {
  codemodOptions,
  options,
} from '../../../helpers/shared-test-setups/my-app.js';

test('utils | steps | create-options > my-app', function () {
  assert.deepStrictEqual(createOptions(codemodOptions), options);
});
