/* eslint-disable @typescript-eslint/no-explicit-any */
import { setProperties } from '@ember/object';
import { run } from '@ember/runloop';
import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { hbs } from 'ember-cli-htmlbars';
import type { CallbackFunction } from 'ember-render-helpers/types';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  argument1: any;
  argument2: any;
  argument3: any;
  callback: CallbackFunction;
  someCondition?: boolean;
}

module('Integration | Helper | did-update', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.argument1 = '123';
    this.argument2 = 456;
    this.argument3 = false;
  });

  test('We can pass a callback function', async function (this: TestContext, assert) {
    this.callback = (positional, named) => {
      assert.deepEqual(positional, []);

      assert.deepEqual(named, {});

      assert.step('callback');
    };

    await render<TestContext>(hbs`
      {{did-update this.callback}}
    `);

    assert.verifySteps([]);
  });

  test('We can pass positional arguments', async function (this: TestContext, assert) {
    this.callback = (positional, named) => {
      assert.deepEqual(positional, ['123', 456, false]);

      assert.deepEqual(named, {});

      assert.step('callback');
    };

    await render<TestContext>(hbs`
      {{did-update
        this.callback
        this.argument1
        this.argument2
        this.argument3
      }}
    `);

    assert.verifySteps([]);
  });

  test('We can pass named arguments', async function (this: TestContext, assert) {
    this.callback = (positional, named) => {
      assert.deepEqual(positional, []);

      assert.deepEqual(named, {
        argument1: '123',
        argument2: 456,
        argument3: false,
      });

      assert.step('callback');
    };

    await render<TestContext>(hbs`
      {{did-update
        this.callback
        argument1=this.argument1
        argument2=this.argument2
        argument3=this.argument3
      }}
    `);

    assert.verifySteps([]);
  });

  test('Updating the callback function triggers the callback function', async function (this: TestContext, assert) {
    this.callback = (positional, named) => {
      assert.deepEqual(positional, []);

      assert.deepEqual(named, {});

      assert.step('callback');
    };

    await render<TestContext>(hbs`
      {{did-update this.callback}}
    `);

    assert.verifySteps([]);

    run(() => {
      setProperties(this, {
        callback: () => {
          assert.step('new callback');
        },
      });
    });

    assert.verifySteps(['new callback']);
  });

  test('Updating positional arguments triggers the callback function', async function (this: TestContext, assert) {
    this.callback = (positional, named) => {
      assert.deepEqual(positional, ['abc', 789, true]);

      assert.deepEqual(named, {});

      assert.step('callback');
    };

    await render<TestContext>(hbs`
      {{did-update
        this.callback
        this.argument1
        this.argument2
        this.argument3
      }}
    `);

    assert.verifySteps([]);

    run(() => {
      setProperties(this, {
        argument1: 'abc',
        argument2: 789,
        argument3: true,
      });
    });

    assert.verifySteps(['callback']);
  });

  test('Updating named arguments triggers the callback function', async function (this: TestContext, assert) {
    this.callback = (positional, named) => {
      assert.deepEqual(positional, []);

      assert.deepEqual(named, {
        argument1: 'abc',
        argument2: 789,
        argument3: true,
      });

      assert.step('callback');
    };

    await render<TestContext>(hbs`
      {{did-update
        this.callback
        argument1=this.argument1
        argument2=this.argument2
        argument3=this.argument3
      }}
    `);

    assert.verifySteps([]);

    run(() => {
      setProperties(this, {
        argument1: 'abc',
        argument2: 789,
        argument3: true,
      });
    });

    assert.verifySteps(['callback']);
  });

  test('Re-inserting the helper does not trigger the callback function', async function (this: TestContext, assert) {
    this.callback = (positional, named) => {
      assert.deepEqual(positional, []);

      assert.deepEqual(named, {});

      assert.step('callback');
    };

    this.someCondition = true;

    await render<TestContext>(hbs`
      {{#if this.someCondition}}
        {{did-update this.callback}}
      {{/if}}
    `);

    assert.verifySteps([]);

    run(() => {
      setProperties(this, {
        someCondition: false,
      });
    });

    assert.verifySteps([]);

    run(() => {
      setProperties(this, {
        callback: () => {
          assert.step('new callback');
        },
        someCondition: true,
      });
    });

    assert.verifySteps([]);
  });
});
