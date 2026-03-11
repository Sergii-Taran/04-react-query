import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import ReactPaginate from 'react-paginate';

import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';

import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

import css from './App.module.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query !== '',
    placeholderData: keepPreviousData,
  });

  const movies = data?.results ?? [];
  const totalPages = Math.min(data?.total_pages ?? 0, 500);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  useEffect(() => {
    if (data && data.results.length === 0) {
      toast.error('No movies found for your request.');
    }
  }, [data]);

  const pagination = totalPages > 1 && (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => setPage(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && !data && <Loader />}

      {isError && !isLoading && <ErrorMessage />}

      {pagination}

      {!isLoading && !isError && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}

      {pagination}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
