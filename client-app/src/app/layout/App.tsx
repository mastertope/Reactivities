import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivitiesDashBoard from '../../features/activities/dashboard/ActivitiesDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {

  const location = useLocation();

  return (
    <Fragment>
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path='/activities' component={ActivitiesDashBoard} />
              <Route path='/activities/:id' component={ActivityDetails} />
              {/* place key below to allow instantiate/reset the component */}
              <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
              {/* {console.log(location.key)} */}
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
}

export default observer(App);
