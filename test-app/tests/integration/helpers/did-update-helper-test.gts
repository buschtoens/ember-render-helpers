/* eslint-disable @typescript-eslint/no-explicit-any */
import { setProperties } from '@ember/object';
import { run } from '@ember/runloop';
import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import type { CallbackFunction } from 'ember-render-helpers';
import { didUpdateHelper } from 'ember-render-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';

interface TestContext extends BaseTestContext {
  argument1: any;
  argument2: any;
  argument3: any;
  callback: CallbackFunction;
  someCondition?: boolean;
}

module('Integration | Helper | did-update-helper', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.argument1 = '123';
    this.argument2 = 456;
    this.argument3 = false;
  });

  test('We can pass a callback function', async function (this: TestContext, assert) {
    this.callback = (positional, named): void => {
      assert.deepEqual(positional, []);

      assert.deepEqual(named, {});

      assert.step('callback');
    };

    const self = this;

    await render(<template>{{didUpdateHelper self.callback}}</template>);

    assert.verifySteps([]);
  });

  test('We can pass positional arguments', async function (this: TestContext, assert) {
    this.callback = (positional, named): void => {
      assert.deepEqual(positional, ['123', 456, false]);

      assert.deepEqual(named, {});

      assert.step('callback');
    };

    const self = this;

    await render(
      <template>
        {{didUpdateHelper
          self.callback
          self.argument1
          self.argument2
          self.argument3
        }}
      </template>,
    );

    assert.verifySteps([]);
  });

  test('We can pass named arguments', async function (this: TestContext, assert) {
    this.callback = (positional, named): void => {
      assert.deepEqual(positional, []);

      assert.deepEqual(named, {
        argument1: '123',
        argument2: 456,
        argument3: false,
      });

      assert.step('callback');
    };

    const self = this;

    await render(
      <template>
        {{didUpdateHelper
          self.callback
          argument1=self.argument1
          argument2=self.argument2
          argument3=self.argument3
        }}
      </template>,
    );

    assert.verifySteps([]);
  });

  test('Updating the callback function triggers the callback function', async function (this: TestContext, assert) {
    this.callback = (positional, named): void => {
      assert.deepEqual(positional, []);

      assert.deepEqual(named, {});

      assert.step('callback');
    };

    const self = this;

    await render(<template>{{didUpdateHelper self.callback}}</template>);

    assert.verifySteps([]);

    // eslint-disable-next-line ember/no-runloop
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
    this.callback = (positional, named): void => {
      assert.deepEqual(positional, ['abc', 789, true]);

      assert.deepEqual(named, {});

      assert.step('callback');
    };

    const self = this;

    await render(
      <template>
        {{didUpdateHelper
          self.callback
          self.argument1
          self.argument2
          self.argument3
        }}
      </template>,
    );

    assert.verifySteps([]);

    // eslint-disable-next-line ember/no-runloop
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
    this.callback = (positional, named): void => {
      assert.deepEqual(positional, []);

      assert.deepEqual(named, {
        argument1: 'abc',
        argument2: 789,
        argument3: true,
      });

      assert.step('callback');
    };

    const self = this;

    await render(
      <template>
        {{didUpdateHelper
          self.callback
          argument1=self.argument1
          argument2=self.argument2
          argument3=self.argument3
        }}
      </template>,
    );

    assert.verifySteps([]);

    // eslint-disable-next-line ember/no-runloop
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
    this.callback = (positional, named): void => {
      assert.deepEqual(positional, []);

      assert.deepEqual(named, {});

      assert.step('callback');
    };

    this.someCondition = true;

    const self = this;

    await render(
      <template>
        {{#if self.someCondition}}
          {{didUpdateHelper self.callback}}
        {{/if}}
      </template>,
    );

    assert.verifySteps([]);

    // eslint-disable-next-line ember/no-runloop
    run(() => {
      setProperties(this, {
        someCondition: false,
      });
    });

    assert.verifySteps([]);

    // eslint-disable-next-line ember/no-runloop
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
