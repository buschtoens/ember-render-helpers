import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import { hbs } from 'ember-cli-htmlbars';

import type { TestContext } from 'dummy/tests/helpers/test-context';

module('Integration | Helper | will-destroy-helper', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders and calls the callback', async function (this: TestContext, assert) {
    this.callback = () => {
      assert.step('callback called');
    };
    this.isHidden = false;

    await render(hbs`
      {{~#unless this.isHidden~}}
        {{~will-destroy-helper this.callback this.pos1~}}
      {{~/unless~}}
    `);

    assert.strictEqual(
      this.element.textContent,
      '',
      'It does not produce any DOM nodes.'
    );

    assert.verifySteps(
      [],
      'It does not call the callback before value changes'
    );

    this.set('isHidden', true);

    assert.verifySteps(['callback called'], 'It calls the callback.');
  });
});
