import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MovieResponseList } from 'components/MovieResponseList';
import { FormInput, FormButton } from 'components/Styles.styled';

export const Movies = () => {
  const [movieTitle, setMovieTitle] = useState('');
  const [isResponse, setIsResponse] = useState(false);
  const inputRef = useRef();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTitle = searchParams.get('search');

    if (searchTitle && searchTitle !== movieTitle) {
      setMovieTitle(searchTitle);
      setIsResponse(true);
    }
  }, []);

  const handleSearch = () => {
    const newTitle = inputRef.current.value.trim();

    if (newTitle.length > 0 && newTitle !== movieTitle) {
      setMovieTitle(newTitle);
      setIsResponse(true);

      const newURL = `${window.location.pathname}?search=${encodeURIComponent(
        newTitle
      )}`;
      window.history.replaceState(null, '', newURL);
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
        <FormInput
          type="text"
          ref={inputRef}
          placeholder="Enter Movie Title"
        ></FormInput>
        <FormButton onClick={() => handleSearch()}>Search</FormButton>
      </form>
      {isResponse && <MovieResponseList title={movieTitle} />}
    </>
  );
};
