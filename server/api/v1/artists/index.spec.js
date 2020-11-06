import {
  buildGeniusSearchRequest,
  buildGeniusArtistRequest,
  extractArtistId,
} from "./index";

describe("buildGeniusSearchRequest", () => {
  test("should return correct api request url", () => {
    const exampleGeniusApiUrl = "api.genius.com";
    const exampleSearch = 'Bonobo';

    expect(
      buildGeniusSearchRequest({
        apiUrl: exampleGeniusApiUrl,
        search: exampleSearch,
      })
    ).toEqual('api.genius.com/search?q=Bonobo');
  });

  test("should encode url with spaces", () => {
    const exampleGeniusApiUrl = "api.genius.com";
    const exampleSearch = 'Kendrick Lamar';

    expect(
      buildGeniusSearchRequest({
        apiUrl: exampleGeniusApiUrl,
        search: exampleSearch,
      })
    ).toEqual('api.genius.com/search?q=Kendrick%20Lamar');
  });
});

describe("buildGeniusArtistRequest", () => {
  test("should return correct api request url", () => {
    const exampleGeniusApiUrl = "api.genius.com";
    const exampleArtistId = "1234";

    expect(
      buildGeniusArtistRequest({
        apiUrl: exampleGeniusApiUrl,
        artistId: exampleArtistId,
      })
    ).toEqual("api.genius.com/artists/1234");
  });
});

describe("extractArtistId", () => {
  test("should return top matched artistId from genius search results", () => {
    const exampleSearchResults = {
      response: {
        hits: [
          {
            result: {
              primary_artist: {
                id: 1
              }
            }
          },
          {
            result: {
              primary_artist: {
                id: 1
              }
            }
          },
          {
            result: {
              primary_artist: {
                id: 2
              }
            }
          },
        ]
      }
    };

    expect(extractArtistId({ searchResults: exampleSearchResults })).toBe("1");
  });

  test("should return some artistId for multiple top matches", () => {
    const exampleSearchResults = {
      response: {
        hits: [
          {
            result: {
              primary_artist: {
                id: 1
              }
            }
          },
          {
            result: {
              primary_artist: {
                id: 2
              }
            }
          },
          {
            result: {
              primary_artist: {
                id: 3
              }
            }
          },
        ]
      }
    };

    expect(extractArtistId({ searchResults: exampleSearchResults })).toBeDefined();
  });

  test("should return null for zero hits in search results", () => {
    const exampleSearchResults = {
      response: {
        hits: []
      }
    };

    expect(extractArtistId({ searchResults: exampleSearchResults })).toBeNull();
  });
});
