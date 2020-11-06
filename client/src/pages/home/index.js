import React, { useEffect, useState } from 'react';
import { DebounceInput } from "react-debounce-input";
import axios from 'axios';

const SEARCH_INPUT_MINIMUM_LENGTH = 2;
const SEARCH_INPUT_DEBOUNCE_TIMEOUT = 300;

function Home() {
  const [songsList, setSongsList] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [artistName, setArtistName] = useState('');

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

          const { artistId, name } = artistData;

          const { data: songsData } = await axios.get(
            `http://localhost:8000/api/songs/${artistId}`
            );

          const { songsList } = songsData;

          if (!ignore) {
            setArtistName(name);
            setSongsList(songsList);
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

  const handleChange = event => {
    const { value } = event.target;

    setSearch(value);
  }

  return (
    <div>
      <DebounceInput
        type="text"
        minLength={SEARCH_INPUT_MINIMUM_LENGTH}
        debounceTimeout={SEARCH_INPUT_DEBOUNCE_TIMEOUT}
        value={search}
        onChange={handleChange}
        placeholder="Enter artist name."
      />
      {loading ? (
        <div>loading...</div>
      ) : (
        error ? (
          <div>error...</div>
        ) : (
          <div>
            {artistName && (`Showing results for ${artistName}`)}
            {songsList.map(({ title, id }) => {
              return <div key={id}>{title}</div>;
            })}
          </div>
        )
      )}
    </div>
  );
}

export default Home;
