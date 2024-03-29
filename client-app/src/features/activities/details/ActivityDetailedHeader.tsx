import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import { Header, Item, Segment, Image, Button } from 'semantic-ui-react';
import { IActivity } from '../../../app/Models/activity';
import {format} from 'date-fns';


const activityImageStyle ={
    filter : 'brightness(30%)'
}

const activityImageTextStyle = {
    position :'absolute',
    bottom :'5%',
    left :'5%',
    width : '100%',
    height : 'auto',
    color : 'white'
}

interface Iprops 
{
    activity : IActivity;
}

export const ActivityDetailedHeader:React.FC<Iprops> = (p) => {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                <Image src={`/assets/categoryImages/${p.activity.category}.jpg`} fluid style={activityImageStyle} />
                <Segment basic style={activityImageTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={p.activity.title}
                                    style={{ color: 'white' }}
                                />
                                <p>{format(p.activity.date,'h:mm a PPPP')}</p>
                                <p>
                                    Hosted by Bob
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing   attached='bottom'>
                <Button color='teal'> Join Activity </Button>
                <Button> Cancel attendace</Button>
                <Button as={Link} to={`/manage/${p.activity.id}`} color='orange' floated='right'>
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>
    )
}
export default observer(ActivityDetailedHeader);