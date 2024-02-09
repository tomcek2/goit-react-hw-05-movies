import React, { useRef, useState } from 'react';
import { MovieResponseList } from 'components/MovieResponseList/MovieResponseList';

export const Movies = () => {
  const [movieTitle, setMovieTitle] = useState('');
  const [isResponse, setIsResponse] = useState(false);
  const inputRef = useRef();

  const handleSearch = () => {
    setMovieTitle(inputRef.current.value);
    if (
      inputRef.current.value.length > 0 &&
      inputRef.current.value !== movieTitle
    ) {
      setIsResponse(true);
    } else {
      setIsResponse(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputRef}></input>
        <button onClick={() => handleSearch()}>Search</button>
      </form>
      {isResponse && <MovieResponseList title={movieTitle} />}
    </>
  );
};
