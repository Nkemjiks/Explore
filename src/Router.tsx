import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemesProvider } from './helpers/theme/ThemeContext';
import LandingPage from './components/LandingPage';
import SearchResults from './components/SearchResults';
import NotFound from './components/NotFound';

const AppRouter: React.SFC = () => {
  return (
    <ThemesProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={() => <LandingPage />}/>
          <Route exact path="/search" component={() => <SearchResults /> }/>
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </ThemesProvider>
  );
}

export default AppRouter;
