import { assert, test } from '@codemod-utils/tests';

import { createOptions } from '../../../../src/utils/steps/create-options.js';
import {
  codemodOptions,
  options,
} from '../../../helpers/shared-test-setups/my-v1-addon.js';

test('utils | steps | create-options > my-v1-addon', function () {
  assert.deepStrictEqual(createOptions(codemodOptions), options);
});
