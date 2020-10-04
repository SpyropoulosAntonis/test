import React, { useContext, useEffect }  from 'react'
import { Grid} from 'semantic-ui-react'
import ActivityList from './ActivityList'
import {observer} from 'mobx-react-lite';
import { LoadingComponent } from '../../../app/Layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';


const ActivityDashboard: React.FC = () => {
    //const activitiestore = useContext(activityStore);
    //const { editMode , selectedActivity} = activitiestore;
 //Properties
 const rootStore = useContext(RootStoreContext);
 const {loadingInitial,loadingActivities} = rootStore.activitiesStore;
 //Methods   

 useEffect(() => {
   loadingActivities();
 }, [loadingActivities])

 if (loadingInitial) return <LoadingComponent inverted={true} content='Loading Reactivities' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width='6'>
               <h2>Activity filters</h2>
            </Grid.Column>
        </Grid>
    )
}

export default observer (ActivityDashboard)
