import { useAppContext } from 'components/AppContext';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Review } from './Styles.styled';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const Reviews = () => {
  const { movieId } = useParams();
  const { options } = useAppContext();
  const [reviews, setReviews] = useState([]);

  const reviewsSearch = `${BASE_URL}3/movie/${movieId}/reviews`;

  useEffect(() => {
    const getReviews = async () => {
      try {
        const { data } = await axios(reviewsSearch, options);
        console.log(data.results);
        setReviews(data.results);
      } catch (error) {
        console.error('error:' + error);
      }
    };
    getReviews();
  }, [movieId]);

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
