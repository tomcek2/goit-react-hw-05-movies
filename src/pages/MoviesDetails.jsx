import { Outlet, useParams, useLocation } from 'react-router-dom';
import React, { useState, useEffect, Suspense } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Loader } from 'components/Loader';
import { Container, BackLink, Genres, AddInfo } from 'components/Styles.styled';

const BASE_URL = 'https://api.themoviedb.org/';
const API_KEY =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWNlODk4Njg1Y2Y3Y2YzYWU4OWE5YjY4NDBlNjU1OCIsInN1YiI6IjY1YzEzNDI1MDMxZGViMDE4M2YzYTUwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z0M1Gt0gZ7sp1cqOFs9beKTDiVHIn15JzYaDT_F6w7M';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: API_KEY,
  },
};

const MoviesDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);

  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  const idSearch = `${BASE_URL}3/movie/${movieId}?language=en-US`;

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const { data } = await axios(idSearch, options);
        setMovieDetails(data);
        setGenres(data.genres);
        setLoading(false);
      } catch (error) {
        console.error('error:' + error);
        setLoading(false);
      }
    };
    getMovieDetails();
  }, []); // eslint-disable-line

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Container>
        <div>
          <BackLink to={backLinkHref}>Go back</BackLink>
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
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MoviesDetails;
