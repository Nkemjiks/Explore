import React, {  useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { reducer, initialState, ThemeContext } from './helpers/theme/ThemContext';
import LandingPage from './components/LandingPage';

interface Props {};

const AppRouter: React.SFC<Props>  = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <ThemeContext.Provider value={value} >
      <Router>
        <Switch>
          <Route path="/" component={() => <LandingPage theme={state.theme}/>}/>
        </Switch>
      </Router>
    </ThemeContext.Provider>
  );
}

export default AppRouter;
