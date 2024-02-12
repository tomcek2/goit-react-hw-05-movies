import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CastList } from './Styles.styled';

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

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  const castSearch = `${BASE_URL}3/movie/${movieId}/credits`;

  useEffect(() => {
    const getCast = async () => {
      try {
        const { data } = await axios(castSearch, options);
        setCast(data.cast);
      } catch (error) {
        console.error('error:' + error);
      }
    };
    getCast();
  }, [movieId]); // eslint-disable-line

  return (
    <ul>
      {cast.map(cas => (
        <CastList key={cas.cast_id + cas.id}>
          <img
            width="80"
            height="120"
            src={`https://image.tmdb.org/t/p/w500/${cas.profile_path}` || ''}
            alt=""
          />
          <p>{cas.original_name}</p>
          <p>{cas.character}</p>
        </CastList>
      ))}
    </ul>
  );
};

export default Cast;
