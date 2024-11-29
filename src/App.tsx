import { Redirect, Route, Switch } from 'wouter';

import Layout from './components/layout';
import MovieDetailPage from './pages/movie-detail-page';
import NowPlayingPage from './pages/now-playing-page';
import PopularPage from './pages/popular-page';
import TopRatedPage from './pages/top-rated-page';
import UpcomingPage from './pages/upcoming-page';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={() => <Redirect to="/now-playing" />} />
        <Route path="/now-playing" component={NowPlayingPage} />
        <Route path="/popular" component={PopularPage} />
        <Route path="/top-rated" component={TopRatedPage} />
        <Route path="/upcoming" component={UpcomingPage} />
        <Route path="/movie/:id" component={MovieDetailPage} />
      </Switch>
    </Layout>
  );
}

export default App;
