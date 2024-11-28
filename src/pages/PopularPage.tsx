import { useState } from 'react';

import CategoryPageContainer from '../components/CategoryPageContainer';
import MovieCardList from '../components/MovieCardList';
import { usePopularMovies } from '../hooks/movie';

const PopularPage = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isError, isLoading } = usePopularMovies(page);

  if (isLoading) return <p>Loading movies...</p>;
  if (isError) return <p>Error loading movies.</p>;

  return (
    <CategoryPageContainer title="Popular Movies">
      {data ? (
        <MovieCardList
          movies={data.results}
          totalPages={data.totalPages}
          currentPage={page}
          onPageChange={(page) => setPage(page)}
        />
      ) : null}
    </CategoryPageContainer>
  );
};

export default PopularPage;
