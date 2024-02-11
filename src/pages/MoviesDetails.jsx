import { useAppContext } from 'components/AppContext';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Loader } from 'components/Loader';
import { Container, BackLink, Genres, AddInfo } from 'components/Styles.styled';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const MoviesDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      } catch (error) {
        console.error('error:' + error);
        setLoading(false);
      }
    };
    getMovieDetails();
  }, []);

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Container>
        <div>
          <BackLink to="" onClick={() => handleGoBack()}>
            Go back
          </BackLink>
          <img
            width="200"
            height="300"
            src={`https://image.tmdb.org/t/p/w500/${
              movieDetails.poster_path || ''
            }`}
            alt=""
          />
        </div>
        <div>
          <h1>
            {movieDetails.original_title}
            {` `}({new Date(movieDetails.release_date).getFullYear()})
          </h1>
          <p>User score: {Math.round(movieDetails.vote_average * 10)}%</p>
          <h2>Overview</h2>
          <p>{movieDetails.overview}</p>
          <h3>Genres</h3>

          <Genres>
            {genres.map(genre => (
              <p key={genre.id}>{genre.name}</p>
            ))}
          </Genres>
        </div>
      </Container>
      <AddInfo>
        <h3>Additional informations</h3>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </AddInfo>
      <Outlet />
    </>
  );
};
