import type DidInsertHelper from './helpers/did-insert';
import type DidUpdateHelper from './helpers/did-update';
import type WillDestroyHelper from './helpers/will-destroy';

export default interface EmberRenderHelpersRegistry {
  'did-insert': typeof DidInsertHelper;
  'did-update': typeof DidUpdateHelper;
  'will-destroy': typeof WillDestroyHelper;
}
