import type DidInsertHelperHelper from './helpers/did-insert-helper';
import type DidUpdateHelperHelper from './helpers/did-update-helper';
import type WillDestroyHelperHelper from './helpers/will-destroy-helper';

export default interface EmberRenderHelpersRegistry {
  'did-insert-helper': typeof DidInsertHelperHelper;
  'did-update-helper': typeof DidUpdateHelperHelper;
  'will-destroy-helper': typeof WillDestroyHelperHelper;
}
