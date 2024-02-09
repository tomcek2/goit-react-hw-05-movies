import React from 'react';
import { Trending } from '../pages/Trending';
import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { Movies } from 'pages/Movies';
import { MoviesDetails } from 'pages/MoviesDetails';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Trending />} />
        <Route path="/movies" element={<Movies />}></Route>
        <Route path="movies/:id" element={<MoviesDetails />} />
      </Route>
      <Route path="*" element={'Not Found'} />
    </Routes>
  );
};
