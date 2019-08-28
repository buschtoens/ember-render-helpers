import Helper from '@ember/component/helper';
import { assert } from '@ember/debug';

import {
  PositionalParameters,
  NamedParameters,
  HelperCallback
} from 'ember-render-helpers/types';

/**
 * This helper is activated only when it is rendered for the first time
 * (inserted in the DOM). It does not run during or after it is un-rendered
 * (removed from the DOM), or when its arguments are updated.
 */
export default class DidInsertHelper extends Helper {
  didRun = false;

  compute(positional: PositionalParameters, named: NamedParameters): void {
    const fn = positional[0] as HelperCallback;
    assert(
      `\`{{did-insert fn}}\` expects a function as the first parameter. You provided: ${fn}`,
      typeof fn === 'function'
    );
    if (this.didRun) return;
    this.didRun = true;
    fn(positional.slice(1), named);
  }
}
