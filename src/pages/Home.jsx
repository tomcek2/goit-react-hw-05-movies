import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useAppContext } from 'components/AppContext/AppContext';

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
    <ul>
      {trending.map(trend => (
        <li key={trend.id}>
          <Link to={`movies/${trend.id}`}>{trend.original_title}</Link>
          <img src={trend.poster_path} width="20px" height="30px" alt="" />
        </li>
      ))}
    </ul>
  );
};
