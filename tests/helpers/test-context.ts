import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import type { HelperCallback } from 'ember-render-helpers/types';

export interface TestContext extends BaseTestContext {
  callback: HelperCallback;
  isHidden?: boolean;
  pos1?: string;
  pos2?: string;
  named1?: string;
  named2?: string;
}
