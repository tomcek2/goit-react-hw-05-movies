import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppContext } from 'components/AppContext';
import { List, ListLink, Title } from 'components/Styles.styled';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const MovieResponseList = ({ title }) => {
  console.log(title);
  const [searchResponse, setSearchResponse] = useState([]);
  const { options } = useAppContext();

  const titleSearch = `${BASE_URL}3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`;

  useEffect(() => {
    const getTitleList = async () => {
      try {
        const { data } = await axios(titleSearch, options);

        console.log(titleSearch);
        console.log(data.results);
        setSearchResponse(data.results);

        const newURL = `${window.location.pathname}?search=${encodeURIComponent(
          title
        )}`;
        window.history.replaceState(null, '', newURL);
      } catch (error) {
        console.error('error:' + error);
      }
    };
    getTitleList();
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
