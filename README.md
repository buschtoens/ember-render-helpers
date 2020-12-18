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

[`@ember/render-modifiers`][render-modifiers] as template helpers:
`{{did-insert}}`, `{{did-update}}`, `{{will-destroy}}`

The original idea came from [this Pre-RFC][pre-rfc].

[render-modifiers]: https://github.com/emberjs/ember-render-modifiers#readme
[pre-rfc]: https://github.com/emberjs/rfcs/issues/484

## Installation

```
ember install ember-render-helpers
```

## Usage

### Example

Clicking the `Toggle` button will toggle the `isVisible` flag. When it switches
to `true`, `onDidInsert` will be called, because the `{{did-insert}}` helper is
inserted. When it switches to `false`, `onWillDestroy` will be called, because
the `{{will-destroy}}` helper is removed.

Clicking the `Random` button will set `randomValue` to a new random value. Every
time this happens, while `isVisible` is `true`, `onDidUpdate` will be called,
because one of the parameters passed to the `{{did-update}}` helper was updated.

Clicking the `Random` button _does not_ cause `{{did-insert}}` or
`{{will-destroy}}` to call `onDidInsert` and `onWillDestroy`, since these
helpers are not triggered by parameter updates.

```hbs
{{#if this.isVisible}}
  {{did-insert   this.onDidInsert   1 2 3 this.randomValue foo="bar" qux="baz"}}
  {{will-destroy this.onWillDestroy 1 2 3 this.randomValue foo="bar" qux="baz"}}
  {{did-update   this.onDidUpdate   1 2 3 this.randomValue foo="bar" qux="baz"}}
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
