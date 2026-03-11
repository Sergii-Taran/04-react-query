import axios from 'axios';
import type { Movie } from '../types/movie';

export interface FetchMoviesResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

const API = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

export const fetchMovies = async (
  query: string,
  page: number
): Promise<FetchMoviesResponse> => {
  const { data } = await API.get<FetchMoviesResponse>('/search/movie', {
    params: {
      query,
      page,
    },
  });

  return data;
};
