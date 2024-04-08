'use strict';

const getChannelURL = require('ember-source-channel-url');
const { embroiderOptimized, embroiderSafe } = require('@embroider/test-setup');

module.exports = async function () {
  return {
    usePnpm: true,
    scenarios: [
      {
        name: 'ember-lts-3.28',
        npm: {
          devDependencies: {
            '@ember/test-helpers': '2.9.4',
            '@types/ember__test-helpers': '2.9.1',
            '@types/ember-qunit': '6.1.1',
            'ember-cli': '~4.12.0',
            'ember-qunit': '6.0.0',
            'ember-source': '~3.28.11',
          },
        },
      },
      {
        name: 'ember-lts-4.4',
        npm: {
          devDependencies: {
            '@ember/test-helpers': '2.9.4',
            '@types/ember__test-helpers': '2.9.1',
            '@types/ember-qunit': '6.1.1',
            'ember-cli': '~4.12.0',
            'ember-qunit': '6.0.0',
            'ember-source': '~4.4.0',
          },
        },
      },
      {
        name: 'ember-lts-4.8',
        npm: {
          devDependencies: {
            'ember-cli': '~4.12.0',
            'ember-source': '~4.8.0',
          },
        },
      },
      {
        name: 'ember-lts-4.12',
        npm: {
          devDependencies: {
            'ember-cli': '~4.12.0',
            'ember-source': '~4.12.0',
          },
        },
      },
      {
        name: 'ember-lts-5.4',
        npm: {
          devDependencies: {
            'ember-source': '~5.4.0',
          },
        },
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('release'),
          },
        },
      },
      embroiderSafe(),
      embroiderOptimized(),
    ],
  };
};
