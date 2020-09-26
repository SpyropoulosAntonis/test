import React, { useState, useContext, useEffect } from 'react'
import { Segment, Form, Button, Grid } from 'semantic-ui-react'
import { ActivityFormValues} from '../../../app/Models/activity'
import { observer } from 'mobx-react-lite';
import activityStore from '../../../app/stores/activityStore';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/SelectInput';
import { category } from '../../../app/common/options/categoryOptions';
import DateInput from '../../../app/common/form/DateInput';
import { combineDateAndTime } from '../../../app/Util/Util';
import { v4 as uuid } from 'uuid';
import {combineValidators, composeValidators, hasLengthGreaterThan,isRequired} from 'revalidate';



const validate = combineValidators(
{
    title:isRequired({message:'Εισάγετε τίτλο'}) ,
    description : composeValidators (
        isRequired('Description'),
        hasLengthGreaterThan(4)({message:'Πληκτρολογίστε πάνω από 5 χαρακτήρες'})
    )(),
    category: isRequired('Category'),
    city:isRequired('City'),
    venue: isRequired('Venue'),
    date : isRequired('Date'),
    time: isRequired('Time')
    }
)

interface Iprops {
    id: string;
}

const ActivityForm: React.FC<RouteComponentProps<Iprops>> = (p) => {
    const activitystore = useContext(activityStore);
    const { submiting,createActivity, loadActivity,editActivity } = activitystore;
    const [loading,setLoading]=useState(false);
    const [activity, setActivity] = useState(new ActivityFormValues());



    useEffect(() => {
        if (p.match.params.id) {
            setLoading(true);
            loadActivity(p.match.params.id).then(
                (activity) => setActivity(new ActivityFormValues(activity)))
                .finally(()=>setLoading(false));
            }

    }, [loadActivity, p.match.params.id]);


    const handleFinalFormSubmit = (values: any) => {
        const dateAndTime = combineDateAndTime(values.date, values.time);
        const { date, time, ...activity } = values;
        activity.date = dateAndTime;
        if(!activity.id){
            let newActivity =
            {
                ...activity, id: uuid()
            };
            createActivity(newActivity);
            }
            else 
            {
                editActivity(activity);
            }
        console.log(activity);
    }
    return (
        <Grid>
            <Grid.Column width='10'>
                <Segment clearing >
                    <FinalForm
                        validate={validate}
                        initialValues={activity}
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit,invalid, pristine}) =>
                            (
                                <Form loading={loading}>
                                    

                                    <Field  component={TextInput} name='title' value={activity.title} placeholder='Title' />
                                    <Field component={TextAreaInput} name='description' value={activity.description} rows={2} placeholder='Description' />
                                    <Field component={SelectInput} options={category} name='category' value={activity.category} placeholder='Category' />
                                    <Form.Group widths='equal'>
                                        <Field component={DateInput} date={true} time={false} name='date' value={activity.date} placeholder='Date' />
                                        <Field component={DateInput} date={false} time={true} name='time' value={activity.time} placeholder='Time' />
                                    </Form.Group>

                                    <Field component={TextInput} name='city' value={activity.city} placeholder='City' />
                                    <Field component={TextInput} name='venue' value={activity.venue} placeholder='Venue' />
                                    <Button disabled={invalid || pristine } loading={submiting || loading} onClick={handleSubmit} floated='right' positive type='submit'>Submit</Button>
                                    <Button loading={loading} //onClick={() => cancelFormOpen()}
                                        onClick={activity.id ? () => p.history.push(`/activities/${activity.id}`): () => p.history.push('/activities')}
                                        floated='right' color='red'>Cancel</Button>
                                </Form>

                            )}
                    />


                </Segment>
            </Grid.Column>
        </Grid>

    )
}

export default observer(ActivityForm)
