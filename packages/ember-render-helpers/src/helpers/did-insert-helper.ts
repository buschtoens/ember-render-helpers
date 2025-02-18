import Helper from '@ember/component/helper';
import { assert } from '@ember/debug';

import type {
  CallbackFunction,
  NamedParameters,
  PositionalParameters,
} from '../types.ts';

interface DidInsertHelperSignature {
  Args: {
    Named: NamedParameters;
    Positional: [CallbackFunction, ...PositionalParameters];
  };
  Return: void;
}

/**
 * This helper is activated only when it is rendered for the first time
 * (inserted in the DOM). It does not run during or after it is un-rendered
 * (removed from the DOM), or when its arguments are updated.
 */
export default class DidInsertHelperHelper extends Helper<DidInsertHelperSignature> {
  didRun = false;

  compute(
    positional: DidInsertHelperSignature['Args']['Positional'],
    named: DidInsertHelperSignature['Args']['Named'],
  ): void {
    const [callback, ...positionalParameters] = positional;

    assert(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `\`{{did-insert-helper}}\` expects a callback function as the first parameter. You provided: ${callback}`,
      typeof callback === 'function',
    );

    if (this.didRun) {
      return;
    }

    this.didRun = true;

    callback(positionalParameters, named);
  }
}
