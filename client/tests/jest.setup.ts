import { matchers as styledMatchers } from '@emotion/jest'

expect.extend(styledMatchers);

beforeEach(() => {
    jest.resetAllMocks();
});
