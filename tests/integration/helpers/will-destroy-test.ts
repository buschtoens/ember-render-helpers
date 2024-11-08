import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import { getProperties, set } from '@ember/object';
import { run } from '@ember/runloop';

import { hbs } from 'ember-cli-htmlbars';
import {
  PositionalParameters,
  NamedParameters
} from 'ember-render-helpers/types';

import type { TestContext } from 'dummy/tests/helpers/test-context';

module('Integration | Helper | will-destroy', function (hooks) {
  setupRenderingTest(hooks);

  const TEMPLATE = hbs`
    {{~#unless this.isHidden~}}
      {{~will-destroy
        this.callback
        this.pos1
        this.pos2
        named1=this.named1
        named2=this.named2
      ~}}
    {{~/unless~}}
  `;

  test('it renders and calls the callback, when un-rendered', async function (this: TestContext, assert) {
    this.callback = () => {
      assert.step('callback called');
    };

    await render(TEMPLATE);

    assert.strictEqual(
      this.element.textContent,
      '',
      'It does not produce any DOM nodes.'
    );

    assert.verifySteps([], 'It does not call the callback.');

    run(() => set(this, 'isHidden', true));

    assert.verifySteps(
      ['callback called'],
      'The callback is called, when the helper is un-rendered.'
    );
  });

  test('it passes positional arguments, when un-rendered', async function (this: TestContext, assert) {
    this.pos1 = 'first positional argument';
    this.pos2 = 'second positional argument';

    this.callback = (positional: PositionalParameters) => {
      assert.step('callback called');
      assert.deepEqual(
        positional,
        [this.pos1, this.pos2],
        'The passed positional arguments match the input.'
      );
    };

    await render(TEMPLATE);

    assert.strictEqual(
      this.element.textContent,
      '',
      'It does not produce any DOM nodes'
    );

    assert.verifySteps([], 'It does not call the callback on first render.');

    run(() => set(this, 'isHidden', true));

    assert.verifySteps(
      ['callback called'],
      'It calls the callback, when un-rendered.'
    );
  });

  test('it passes named arguments, when un-rendered', async function (this: TestContext, assert) {
    this.named1 = 'first named argument';
    this.named2 = 'second named argument';

    this.callback = (
      _positional: PositionalParameters,
      named: NamedParameters
    ) => {
      assert.step('callback called');
      assert.deepEqual(
        named,
        getProperties(this, 'named1', 'named2'),
        'The passed named arguments match the input.'
      );
    };

    await render(TEMPLATE);

    assert.strictEqual(
      this.element.textContent,
      '',
      'It does not produce any DOM nodes'
    );

    assert.verifySteps([], 'It does not call the callback on first render.');

    run(() => set(this, 'isHidden', true));

    assert.verifySteps(
      ['callback called'],
      'It calls the callback, when un-rendered.'
    );
  });

  test('it passes positional and named arguments, when un-rendered', async function (this: TestContext, assert) {
    this.pos1 = 'first positional argument';
    this.pos2 = 'second positional argument';
    this.named1 = 'first named argument';
    this.named2 = 'second named argument';

    this.callback = (
      positional: PositionalParameters,
      named: NamedParameters
    ) => {
      assert.step('callback called');
      assert.deepEqual(
        positional,
        [this.pos1, this.pos2],
        'The passed positional arguments match the input.'
      );
      assert.deepEqual(
        named,
        getProperties(this, 'named1', 'named2'),
        'The passed named arguments match the input.'
      );
    };

    await render(TEMPLATE);

    assert.strictEqual(
      this.element.textContent,
      '',
      'It does not produce any DOM nodes'
    );

    assert.verifySteps([], 'It does not call the callback on first render.');

    run(() => set(this, 'isHidden', true));

    assert.verifySteps(
      ['callback called'],
      'It calls the callback, when un-rendered.'
    );
  });

  test('updating the callback does not cause it to be called', async function (this: TestContext, assert) {
    this.callback = () => {
      assert.step('callback called');
    };

    await render(TEMPLATE);

    assert.strictEqual(
      this.element.textContent,
      '',
      'It does not produce any DOM nodes'
    );

    assert.verifySteps([], 'It does not call the callback.');

    run(() =>
      set(this, 'callback', () => {
        assert.step('new callback called');
      })
    );

    assert.verifySteps([], 'The callback is not called, after the update.');

    run(() => set(this, 'isHidden', true));

    assert.verifySteps(
      ['new callback called'],
      'It calls the callback, when un-rendered.'
    );
  });

  test('re-inserting the helper (`{{if}}`) triggers no callback', async function (this: TestContext, assert) {
    this.isHidden = true;
    this.callback = () => {
      assert.step('callback called');
    };

    await render(TEMPLATE);

    assert.verifySteps(
      [],
      'The callback was not called, because the helper was not yet rendered.'
    );

    run(() => set(this, 'isHidden', false));

    assert.strictEqual(
      this.element.textContent,
      '',
      'It does not produce any DOM nodes'
    );

    assert.verifySteps(
      [],
      'The callback was not called, because the helper was not un-rendered yet.'
    );

    run(() => set(this, 'isHidden', true));

    assert.verifySteps(
      ['callback called'],
      'The callback was called, because the helper became invisible.'
    );
  });
});
