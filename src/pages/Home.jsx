import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListLink, Title } from 'components/Styles.styled';

import { useAppContext } from 'components/AppContext';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const Home = () => {
  const [trending, setTrending] = useState([]);
  const { options } = useAppContext();

  const trendingSearch = `${BASE_URL}3/trending/movie/day?language=en-US`;

  useEffect(() => {
    const getTrending = async () => {
      try {
        const { data } = await axios(trendingSearch, options);
        console.log(data);
        console.log(data.results);
        setTrending(data.results);
      } catch (error) {
        console.error('error:' + error);
      }
    };
    getTrending();
  }, []);

  return (
    <List>
      {trending.map(trend => (
        <li key={trend.id}>
          <ListLink to={`movies/${trend.id}`}>
            <img
              width="200"
              height="300"
              src={`https://image.tmdb.org/t/p/w500/${trend.poster_path || ''}`}
              alt=""
            />
            <Title>{trend.original_title}</Title>
          </ListLink>
        </li>
      ))}
    </List>
  );
};
