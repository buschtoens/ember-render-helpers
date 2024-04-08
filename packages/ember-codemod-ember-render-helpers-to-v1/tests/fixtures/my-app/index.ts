import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('my-app/input');
const outputProject = convertFixtureToJson('my-app/output');

export { inputProject, outputProject };
