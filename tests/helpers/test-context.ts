import { HelperCallback } from 'ember-render-helpers/types';
import { TestContext as BaseTestContext } from 'ember-test-helpers';

export interface TestContext extends BaseTestContext {
  callback: HelperCallback;
  isHidden?: boolean;
  pos1?: string;
  pos2?: string;
  named1?: string;
  named2?: string;
}
