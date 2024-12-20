import { useState } from 'react';

import CategoryPageContainer from '../../components/category-page-container';
import MovieCardList from '../../components/movie-card-list';
import { useNowPlayingMovies } from '../../hooks/movie';

const NowPlayingPage = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isError, isLoading } = useNowPlayingMovies(page);

  if (isLoading) return <p>Loading movies...</p>;
  if (isError) return <p>Error loading movies.</p>;

  return (
    <CategoryPageContainer title="Now Playing Movies">
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

export default NowPlayingPage;
