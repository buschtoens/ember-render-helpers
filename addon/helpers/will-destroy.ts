import Helper from '@ember/component/helper';
import { assert } from '@ember/debug';

import {
  PositionalParameters,
  NamedParameters,
  HelperCallback
} from 'ember-render-helpers/types';

/**
 * This helper is activated immediately before the helper is un-rendered
 * (removed from the DOM). It does not run during or after initial render, or
 * when its arguments are updated.
 */
export default class WillDestroyHelper extends Helper {
  fn?: (positional: PositionalParameters, named: NamedParameters) => void;
  positional?: PositionalParameters;
  named?: NamedParameters;

  compute(positional: PositionalParameters, named: NamedParameters): void {
    const fn = positional[0] as HelperCallback;
    assert(
      `\`{{did-insert fn}}\` expects a function as the first parameter. You provided: ${fn}`,
      typeof fn === 'function'
    );
    this.fn = fn;
    this.positional = positional.slice(1);
    this.named = named;
  }

  willDestroy() {
    if (this.fn && this.positional && this.named) {
      const { fn } = this;
      fn(this.positional, this.named);
    }
    super.willDestroy();
  }
}
