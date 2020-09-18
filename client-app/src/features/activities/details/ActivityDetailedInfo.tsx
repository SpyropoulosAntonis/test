import React from 'react'
import { Grid, Icon, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/Models/activity';

interface Iprop {
    activity : IActivity;
}

export const ActivityDetailedInfo:React.FC<Iprop> = (p) => {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width='1'>
                        <Icon size='large' color='teal' name='info' />
                    </Grid.Column>
                    <Grid.Column width='15'>
                        <p>{p.activity.description}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width='1'>
                        <Icon name='calendar' size='large' color='teal' />
                    </Grid.Column>
                    <Grid.Column width='15'>
                        <p>{p.activity.date.split('T')[0]}</p>
                    </Grid.Column>
                </Grid>
                </Segment>
                <Segment>
                <Grid verticalAlign='middle'>
                    <Grid.Column width='1'>
                        <Icon name='marker' size='large' color='teal' />
                    </Grid.Column>
                    <Grid.Column width='15'>
                        <p>{p.activity.city},{p.activity.venue}</p>
                    </Grid.Column>
                </Grid>
            </Segment>

        </Segment.Group>
    )
}

export default ActivityDetailedInfo;