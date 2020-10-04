import React, { useContext, useEffect } from 'react'
import {Grid} from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps} from 'react-router-dom'
import { LoadingComponent } from '../../../app/Layout/LoadingComponent'
import { ActivityDetailedHeader } from './ActivityDetailedHeader'
import { ActivityDetailedInfo } from './ActivityDetailedInfo'
import { ActivityDetailedChat } from './ActivityDetailedChat'
import { ActivityDetailedSidebar } from './ActivityDetailedSidebar'
import { RootStoreContext } from '../../../app/stores/rootStore'


interface Iprops {
  id: string;
}
const ActivitiesDetails: React.FC<RouteComponentProps<Iprops>> = (p) => {
  const rootStore = useContext(RootStoreContext);
  const { selectedActivity, loadActivity, loadingInitial } = rootStore.activitiesStore;

  useEffect(() => {
    loadActivity(p.match.params.id);

  }, [loadActivity, p.match.params.id])

  if (loadingInitial ) return <LoadingComponent content='Loading Details...' />
  
  if( !selectedActivity) return <h1>Activity not found</h1>
  
  return (
    <Grid>
      <Grid.Column width='10' >
        <ActivityDetailedHeader activity={selectedActivity}/>
        <ActivityDetailedInfo activity={selectedActivity} />
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width='6'>
        <ActivityDetailedSidebar />
      </Grid.Column>
    </Grid>
  )
}

export default observer(ActivitiesDetails)
