import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import { hbs } from 'ember-cli-htmlbars';

import type { TestContext } from 'dummy/tests/helpers/test-context';

module('Integration | Helper | did-insert-helper', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders and calls the callback', async function (this: TestContext, assert) {
    this.callback = () => {
      assert.step('callback called');
    };

    await render(hbs`{{did-insert-helper this.callback}}`);

    assert.strictEqual(
      this.element.textContent,
      '',
      'It does not produce any DOM nodes.'
    );

    assert.verifySteps(['callback called'], 'It calls the callback.');
  });
});
