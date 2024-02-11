import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListLink, Title } from 'components/Styles.styled';
import { useSearchParams } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: API_KEY,
  },
};

const MovieResponseList = ({ title }) => {
  const [searchResponse, setSearchResponse] = useState([]);
  const [searchParams] = useSearchParams();
  const paramTitle = searchParams.get('search');

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
    searchParams.set('search', paramTitle);
  }, [title]);

  return (
    <List>
      {searchResponse.map(finds => (
        <ListLink key={finds.id}>
          <ListLink to={`${finds.id}`}>
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
