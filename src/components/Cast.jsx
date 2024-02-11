import { useAppContext } from 'components/AppContext';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CastList, ListLink, Title } from './Styles.styled';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const Cast = () => {
  const { movieId } = useParams();
  const { options } = useAppContext();
  const [cast, setCast] = useState([]);

  const castSearch = `${BASE_URL}3/movie/${movieId}/credits`;

  useEffect(() => {
    const getCast = async () => {
      try {
        const { data } = await axios(castSearch, options);
        console.log(data.cast);
        setCast(data.cast);
      } catch (error) {
        console.error('error:' + error);
      }
    };
    getCast();
  }, [movieId]);

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
