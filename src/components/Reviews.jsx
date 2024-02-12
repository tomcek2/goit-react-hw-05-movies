import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Review } from './Styles.styled';

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

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  const reviewsSearch = `${BASE_URL}3/movie/${movieId}/reviews`;

  useEffect(() => {
    const getReviews = async () => {
      try {
        const { data } = await axios(reviewsSearch, options);
        setReviews(data.results);
      } catch (error) {
        console.error('error:' + error);
      }
    };
    getReviews();
  }, [movieId]); // eslint-disable-line

  if (reviews.length === 0) {
    return <p>We don't hane any reviews for this movie.</p>;
  }
  return (
    <ul>
      {reviews.map(rev => (
        <Review key={rev.id}>
          <h3>Author: {rev.author}</h3>
          <p>{rev.content}</p>
        </Review>
      ))}
    </ul>
  );
};

export default Reviews;
