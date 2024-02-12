import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListLink, Title } from 'components/Styles.styled';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://api.themoviedb.org/';
const API_KEY =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWNlODk4Njg1Y2Y3Y2YzYWU4OWE5YjY4NDBlNjU1OCIsInN1YiI6IjY1YzEzNDI1MDMxZGViMDE4M2YzYTUwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z0M1Gt0gZ7sp1cqOFs9beKTDiVHIn15JzYaDT_F6w7M';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: API_KEY,
  },
};

const MovieResponseList = ({ title }) => {
  const [searchResponse, setSearchResponse] = useState([]);
  const location = useLocation();

  const titleSearch = `${BASE_URL}3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`;

  useEffect(() => {
    const getTitleList = async () => {
      try {
        const { data } = await axios(titleSearch, options);
        setSearchResponse(data.results);
      } catch (error) {
        console.error('error:' + error);
      }
    };
    getTitleList();
  }, [title]); // eslint-disable-line

  return (
    <List>
      {searchResponse.map(finds => (
        <ListLink key={finds.id}>
          <ListLink to={`${finds.id}`} state={{ from: location }}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${finds.poster_path || ''}`}
              width="200"
              height="300"
              alt=""
            />
            <Title>{finds.original_title}</Title>
          </ListLink>
        </ListLink>
      ))}
    </List>
  );
};

export default MovieResponseList;
