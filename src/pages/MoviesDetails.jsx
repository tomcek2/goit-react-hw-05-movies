import { useAppContext } from 'components/AppContext/AppContext';
import { Outlet, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const MoviesDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState([]);
  const [genres, setGenres] = useState([]);
  const { options } = useAppContext();

  const idSearch = `${BASE_URL}3/movie/${movieId}?language=en-US`;

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const { data } = await axios(idSearch, options);
        console.log(data);
        setMovieDetails(data);
        setGenres(data.genres);
      } catch (error) {
        console.error('error:' + error);
      }
    };
    getMovieDetails();
  }, []);

  return (
    <>
      <div>
        <img
          width="100"
          height="150"
          src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
          alt=""
        />
        <div>
          <h1>
            "{movieDetails.original_title}" ({movieDetails.release_date})
          </h1>
          <p>User score: {movieDetails.vote_average}</p>
          <h2>Overview</h2>
          <p>{movieDetails.overview}</p>
          <h3>Genres</h3>

          <div>
            {genres.map(genre => (
              <p key={genre.id}>{genre.name}</p>
            ))}
          </div>
        </div>
        <ul>
          <h3>Additional informations</h3>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </>
  );
};
