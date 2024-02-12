import React, { useRef, useState, useEffect, Suspense, lazy } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FormInput, FormButton } from 'components/Styles.styled';
import { Loader } from 'components/Loader';

const MovieResponseList = lazy(() => import('../components/MovieResponseList'));

const Movies = () => {
  const [movieTitle, setMovieTitle] = useState('');
  const [isResponse, setIsResponse] = useState(false);
  const inputRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchTitle = searchParams.get('search');

    if (searchTitle && searchTitle !== movieTitle) {
      setMovieTitle(searchTitle);
      setIsResponse(true);
    }
  }, []); // eslint-disable-line

  const handleSearch = () => {
    const newTitle = inputRef.current.value.trim();

    if (newTitle.length > 0 && newTitle !== movieTitle) {
      setMovieTitle(newTitle);
      setIsResponse(true);
      setSearchParams({ search: newTitle });
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
      <Suspense fallback={<Loader />}>
        {isResponse && <MovieResponseList title={movieTitle} />}
      </Suspense>
    </>
  );
};

export default Movies;
