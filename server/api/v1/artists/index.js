import axios from "axios";
import schema from "./schema";
import { GENIUS_API_URL } from "../constants";
import { getAxiosConfig } from "../helpers";
import { getKeyOfMaxValueInObject } from "../../../../utils/helpers";

export const buildGeniusSearchRequest = ({ search }) => {
  return `${GENIUS_API_URL}/search?q=${encodeURI(search)}`;
};

export const extractArtistId = ({ searchResults }) => {
  const { hits } = searchResults.response;

  const artistIdCount = {};

  hits.forEach(({ result }) => {
    const { primary_artist: primaryArtist } = result;
    const { id: artistId } = primaryArtist;

    if (artistIdCount[artistId]) {
      artistIdCount[artistId] = artistIdCount[artistId] + 1;
    } else {
      artistIdCount[artistId] = 1;
    }
  });

  const topMatchedArtistId = getKeyOfMaxValueInObject(artistIdCount);

  return topMatchedArtistId;
};

export const getArtistId = async (req, res, next) => {
  try {
    const { search } = req.query;

    const input = { search };

    await schema.validateAsync(input);

    const { data: searchResults } = await axios.get(
      buildGeniusSearchRequest(input),
      getAxiosConfig()
    );

    const artistId = extractArtistId({ searchResults });

    res.json({ artistId });
  } catch (error) {
    next(error);
  }
};
