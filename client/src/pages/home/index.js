import React, { useContext, useEffect } from 'react';
import { MainContext } from '../../context/main';

function Home() {
  const { state, dispatch } = useContext(MainContext);

  const { count } = state;

  const handleClick = () => {
    dispatch({ type: 'UPDATE_COUNT' });
  }

  return (
    <div>
      <button onClick={handleClick}>Count: {count}</button>
    </div>
  );
}

export default Home;
