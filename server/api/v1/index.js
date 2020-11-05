import express from 'express';
import axios from "axios";

const GENIUS_CLIENT_ACCESS_TOKEN = process.env.GENIUS_CLIENT_ACCESS_TOKEN;
const GENIUS_API_URL = "https://api.genius.com";

const getAxiosConfig = () => {
  return {
    headers: {
      Authorization: `Bearer ${GENIUS_CLIENT_ACCESS_TOKEN}`,
    },
  };
}

const buildGeniusSearchRequest = ({ search }) => {
  return `${GENIUS_API_URL}/search?q=${encodeURI(search)}`
}

const buildGeniusSongsByArtistIdRequest = ({ artistId, page }) => {
  return `${GENIUS_API_URL}/artists/${artistId}/songs${page ? `?page=${page}` : ''}`
}

const api = express.Router();

api.get('/songs', async (req, res, next) => {
  try {
    const { artist } = req.query;

    const { data: searchResults } = await axios.get(buildGeniusSearchRequest({ search: artist }), getAxiosConfig());
    const artistId = getArtistId({ searchResults });
    const { data: songsResults } = await axios.get(buildGeniusSongsByArtistIdRequest({ artistId }), getAxiosConfig());
    const { songsList, nextPageRequest } = getSongsList({ songsResults, artistId });

    res.json({ songsList, nextPageRequest });
  } catch (error) {
    next(error);
  }
});

const getArtistId = ({ searchResults }) => {
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

const getSongsList = ({ songsResults, artistId }) => {
  const { songs, next_page: nextPage } = songsResults.response;

  const songsList = songs.map(({ title }) => {
    return title;
  });

  return {
    songsList,
    nextPageRequest: buildGeniusSongsByArtistIdRequest({ artistId, page: nextPage }),
  };
}

const getKeyOfMaxValueInObject = inputObject => {
  return Object.keys(inputObject).reduce((a, b) => (inputObject[a] > inputObject[b] ? a : b));
}

export default api;
