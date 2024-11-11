#!/usr/bin/env sh

#----------
#
#  A. Purpose
#
#    Fix all test fixtures after updating the source code.
#
#  B. Usage
#
#    ./update-test-fixtures.sh
#
#---------

# Compile TypeScript
pnpm build

# Update my-app
rm -r "tests/fixtures/my-app/output"
cp -r "tests/fixtures/my-app/input" "tests/fixtures/my-app/output"

./dist/bin/ember-codemod-ember-render-helpers-to-v1.js \
  --root "tests/fixtures/my-app/output" \
  --type "app"

# Update my-v1-addon
rm -r "tests/fixtures/my-v1-addon/output"
cp -r "tests/fixtures/my-v1-addon/input" "tests/fixtures/my-v1-addon/output"

./dist/bin/ember-codemod-ember-render-helpers-to-v1.js \
  --root "tests/fixtures/my-v1-addon/output" \
  --type "v1-addon"
