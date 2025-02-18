import Helper from '@ember/component/helper';
import { assert } from '@ember/debug';

import type {
  CallbackFunction,
  NamedParameters,
  PositionalParameters,
} from '../types.ts';

interface DidUpdateHelperSignature {
  Args: {
    Named: NamedParameters;
    Positional: [CallbackFunction, ...PositionalParameters];
  };
  Return: void;
}

/**
 * This helper is activated only on _updates_ to it's arguments (both positional
 * and named). It does not run during or after initial render, or before it is
 * un-rendered (removed from the DOM).
 */
export default class DidUpdateHelperHelper extends Helper<DidUpdateHelperSignature> {
  didRun = false;

  compute(
    positional: DidUpdateHelperSignature['Args']['Positional'],
    named: DidUpdateHelperSignature['Args']['Named'],
  ): void {
    const [callback, ...positionalParameters] = positional;

    assert(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `\`{{did-update-helper}}\` expects a callback function as the first parameter. You provided: ${callback}`,
      typeof callback === 'function',
    );

    if (!this.didRun) {
      this.didRun = true;

      // Consume individual properties to entangle tracking.
      // https://github.com/emberjs/ember.js/issues/19277
      positional.forEach(() => {});
      Object.values(named);

      return;
    }

    callback(positionalParameters, named);
  }
}
