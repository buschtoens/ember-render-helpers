import { deprecate } from '@ember/debug';

import DidUpdateHelper from './did-update-helper';

export default class DeprecatedDidUpdateHelper extends DidUpdateHelper {
  /* eslint-disable-next-line @typescript-eslint/ban-types */
  constructor(properties?: object) {
    super(properties);

    deprecate(
      'The {{did-update}} helper has been renamed to {{did-update-helper}}.',
      false,
      {
        id: 'new-helper-names',
        until: '1.0.0',
        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        // @ts-ignore: Outdated types do not know the for property yet but cannot be upgraded.
        for: 'ember-render-helpers',
        since: {
          available: '0.2.1',
          enabled: '0.2.1'
        }
      }
    );
  }
}
