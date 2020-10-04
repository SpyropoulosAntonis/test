import { FORM_ERROR } from 'final-form';
import React, { useContext } from 'react'
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { Button, Container, Form, Header } from 'semantic-ui-react';
import ErrorMessage from '../../app/common/form/ErrorMessage';
import TextInput from '../../app/common/form/TextInput';
import { IUserFormaValue } from '../../app/Models/User';
import { RootStoreContext } from '../../app/stores/rootStore';

const validate = combineValidators({
    email: isRequired({ message: 'Please insert email' }),
    password: isRequired({ message: 'Please insert password' })
})

const LoginForm = () => {
    const rootstore = useContext(RootStoreContext);
    const { login } = rootstore.userStore;
    

    return (
       
            <FinalForm
                onSubmit={(values: IUserFormaValue) => login(values).catch(error => ({
                    [FORM_ERROR]: error
                })
                )}
                validate={validate}
                render={({ handleSubmit, submitting,invalid, pristine, submitError, dirtySinceLastSubmit }) =>
                    (
                    
                        <Container  textAlign='center' fluid >
                            <Header as='h1'  content='Login to Reactivities' color='teal'  />
                            <Form onSubmit={handleSubmit} error>
                                <Field component={TextInput} name='email' placeholder='email' />
                                <Field component={TextInput} name='password' placeholder='password' type='password' />
                                {submitError && !dirtySinceLastSubmit && (<ErrorMessage error={submitError} text='Invalid email or Password'/>)
                                }
                                <br></br>
                                <Button disabled={(invalid || pristine) && !dirtySinceLastSubmit} color='teal' content='Login' loading={submitting}
                                 fluid icon='lock'/>
                                {/* {<pre>{JSON.stringify(form.getState(), null, 2)}</pre>} */}

                                {/* <pre>{JSON.stringify(user, null, 2)}</pre>
                                <pre>{JSON.stringify(window.localStorage.getItem('jwt'), null, 2)}</pre>
                                <pre>{JSON.stringify(token, null, 2)}</pre> */}
                            </Form>
                        </Container>
                        

                    )}
            />
           
            
        
    )
}

export default LoginForm
