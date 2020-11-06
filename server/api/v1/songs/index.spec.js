import {
  buildGeniusSongsByArtistIdRequest,
  getSongsList,
} from "./index";

describe("buildGeniusSongsByArtistIdRequest", () => {
  test("should return correct api request url", () => {
    const exampleGeniusApiUrl = "api.genius.com";
    const exampleArtistId = "1234";

    expect(
      buildGeniusSongsByArtistIdRequest({
        apiUrl: exampleGeniusApiUrl,
        artistId: exampleArtistId,
      })
    ).toEqual("api.genius.com/artists/1234/songs");
  });

  test("should include page in url when given as param", () => {
    const exampleGeniusApiUrl = "api.genius.com";
    const exampleArtistId = "1234";
    const examplePage = 2;

    expect(
      buildGeniusSongsByArtistIdRequest({
        apiUrl: exampleGeniusApiUrl,
        artistId: exampleArtistId,
        page: examplePage,
      })
    ).toEqual("api.genius.com/artists/1234/songs?page=2");
  });
});

describe("getSongsList", () => {
  test("should return formatted songs list from songs results", () => {
    const exampleSongsResults = {
      response: {
        songs: [
          {
            title: 'Song A',
            meta: 'example meta 1',
            id: 1
          },
          {
            title: 'Song B',
            meta: 'example meta 2',
            id: 2
          }
        ],
        next_page: 2
      }
    };

    expect(getSongsList({ songsResults: exampleSongsResults })).toEqual({
      songsList: [
        {
          title: 'Song A',
          id: 1
        },
        {
          title: 'Song B',
          id: 2
        }
      ],
      nextPage: 2
    });
  });

  test("should return empty for empty songs results", () => {
    const exampleSongsResults = {
      response: {
        songs: [],
      },
    };

    expect(getSongsList({ songsResults: exampleSongsResults })).toEqual({
      songsList: [],
      nextPage: null,
    });
  });
});
