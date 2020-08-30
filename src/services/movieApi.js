import axios from "axios";
axios.defaults.baseURL = "https://api.themoviedb.org/3";
const key = "b3a36dd7a0ce5dd7581172574a44ab5f";

const fetchMovieTrends = () => {
  return axios(`/trending/movie/day?api_key=${key}`).then(
    (res) => res.data.results
  );
};
const fetchMovieDetails = (id) => {
  return axios(`/movie/${id}?api_key=${key}&language=en-US`).then(
    (res) => res.data
  );
};

const fetchMovieWithQuery = (searchQuery) => {
  return axios(`/search/movie?api_key=${key}&query=${searchQuery}`).then(
    (res) => res.data.results
  );
};

const fetchMovieCast = (id) => {
  return axios(`/movie/${id}/credits?api_key=${key}`).then(
    (res) => res.data.cast
  );
};

const fetchMovieReviews = (id) => {
  return axios(`/movie/${id}/reviews?api_key=${key}`).then(
    (res) => res.data.results
  );
};

export default {
  fetchMovieTrends,
  fetchMovieDetails,
  fetchMovieWithQuery,
  fetchMovieCast,
  fetchMovieReviews,
};
