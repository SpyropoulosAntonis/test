import { FORM_ERROR } from 'final-form';
import React, {  useContext } from 'react'
import { Form as FinalForm, Field } from 'react-final-form';
//import { combineValidators ,isRequired} from 'revalidate';
import { Button, Container, Form, Header } from 'semantic-ui-react';
import ErrorMessage from '../../app/common/form/ErrorMessage';
import TextInput from '../../app/common/form/TextInput';
import { IUserFormaValue } from '../../app/Models/User';
import { RootStoreContext } from '../../app/stores/rootStore';


// const validate = combineValidators({
//     username: isRequired({ message: 'Please insert username' }),
//     email: isRequired({ message: 'Please insert email' }),
//     password: isRequired({ message: 'Please insert password' }),
//     displayname: isRequired({ message: 'Please insert Display Name' }),
    
// })

const RegisterForm = () => {
    const rootstore = useContext(RootStoreContext);
    const { register } = rootstore.userStore;
   

    return (

        <FinalForm
            onSubmit={(values: IUserFormaValue) => register(values).catch(error => ({
                [FORM_ERROR]: error
            })
            )}
           // validate={validate}
            render={({ handleSubmit, submitting, form, invalid, pristine, submitError, dirtySinceLastSubmit }) =>
                (

                    <Container textAlign='center' fluid >
                        <Header as='h1' content='Register to Reactivities' color='teal' />
                        <Form onSubmit={handleSubmit} error>
                            <Field component={TextInput} name='email' placeholder='email' />
                            <Field component={TextInput} name='username' placeholder='username' />
                            <Field component={TextInput} name='displayname' placeholder='Display Name' />
                            <Field component={TextInput} name='password' placeholder='password' type='password' />
                            {submitError && !dirtySinceLastSubmit && (<ErrorMessage error={submitError} text={JSON.stringify(submitError.data.errors)} />)
                            }
                            <br></br>
                            <Button disabled={(invalid || pristine) && !dirtySinceLastSubmit} color='teal' content='Register' loading={submitting}
                                fluid icon='lock' />
                            {/* <pre>{JSON.stringify(form.getState(), null, 2)}</pre> */}

                            {/* <pre>{JSON.stringify(user, null, 2)}</pre>
                                <pre>{JSON.stringify(window.localStorage.getItem('jwt'), null, 2)}</pre>
                                <pre>{JSON.stringify(token, null, 2)}</pre> */}
                        </Form>
                    </Container>


                )}
        />



    )
}

export default RegisterForm
