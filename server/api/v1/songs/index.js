import axios from "axios";
import schema from "./schema";
import { GENIUS_API_URL } from "../constants";
import { getAxiosConfig } from "../helpers";

export const buildGeniusSongsByArtistIdRequest = ({ artistId }) => {
  return `${GENIUS_API_URL}/artists/${artistId}/songs`;
};

export const getSongsList = ({ songsResults }) => {
  const { songs, next_page: nextPage } = songsResults.response;

  const songsList = songs.map(({ title }) => {
    return title;
  });

  return {
    songsList,
    nextPage,
  };
};

export const getSongs = async (req, res, next) => {
  try {
    const { artistId } = req.params;

    const input = { artistId };

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