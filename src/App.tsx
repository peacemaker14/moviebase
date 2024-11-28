import { Redirect, Route, Switch } from 'wouter';

import Layout from './components/Layout';
import NowPlayingPage from './pages/NowPlayingPage';
import PopularPage from './pages/PopularPage';
import TopRatedPage from './pages/TopRatedPage';
import UpcomingPage from './pages/UpcomingPage';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={() => <Redirect to="/now-playing" />} />
        <Route path="/now-playing" component={NowPlayingPage} />
        <Route path="/popular" component={PopularPage} />
        <Route path="/top-rated" component={TopRatedPage} />
        <Route path="/upcoming" component={UpcomingPage} />
      </Switch>
    </Layout>
  );
}

export default App;
