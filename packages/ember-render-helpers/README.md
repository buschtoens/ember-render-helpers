# ember-render-helpers

![CI](https://github.com/buschtoens/ember-render-helpers/workflows/CI/badge.svg)
[![npm version](https://badge.fury.io/js/ember-render-helpers.svg)](http://badge.fury.io/js/ember-render-helpers)
[![Download Total](https://img.shields.io/npm/dt/ember-render-helpers.svg)](http://badge.fury.io/js/ember-render-helpers)
[![Ember Observer Score](https://emberobserver.com/badges/ember-render-helpers.svg)](https://emberobserver.com/addons/ember-render-helpers)
[![Ember Versions](https://img.shields.io/badge/Ember.js%20Versions-%5E3.8-brightgreen.svg)](https://travis-ci.org/buschtoens/ember-render-helpers)
[![ember-cli Versions](https://img.shields.io/badge/ember--cli%20Versions-%5E2.13%20%7C%7C%20%5E3.0-brightgreen.svg)](https://travis-ci.org/buschtoens/ember-render-helpers)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![dependencies](https://img.shields.io/david/buschtoens/ember-render-helpers.svg)](https://david-dm.org/buschtoens/ember-render-helpers)
[![devDependencies](https://img.shields.io/david/dev/buschtoens/ember-render-helpers.svg)](https://david-dm.org/buschtoens/ember-render-helpers)

Use the `{{did-insert}}`, `{{did-update}}`, `{{will-destroy}}` modifiers from [`@ember/render-modifiers`][render-modifiers] as template helpers.

The original idea came from [this Pre-RFC][pre-rfc].

[render-modifiers]: https://github.com/emberjs/ember-render-modifiers#readme
[pre-rfc]: https://github.com/emberjs/rfcs/issues/484

## Installation

```
ember install ember-render-helpers
```

<details>

<summary>Use Glint or <code>&lt;template&gt;</code> tag? ✨</summary>

- Update your template registry to extend this addon's. Check the [Glint documentation](https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons#using-glint-enabled-addons) for more information.

    ```ts
    import '@glint/environment-ember-loose';

    import type EmberRenderHelpersRegistry from 'ember-render-helpers/template-registry';

    declare module '@glint/environment-ember-loose/registry' {
      export default interface Registry extends EmberRenderHelpersRegistry, /* other addon registries */ {
        // local entries
      }
    }
    ```

- In a `<template>` tag, use the named import to consume the helpers.

    ```ts
    import { action } from '@ember/object';
    import Component from '@glimmer/component';
    import { didInsertHelper } from 'ember-render-helpers';

    export default class HelloComponent extends Component {
      @action sayHello() {
        console.log('Hello!');
      }

      <template>
        {{didInsertHelper this.sayHello}}
      </template>
    }
    ```

</details>


## Usage

`ember-render-helpers` provides 3 helpers. To avoid name conflicts with `@ember/render-modifiers`, these helpers are suffixed with `-helper`.

- `{{did-insert-helper}}`
- `{{did-update-helper}}`
- `{{will-destroy-helper}}`

All helpers expect a callback function as the 1st positional argument. You can pass parameters to this callback function as subsequent positional arguments, as named arguments, or using both.

```hbs
{{did-insert-helper this.sayHello "Zoey"}}
```

```ts
import Component from '@glimmer/component';
import type { NamedParameters, PositionalParameters } from 'ember-render-helpers';

export default class HelloComponent extends Component {
  @action sayHello(positional: PositionalParameters, _named: NamedParameters) {
    const name = positional[0] as string;

    console.log(`Hello, ${name}!`);
  }
}
```


### Example

Clicking the `Toggle` button will toggle the `isVisible` flag. When it switches
to `true`, `onDidInsert` will be called, because the `{{did-insert-helper}}` helper is
inserted. When it switches to `false`, `onWillDestroy` will be called, because
the `{{will-destroy-helper}}` helper is removed.

Clicking the `Random` button will set `randomValue` to a new random value. Every
time this happens, while `isVisible` is `true`, `onDidUpdate` will be called,
because one of the parameters passed to the `{{did-update-helper}}` helper was updated.

Clicking the `Random` button _does not_ cause `{{did-insert-helper}}` or
`{{will-destroy-helper}}` to call `onDidInsert` and `onWillDestroy`, since these
helpers are not triggered by parameter updates.

```hbs
{{#if this.isVisible}}
  {{did-insert-helper   this.onDidInsert   1 2 3 this.randomValue foo="bar" qux="baz"}}
  {{will-destroy-helper this.onWillDestroy 1 2 3 this.randomValue foo="bar" qux="baz"}}
  {{did-update-helper   this.onDidUpdate   1 2 3 this.randomValue foo="bar" qux="baz"}}
{{/if}}

<button {{on "click" this.toggleVisibility}}>Toggle</button>
<button {{on "click" this.rollTheDice}}>Random</button>
```

```ts
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class extends Component {
  @tracked isVisible = false;

  @tracked randomValue?: number;

  @action
  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  @action
  rollTheDice() {
    this.randomValue = Math.random();
  }

  @action
  onDidInsert(positional: unknown[], named: Record<string, unknown>) {
    console.log({ positional, named });
    // => { positional: [1, 2, 3, 0.1337...], named: { foo: 'bar', qux: 'baz' } }
  }

  @action
  onWillDestroy(positional: unknown[], named: Record<string, unknown>) {
    console.log({ positional, named });
    // => { positional: [1, 2, 3, 0.1337...], named: { foo: 'bar', qux: 'baz' } }
  }

  @action
  onDidUpdate(positional: unknown[], named: Record<string, unknown>) {
    console.log({ positional, named });
    // => { positional: [1, 2, 3, 0.1337...], named: { foo: 'bar', qux: 'baz' } }
  }
}
```
