import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import { getProperties, set } from '@ember/object';
import { run } from '@ember/runloop';

import {
  PositionalParameters,
  NamedParameters
} from 'ember-render-helpers/types';

import hbs from 'htmlbars-inline-precompile';

import { TestContext } from 'dummy/tests/helpers/test-context';

module('Integration | Helper | did-update', function(hooks) {
  setupRenderingTest(hooks);

  const TEMPLATE = hbs`
    {{~#unless this.isHidden~}}
      {{~did-update
        this.callback
        this.pos1
        this.pos2
        named1=this.named1
        named2=this.named2
      ~}}
    {{~/unless~}}
  `;

  test('it renders and does not call the callback', async function(this: TestContext, assert) {
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
  });

  test('it passes positional arguments, when updated', async function(this: TestContext, assert) {
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

    run(() => set(this, 'pos1', 'something else'));

    assert.verifySteps(
      ['callback called'],
      'It calls the callback, when the arguments change.'
    );
  });

  test('it passes named arguments, when updated', async function(this: TestContext, assert) {
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

    run(() => set(this, 'named1', 'something else'));

    assert.verifySteps(
      ['callback called'],
      'It calls the callback, when the arguments change.'
    );
  });

  test('it passes positional and named arguments, when updated', async function(this: TestContext, assert) {
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

    run(() => set(this, 'pos1', 'something else'));

    assert.verifySteps(
      ['callback called'],
      'It calls the callback, when the positional arguments change.'
    );

    run(() => set(this, 'named1', 'something else'));

    assert.verifySteps(
      ['callback called'],
      'It calls the callback, when the named arguments change.'
    );
  });

  // @TODO: Do we want this?
  test('updating the callback causes it to be called again', async function(this: TestContext, assert) {
    this.callback = () => {
      assert.step('callback called');
    };

    await render(TEMPLATE);

    assert.strictEqual(
      this.element.textContent,
      '',
      'It does not produce any DOM nodes'
    );

    assert.verifySteps(
      [],
      'The old callback is not called, since there was no update yet.'
    );

    run(() =>
      set(this, 'callback', () => {
        assert.step('new callback called');
      })
    );

    run(() =>
      set(this, 'callback', () => {
        assert.step('another new callback called');
      })
    );

    assert.verifySteps(
      ['new callback called', 'another new callback called'],
      'The new callbacks are immediately called, after the update.'
    );
  });

  test('re-inserting the helper (`{{if}}`) triggers no callback', async function(this: TestContext, assert) {
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
      'The callback was not called, because there was no update.'
    );

    run(() => set(this, 'isHidden', true));

    assert.verifySteps(
      [],
      'The callback is not called again, when the helper became invisible.'
    );

    run(() => set(this, 'isHidden', false));

    assert.verifySteps(
      [],
      'The callback was not called, because there was no update.'
    );
  });
});
