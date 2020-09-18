import React, { useEffect, useContext, Fragment } from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from '../../features/Navbar/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { LoadingComponent } from './LoadingComponent';
import activityStore from '../stores/activityStore';
import { observer } from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import { home } from '../../features/Home/home';
import ActivityForm from '../../features/activities/Forms/ActivityForm';
import ActivitiesDetails from '../../features/activities/details/ActivitiesDetails';




const App: React.FC<RouteComponentProps> = ({ location }) => {
  //Properties
  const activitystore = useContext(activityStore);
  //Methods   

  useEffect(() => {
    activitystore.loadingActivities();
  }, [activitystore])

  if (activitystore.loadingInitial) return <LoadingComponent inverted={true} content='Loading Reactivities' />
  return (
    <Fragment>
      <Route exact path='/' component={home} />
      <Route path={'/(.+)'} render={() => (
        <Fragment>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>

            <Route exact path='/activities' component={ActivityDashboard} />
            <Route exact path='/activities/:id' component={ActivitiesDetails} />
            <Route key={location.key} exact path={['/createActivity', '/manage/:id']} component={ActivityForm} />

            {/* < ActivityDashboard /> */}
          </Container>
        </Fragment>
      )} />

    </Fragment>
  );

}


export default withRouter(observer(App));
