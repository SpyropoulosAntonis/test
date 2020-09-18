import React, { Fragment, useContext } from 'react'
import { Item, Label, Segment } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import activityStore from '../../../app/stores/activityStore';
import { ActivityListItem } from './ActivityListItem';



const ActivityList: React.FC = () => {
    const activitystore = useContext(activityStore);
    const { activitiesByDate, } = activitystore;
    return (

        <Fragment>
            {activitiesByDate.map(([group, activities]) =>
                (
                    <Fragment key={group}>
                        <Label  size='large' color='blue'>
                            {group}
                        </Label>
                        
                            <Item.Group divided>
                                {activities.map((activities) =>
                                    (

                                        <ActivityListItem key={activities.id} activities={activities} />
                                    ))}


                            </Item.Group>
                       
                    </Fragment>
                ))}
        </Fragment>

    );
};

export default observer(ActivityList)
