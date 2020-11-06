import React, { useEffect, useState } from 'react';
import { DebounceInput } from "react-debounce-input";
import InfiniteScroll from "react-infinite-scroll-component";

import axios from 'axios';

const SEARCH_INPUT_MINIMUM_LENGTH = 2;
const SEARCH_INPUT_DEBOUNCE_TIMEOUT = 300;

function Home() {
  const [songsList, setSongsList] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [artistId, setArtistId] = useState();
  const [artistName, setArtistName] = useState('');
  const [nextPage, setNextPage] = useState();

  useEffect(() => {
    let ignore = false;
    const fetchSongsList = async () => {
      try {
        setLoading(true);
        setError(false);

        if (search.length > 1) {
          const { data: artistData } = await axios.get(
            `http://localhost:8000/api/artists?search=${encodeURI(search)}`
          );

          const { data: songsData } = await axios.get(
            `http://localhost:8000/api/songs/${artistData.artistId}`
          );

          if (!ignore) {
            setArtistId(artistData.artistId);
            setArtistName(artistData.name);
            setSongsList(songsData.songsList);
            setNextPage(songsData.nextPage);
          }
        }
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };

    fetchSongsList();

    return () => {
      ignore = true;
    };
  }, [search]);

  const fetchMoreSongs = async () => {
    try {
      setLoading(true);
      setError(false);
      const { data: songsData } = await axios.get(
        `http://localhost:8000/api/songs/${artistId}?page=${nextPage}`
      );

      setSongsList([...songsList, ...songsData.songsList]);

      if (nextPage !== songsData.nextPage && songsData.nextPage > 1) {
        setNextPage(songsData.nextPage);
      } else {
        setNextPage(null);
      }
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  }

  const handleChange = event => {
    const { value } = event.target;

    setSearch(value);
  }

  return (
    <div className="home-container">
      <SearchBox
        error={error}
        loading={loading}
        search={search}
        handleChange={handleChange}
      />
      <Artist artistName={artistName} />
      <ScrollableSongsList
        songsList={songsList}
        fetchMoreSongs={fetchMoreSongs}
        nextPage={nextPage}
      />
    </div>
  );
}

function Artist({ artistName }) {
  return <div className="artist">{artistName && `Showing results for ${artistName}`}</div>;
}

function ScrollableSongsList({ songsList, fetchMoreSongs, nextPage }) {
  return (
    <div id="scrollable-songs-list">
      <InfiniteScroll
        dataLength={songsList.length}
        next={fetchMoreSongs}
        hasMore={nextPage}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollable-songs-list"
        endMessage={""}
      >
        {songsList.map(({ title, id }) => {
          return (
            <div key={id} className="song">
              {title}
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
}

function SearchBox({ error, loading, search, handleChange }) {
    const getClassName = () => {
    if (error) {
      return "search search-error";
    }
    if (loading) {
      return "search search-loading";
    }
    return "search";
  }

  return (
    <DebounceInput
      className={getClassName()}
      type="text"
      minLength={SEARCH_INPUT_MINIMUM_LENGTH}
      debounceTimeout={SEARCH_INPUT_DEBOUNCE_TIMEOUT}
      value={search}
      onChange={handleChange}
      placeholder="Enter artist name."
    />
  );
}

export default Home;
