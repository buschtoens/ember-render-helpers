# Contributing to ember-render-helpers

## Local development

<details>

<summary>Install dependencies</summary>

1. Fork and clone this repo.

    ```sh
    git clone git@github.com:<your-github-handle>/ember-render-helpers.git
    ```

1. Change directory.

    ```sh
    cd ember-render-helpers
    ```

1. Use [`pnpm`](https://pnpm.io/installation) to install dependencies.

    ```sh
    pnpm install
    ```

</details>


<details>

<summary>Run the demo app</summary>

1. Once dependencies have been installed, you can run the [test app](./test-app).

    ```sh
    # From the workspace root
    pnpm start
    ```

1. Open the app at [http://localhost:4200](http://localhost:4200).

</details>


<details>

<summary>Lint files</summary>

1. When you write code, please check that it meets the linting rules.

    ```sh
    # From the workspace root
    pnpm lint
    ```

1. You can run `lint:fix` to automatically fix linting errors.

    ```sh
    # From the workspace root
    pnpm lint:fix
    ```

</details>


<details>

<summary>Run tests</summary>

1. When you write code, please check that all tests continue to pass.

    ```sh
    # From the workspace root
    pnpm test
    ```

</details>


<details>

<summary>Add changeset to pull request</code></summary>

1. To record how a pull request affects packages, you will want to add a changeset.

    The changeset provides a summary of the code change. It also describes how package versions should be updated (major, minor, or patch) as a result of the code change.

    ```sh
    # From the workspace root
    pnpm changeset
    ```

</details>


<details>

<summary>Publish packages (for admins)</summary>

1. Generate a [personal access token](https://github.com/settings/tokens/) in GitHub, with default values for scopes (none selected).

1. Run the `release:changelog` script. This removes changesets, updates the package versions, and updates the `CHANGELOG`'s.

    ```sh
    # From the workspace root
    GITHUB_TOKEN=<YOUR_PERSONAL_ACCESS_TOKEN> pnpm release:changelog
    ```

    The `release:changelog` script also updated the workspace root's version (by following the highest version formula). We will use it to name the tag that will be published.

    ```
    # Highest version formula
    workspace root version = max(
      max(all package versions),
      workspace root version + 0.0.1,
    );
    ```

1. [Create a tag](https://github.com/buschtoens/ember-render-helpers/releases/new) and provide release notes. The tag name should match the package version, prefixed by the letter `v`. For example, `v1.0.0`.

1. Publish the packages.

    ```sh
    # From the workspace root
    pnpm release:package
    ```

</details>
