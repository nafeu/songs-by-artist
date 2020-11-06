import axios from "axios";
import schema from "./schema";
import { GENIUS_API_URL } from "../constants";
import { getAxiosConfig } from "../helpers";
import regeneratorRuntime from "regenerator-runtime";

export const buildGeniusSongsByArtistIdRequest = ({ apiUrl = GENIUS_API_URL, artistId, page }) => {
  return `${apiUrl}/artists/${artistId}/songs?per_page=40${page ? `&page=${page}` : ""}`;
};

export const getSongsList = ({ songsResults }) => {
  const { songs, next_page: nextPage } = songsResults.response;

  const songsList = songs.map(({ title, id }) => {
    return {
      title,
      id
    };
  });

  return {
    songsList,
    nextPage: nextPage ? nextPage : null,
  };
};

export const getSongs = async (req, res, next) => {
  try {
    const { artistId } = req.params;
    const { page } = req.query;

    const input = { artistId, page };

    await schema.validateAsync(input);

    const { data: songsResults } = await axios.get(
      buildGeniusSongsByArtistIdRequest(input),
      getAxiosConfig()
    );

    const { songsList, nextPage } = getSongsList({ songsResults });

    res.json({ songsList, nextPage, artistId });
  } catch (error) {
    next(error);
  }
}