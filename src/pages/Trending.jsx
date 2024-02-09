import { React } from 'react';
import { Link } from 'react-router-dom';

import { useAppContext } from 'components/AppContext/AppContext';

export const Trending = () => {
  const { trending, setMovieId } = useAppContext();

  const handleClick = id => {
    setMovieId(id);
    console.log(id);
  };

  return (
    <ul>
      {trending.map(trend => (
        <li key={trend.id}>
          <Link to={`movies/${trend.id}`} onClick={() => handleClick(trend.id)}>
            {trend.original_title}
          </Link>
          <img src={trend.poster_path} width="20px" height="30px" alt="" />
        </li>
      ))}
    </ul>
  );
};
