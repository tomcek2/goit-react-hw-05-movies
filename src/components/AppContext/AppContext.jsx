import axios from 'axios';
import React, { useState, createContext, useContext, useEffect } from 'react';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [query, setQuery] = useState(null);
  const [movieId, setMovieId] = useState(null);
  const [movieTitle, setMovieTitle] = useState('');
  const [searchResponse, setSearchResponse] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});

  const fetcher = (search, setHook) => {
    return axios(search, options)
      .then(response => {
        const data = response.data;
        console.log(data);
        console.log(data.results);
        setHook(data);
      })
      .catch(error => {
        console.error('error:' + error);
      });
  };

  //   useEffect(() => {
  //     fetcher(idSearch, setMovieDetails);
  //     console.log(movieDetails);
  //   }, [movieId]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWNlODk4Njg1Y2Y3Y2YzYWU4OWE5YjY4NDBlNjU1OCIsInN1YiI6IjY1YzEzNDI1MDMxZGViMDE4M2YzYTUwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z0M1Gt0gZ7sp1cqOFs9beKTDiVHIn15JzYaDT_F6w7M',
    },
  };

  const appValue = {
    options,
    query,
    setQuery,
    movieId,
    setMovieId,
    movieTitle,
    setMovieTitle,
    searchResponse,
    setSearchResponse,
    movieDetails,
    setMovieDetails,
    fetcher,
  };

  return <AppContext.Provider value={appValue}>{children}</AppContext.Provider>;
};
