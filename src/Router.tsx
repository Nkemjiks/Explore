import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemesProvider } from './helpers/theme/ThemeContext';
import LandingPage from './components/LandingPage';

const AppRouter: React.SFC = () => {
  return (
    <ThemesProvider>
      <Router>
        <Switch>
          <Route path="/" component={() => <LandingPage />}/>
        </Switch>
      </Router>
    </ThemesProvider>
  );
}

export default AppRouter;
