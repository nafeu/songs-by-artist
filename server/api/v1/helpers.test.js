import { getAxiosConfig } from "./helpers";

describe("getAxiosConfig", () => {
  test("should return correct authorization header with token", () => {
    const exampleToken = 'EXAMPLE_TOKEN';

    expect(getAxiosConfig({ accessToken: exampleToken })).toEqual({
      headers: {
        Authorization: 'Bearer EXAMPLE_TOKEN'
      }
    });
  });
});
