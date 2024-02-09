import { useAppContext } from 'components/AppContext/AppContext';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const MoviesDetails = () => {
  const { id } = useParams();
  const { moviesDetails } = useAppContext();
  console.log(moviesDetails);
  return (
    <>
      <img
        src={`https://image.tmdb.org/t/p/w500${moviesDetails.poster_path}`}
        alt=""
      />
    </>
  );
};
