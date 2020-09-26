import React, { useContext, useEffect }  from 'react'
import { Grid} from 'semantic-ui-react'
import ActivityList from './ActivityList'
import {observer} from 'mobx-react-lite';
import activityStore from '../../../app/stores/activityStore';
import { LoadingComponent } from '../../../app/Layout/LoadingComponent';


const ActivityDashboard: React.FC = () => {
    //const activitiestore = useContext(activityStore);
    //const { editMode , selectedActivity} = activitiestore;
 //Properties
 const activitystore = useContext(activityStore);
 //Methods   

 useEffect(() => {
   activitystore.loadingActivities();
 }, [activitystore])

 if (activitystore.loadingInitial) return <LoadingComponent inverted={true} content='Loading Reactivities' />

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
