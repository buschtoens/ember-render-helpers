import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';
import 'ember-source/types';
import 'ember-source/types/preview';

import type EmberRenderHelpersRegistry from 'ember-render-helpers/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends EmberRenderHelpersRegistry {
    // Add any registry entries from other addons here that your addon itself uses (in non-strict mode templates)
    // See https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons
  }
}
