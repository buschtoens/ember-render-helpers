import Helper from '@ember/component/helper';
import { assert } from '@ember/debug';
import type {
  CallbackFunction,
  NamedParameters,
  PositionalParameters,
} from 'ember-render-helpers/types';

interface DidInsertSignature {
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
export default class DidInsertHelper extends Helper<DidInsertSignature> {
  didRun = false;

  compute(
    positional: DidInsertSignature['Args']['Positional'],
    named: DidInsertSignature['Args']['Named'],
  ): void {
    const [callback, ...positionalParameters] = positional;

    assert(
      `\`{{did-insert}}\` expects a callback function as the first parameter. You provided: ${callback}`,
      typeof callback === 'function',
    );

    if (this.didRun) {
      return;
    }

    this.didRun = true;

    callback(positionalParameters, named);
  }
}
