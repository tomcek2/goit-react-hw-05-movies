import axios from 'axios';
import React, { useState, createContext, useContext, useEffect } from 'react';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [query, setQuery] = useState(null);
  const [trending, setTrending] = useState([]);
  const [movieId, setMovieId] = useState(0);
  const [movieTitle, setMovieTitle] = useState('');
  const [searchResponse, setSearchResponse] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});

  const trendingSearch = `${BASE_URL}3/trending/movie/day?language=en-US`;
  const titleSearch = `${BASE_URL}3/search/movie?query=${movieTitle}&include_adult=false&language=en-US&page=1`;
  const idSearch = `${BASE_URL}3/movie/${movieId}?language=en-US`;
  const imageSearch = `${BASE_URL}3/movie/${movieId}/images`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWNlODk4Njg1Y2Y3Y2YzYWU4OWE5YjY4NDBlNjU1OCIsInN1YiI6IjY1YzEzNDI1MDMxZGViMDE4M2YzYTUwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z0M1Gt0gZ7sp1cqOFs9beKTDiVHIn15JzYaDT_F6w7M',
    },
  };

  const fetcher = (search, setHook) => {
    return axios(search, options)
      .then(response => {
        const data = response.data;
        console.log(data);
        console.log(data.results);
        setHook === setMovieDetails ? setHook(data) : setHook(data.results);
      })
      .catch(error => {
        console.error('error:' + error);
      });
  };

  useEffect(() => {
    fetcher(trendingSearch, setTrending);
  }, []);

  useEffect(() => {
    fetcher(titleSearch, setSearchResponse);
  }, [movieTitle]);

  useEffect(() => {
    fetcher(idSearch, setMovieDetails);
    console.log(movieDetails);
  }, [movieId]);

  const appValue = {
    query,
    setQuery,
    trending,
    setTrending,
    movieId,
    setMovieId,
    movieTitle,
    setMovieTitle,
    searchResponse,
    setSearchResponse,
    movieDetails,
    setMovieDetails,
  };

  return <AppContext.Provider value={appValue}>{children}</AppContext.Provider>;
};
