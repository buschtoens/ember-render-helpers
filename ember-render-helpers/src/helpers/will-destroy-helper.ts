import Helper from '@ember/component/helper';
import { assert } from '@ember/debug';

import type {
  CallbackFunction,
  NamedParameters,
  PositionalParameters,
} from '../types.ts';

interface WillDestroyHelperSignature {
  Args: {
    Named: NamedParameters;
    Positional: [CallbackFunction, ...PositionalParameters];
  };
  Return: void;
}

/**
 * This helper is activated immediately before the helper is un-rendered
 * (removed from the DOM). It does not run during or after initial render, or
 * when its arguments are updated.
 */
export default class WillDestroyHelperHelper extends Helper<WillDestroyHelperSignature> {
  callback?: CallbackFunction;
  named?: NamedParameters;
  positional?: PositionalParameters;

  compute(
    positional: WillDestroyHelperSignature['Args']['Positional'],
    named: WillDestroyHelperSignature['Args']['Named'],
  ): void {
    const [callback, ...positionalParameters] = positional;

    assert(
      `\`{{will-destroy-helper}}\` expects a function as the first parameter. You provided: ${callback}`,
      typeof callback === 'function',
    );

    this.callback = callback;
    this.named = named;
    this.positional = positionalParameters;
  }

  willDestroy() {
    if (this.callback && this.positional && this.named) {
      this.callback(this.positional, this.named);
    }

    super.willDestroy();
  }
}
