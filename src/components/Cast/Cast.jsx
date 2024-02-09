import { useAppContext } from 'components/AppContext/AppContext';
import { Outlet, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
        if (data.cast !== cast) {
          setCast(data.cast);
        }
      } catch (error) {
        console.error('error:' + error);
      }
    };
    getCast();
    console.log(cast);
  }, [cast]);

  return (
    <ul>
      {cast.map(cas => (
        <li key={cas.id}>
          <img
            width="80"
            height="120"
            src={
              cas.profile_path.length > 0
                ? `https://image.tmdb.org/t/p/w500/${cas.profile_path}`
                : ''
            }
            alt=""
          />
          <p>{cas.original_name}</p>
          <p>{cas.character}</p>
        </li>
      ))}
    </ul>
  );
};
