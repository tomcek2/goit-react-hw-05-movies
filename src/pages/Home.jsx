import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { List, ListLink, Title } from 'components/Styles.styled';

const BASE_URL = 'https://api.themoviedb.org/'
const API_KEY =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWNlODk4Njg1Y2Y3Y2YzYWU4OWE5YjY4NDBlNjU1OCIsInN1YiI6IjY1YzEzNDI1MDMxZGViMDE4M2YzYTUwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z0M1Gt0gZ7sp1cqOFs9beKTDiVHIn15JzYaDT_F6w7M';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: API_KEY,
  },
};

const Home = () => {
  const [trending, setTrending] = useState([]);

  const trendingSearch = `${BASE_URL}3/trending/movie/day?language=en-US`;

  useEffect(() => {
    const getTrending = async () => {
      try {
        const { data } = await axios(trendingSearch, options);
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

export default Home;
