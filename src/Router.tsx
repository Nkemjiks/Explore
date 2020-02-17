import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';

interface Props {};

const Router: React.SFC<Props>  = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={() => <LandingPage />}/>
      </Switch>
    </Router>
  );
}

export default Router;
