import { deprecate } from '@ember/debug';

import WillDestroyHelper from './will-destroy-helper';

export default class DeprecatedWillDestroyHelper extends WillDestroyHelper {
  /* eslint-disable-next-line @typescript-eslint/ban-types */
  constructor(properties?: object) {
    super(properties);

    deprecate(
      'The {{will-destroy}} helper has been renamed to {{will-destroy-helper}}.',
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
