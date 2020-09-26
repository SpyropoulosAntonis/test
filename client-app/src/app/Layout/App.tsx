import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from '../../features/Navbar/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import { home } from '../../features/Home/home';
import ActivityForm from '../../features/activities/Forms/ActivityForm';
import ActivitiesDetails from '../../features/activities/details/ActivitiesDetails';
import NotFound from './NotFound';
import { observer } from 'mobx-react-lite';
import { ToastContainer } from 'react-toastify';




const App: React.FC<RouteComponentProps> = ({ location }) => {
 
  return (
    <Fragment>
      <ToastContainer position='bottom-right'/>
      <Route exact path='/' component={home} />
      <Route path={'/(.+)'} render={() => (
        <Fragment>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Switch>
              <Route exact path='/activities' component={ActivityDashboard} />
              <Route  path='/activities/:id' component={ActivitiesDetails} />
              <Route 
              key={location.key} 
              path={['/createActivity', '/manage/:id']}
               component={ActivityForm} />
              <Route component={NotFound} />
            </Switch>

            {/* < ActivityDashboard /> */}
          </Container>
        </Fragment>
      )} />

    </Fragment>
  );

};


export default withRouter(observer(App));
