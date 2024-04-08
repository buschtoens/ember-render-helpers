import type DidInsertHelperHelper from './helpers/did-insert-helper.ts';
import type DidUpdateHelperHelper from './helpers/did-update-helper.ts';
import type WillDestroyHelperHelper from './helpers/will-destroy-helper.ts';

export default interface EmberRenderHelpersRegistry {
  'did-insert-helper': typeof DidInsertHelperHelper;
  'did-update-helper': typeof DidUpdateHelperHelper;
  'will-destroy-helper': typeof WillDestroyHelperHelper;
}
