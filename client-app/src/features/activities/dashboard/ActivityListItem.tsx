
import { format } from 'date-fns';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Button, Icon, Item,Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/Models/activity';
import activityStore from '../../../app/stores/activityStore';

interface Iprops {
    activities: IActivity;
}

export const ActivityListItem: React.FC<Iprops> = ({ activities }) => {

    const activitystore = useContext(activityStore);
    const { deleteActivity, target, submiting } = activitystore;
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as='a'>{activities.title}</Item.Header>


                            <Item.Description>
                                Hosted by Antonis
                    </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Icon name='clock' /> {format(activities.date!,'h:mm a')}
                <Icon name='marker' /> {activities.venue},{activities.city}
            </Segment>
            <Segment secondary>
                Attendes will go here
            </Segment>
            <Segment clearing>
                <span> {activities.description}</span>
                <Button  //onClick={()=>selectActivity(activities.id)} 
                    as={Link} to={`/activities/${activities.id}`}
                    floated="right" color='blue'>View</Button>
                <Button name={activities.id} loading={submiting && target === activities.id} onClick={(e) => deleteActivity(e, activities.id)} floated='right' color='red'>Delete</Button>
            </Segment>
        </Segment.Group>

    )
}
