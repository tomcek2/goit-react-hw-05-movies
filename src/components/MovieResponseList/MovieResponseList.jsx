import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAppContext } from 'components/AppContext/AppContext';

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
      } catch (error) {
        console.error('error:' + error);
      }
    };
    getTitleList();
  }, [title]);

  return (
    <ul>
      {searchResponse.map(finds => (
        <li key={finds.id}>
          <Link to={`${finds.id}`}>{finds.original_title}</Link>
          <img src={finds.poster_path} width="20px" height="30px" alt="" />
        </li>
      ))}
    </ul>
  );
};
