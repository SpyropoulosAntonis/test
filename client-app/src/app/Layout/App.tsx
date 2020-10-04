import React, { Fragment, useContext, useEffect } from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from '../../features/Navbar/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import ActivityForm from '../../features/activities/Forms/ActivityForm';
import ActivitiesDetails from '../../features/activities/details/ActivitiesDetails';
import NotFound from './NotFound';
import { observer } from 'mobx-react-lite';
import { ToastContainer } from 'react-toastify';
import LoginForm from '../../features/user/LoginForm';
import Home from '../../features/Home/home';
import { RootStoreContext } from '../stores/rootStore';
import { LoadingComponent } from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';




const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const {setAppLoaded,token,appLoaded}=rootStore.commonStore;
  const {getUser} = rootStore.userStore;

  useEffect(()=>{
    if (token)
    {
     getUser().finally(()=>setAppLoaded());
    }
    else 
    {
      setAppLoaded();
    }

  },[getUser,token,setAppLoaded])

  if(!appLoaded) return <LoadingComponent inverted content='Loading App...' ></LoadingComponent>

  return (
    <Fragment>
      <ModalContainer/>
      <ToastContainer position='bottom-right'/>
      <Route exact path='/' component={Home} />
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
               <Route exact path='/login' component={LoginForm}/>
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
