import React, { useState, FormEvent, useContext, useEffect } from 'react'
import { Segment, Form, Button, Grid } from 'semantic-ui-react'
import { IActivity } from '../../../app/Models/activity'
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import activityStore from '../../../app/stores/activityStore';
import { RouteComponentProps } from 'react-router-dom';

interface Iprops {
    id: string;
}

const ActivityForm: React.FC<RouteComponentProps<Iprops>> = (p) => {
    const activitystore = useContext(activityStore);
    const { createActivity, editActivity, submiting, selectedActivity, loadActivity, clearActivity } = activitystore;

    // const initializeForm = () => {

    //     if (selectedActivity) {

    //         return selectedActivity;
    //     }
    //     else {
    //         return {
    //             id: '',
    //             title: '',
    //             description: '',
    //             category: '',
    //             date: '',
    //             city: '',
    //             venue: ''
    //         };

    //     }
    // };

    const [activity, setActivity] = useState<IActivity>({
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    })


    useEffect(() => {
        if (p.match.params.id && activity.id.length === 0) {
            loadActivity(p.match.params.id).then(
                () => selectedActivity && setActivity(selectedActivity));
        }
        return () => {
            clearActivity()
        }
    }, [loadActivity, clearActivity, selectedActivity, p.match.params.id, activity.id.length]);

    const handleInputChange = (event: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>) => {
        console.log(event.currentTarget.value);
        setActivity({ ...activity, [event.currentTarget.name]: event.currentTarget.value })
    }
    const handleSubmit = () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(() => {
                p.history.push(`/activities/${newActivity.id}`)
            });
        }
        else {
            editActivity(activity).then(() => {
                p.history.push(`/activities/${activity.id}`)
            });
        }
    }
    return (
        <Grid>
            <Grid.Column width='10'>
                <Segment clearing >
                    <Form>
                        <Form.Input onChange={handleInputChange} name='title' value={activity.title} placeholder='Title' />
                        <Form.TextArea onChange={handleInputChange} name='description' value={activity.description} rows={2} placeholder='Description' />
                        <Form.Input onChange={handleInputChange} name='category' value={activity.category} placeholder='Category' />
                        <Form.Input onChange={handleInputChange} name='date' value={activity.date} type='DateTime-local' placeholder='Date' />
                        <Form.Input onChange={handleInputChange} name='city' value={activity.city} placeholder='City' />
                        <Form.Input onChange={handleInputChange} name='venue' value={activity.venue} placeholder='Venue' />
                        <Button loading={submiting} onClick={handleSubmit} floated='right' positive type='submit'>Submit</Button>
                        <Button //onClick={() => cancelFormOpen()}
                            onClick={() => p.history.push('/activities')}
                            floated='right' color='red'>Cancel</Button>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>

    )
}

export default observer(ActivityForm)
