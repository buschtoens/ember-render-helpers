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

module('Integration | Helper | did-insert', function (hooks) {
  setupRenderingTest(hooks);

  const TEMPLATE = hbs`
    {{~#unless this.isHidden~}}
      {{~did-insert
        this.callback
        this.pos1
        this.pos2
        named1=this.named1
        named2=this.named2
      ~}}
    {{~/unless~}}
  `;

  test('it renders and calls the callback', async function (this: TestContext, assert) {
    this.callback = () => {
      assert.step('callback called');
    };

    await render(TEMPLATE);

    assert.strictEqual(
      this.element.textContent,
      '',
      'It does not produce any DOM nodes.'
    );

    assert.verifySteps(['callback called'], 'It calls the callback.');
  });

  test('it passes positional arguments', async function (this: TestContext, assert) {
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

    assert.verifySteps(['callback called'], 'It calls the callback.');
  });

  test('it passes named arguments', async function (this: TestContext, assert) {
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

    assert.verifySteps(['callback called'], 'It calls the callback.');
  });

  test('it passes positional and named arguments', async function (this: TestContext, assert) {
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

    assert.verifySteps(['callback called'], 'It calls the callback.');
  });

  test('updates to positional arguments do not trigger another callback', async function (this: TestContext, assert) {
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

    assert.verifySteps(
      ['callback called'],
      'It calls the callback once before the update.'
    );

    run(() => set(this, 'pos1', 'something else'));

    assert.verifySteps([], 'The callback is not called again.');
  });

  test('updates to named arguments do not trigger another callback', async function (this: TestContext, assert) {
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

    assert.verifySteps(
      ['callback called'],
      'It calls the callback once before the update.'
    );

    run(() => set(this, 'named1', 'something else'));

    assert.verifySteps([], 'The callback is not called again.');
  });

  test('updating the callback does not cause it to be called again', async function (this: TestContext, assert) {
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
      ['callback called'],
      'It calls the callback once before the callback is updated.'
    );

    run(() =>
      set(this, 'callback', () => {
        assert.step('never called');
      })
    );

    assert.verifySteps(
      [],
      'The callback is not called again, after the update.'
    );
  });

  test('re-inserting the helper (`{{if}}`) triggers the callback', async function (this: TestContext, assert) {
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
      ['callback called'],
      'The callback we called once, because the helper became visible.'
    );

    run(() => set(this, 'isHidden', true));

    assert.verifySteps(
      [],
      'The callback is not called again, when the helper became invisible.'
    );

    run(() => set(this, 'isHidden', false));

    assert.verifySteps(
      ['callback called'],
      'The callback we called once, because the helper became visible again.'
    );
  });

  test('the updated callback is called, when the helper is re-inserted', async function (this: TestContext, assert) {
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
      ['callback called'],
      'It calls the callback once before the callback is updated.'
    );

    run(() =>
      set(this, 'callback', () => {
        assert.step('new callback called');
      })
    );

    assert.verifySteps(
      [],
      'The callback is not called again, after the update.'
    );

    run(() => set(this, 'isHidden', true));

    assert.verifySteps(
      [],
      'The callback is not called again, after the helper was hidden.'
    );

    run(() => set(this, 'isHidden', false));

    assert.verifySteps(
      ['new callback called'],
      'The callback is not called again, after the helper was hidden.'
    );
  });
});
