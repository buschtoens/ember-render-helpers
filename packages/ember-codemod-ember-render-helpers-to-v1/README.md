[![This project uses GitHub Actions for continuous integration.](https://github.com/buschtoens/ember-render-helpers/actions/workflows/ci.yml/badge.svg)](https://github.com/buschtoens/ember-render-helpers/actions/workflows/ci.yml)

# ember-codemod-ember-render-helpers-to-v1

The codemod helps you rename helpers after updating `ember-render-helpers` to `v1.0.0`.

- Rename `{{did-insert}}` to `{{did-insert-helper}}`
- Rename `{{did-update}}` to `{{did-update-helper}}`
- Rename `{{will-destroy}}` to `{{will-destroy-helper}}`


## Usage

### Arguments

You must pass `--type` to indicate what type of project you have.

```sh
npx ember-codemod-ember-render-helpers-to-v1 --type app
npx ember-codemod-ember-render-helpers-to-v1 --type v1-addon
```

<details>

<summary>Optional: Specify the project root</summary>

Pass `--root` to run the codemod somewhere else (i.e. not in the current directory).

```sh
npx ember-codemod-ember-render-helpers-to-v1 --root <path/to/your/project>
```

</details>


### Limitations

The codemod is designed to cover typical cases. It is not designed to cover one-off cases.

To better meet your needs, consider cloning the repo and running the codemod locally.

```sh
cd <path/to/cloned/repo>

# Compile TypeScript
pnpm build

# Run codemod
./dist/bin/ember-codemod-ember-render-helpers-to-v1.js --root <path/to/your/project>
```


## Compatibility

- Node.js v18 or above


## Contributing

See the [Contributing](../CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
