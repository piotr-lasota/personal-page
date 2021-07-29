import React, { useMemo } from 'react';
import { Route, Switch, useLocation } from 'react-router';
import { HOME, toMatchingDashboardLocation } from './routes';
import { Dashboard } from './components';
import LandingPage from './features/landingPage';

const App = (): JSX.Element => {
  const location = useLocation();

  const dashboardLocation = useMemo(
    () => toMatchingDashboardLocation(location.pathname),
    [location.pathname]
  );

  return (
    <Dashboard location={dashboardLocation} hideMenu>
      <Switch>
        <Route exact path={HOME.path}>
          <LandingPage />
        </Route>
      </Switch>
    </Dashboard>
  );
};

export default App;
