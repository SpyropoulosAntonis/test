import { Container, Header, Segment, Image, Button } from 'semantic-ui-react';
import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';




const Home = () => {
    const rootStore = useContext(RootStoreContext);
    const { isLoggedIn, user } = rootStore.userStore
    const {openModal} =rootStore.modalStore
    return (


        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                {!isLoggedIn && !user &&
                    < Header as='h1' inverted>
                        <Image size='massive' src='/assets/logo.png' alt='logo'
                            style={{ marginBottom: 12 }} />
                    Reactivies
                </Header>
                }

                {!isLoggedIn && !user && (
                    <Fragment>
                        <Header as='h2' inverted content='Welcome to Reactivities' />
                        <Button onClick={()=>openModal(<LoginForm/>)} size='huge' inverted>
                            Login
                         </Button>
                        <Button onClick={()=>openModal(<RegisterForm/>)} size='huge' inverted>
                            Register
                         </Button>
                    </Fragment>
                )
                }

                {isLoggedIn && user &&
                    (
                        <Fragment>
                            <Image centered circular size='small' src={user.image || '/assets/user.png'} />
                            <Header as='h2' inverted content={`Welcome back ${user.displayName}`} />
                            <Button as={Link} to='/activities' size='huge' inverted>
                                Take me to the Activities!
                             </Button>
                        </Fragment>
                    )

                }

            </Container>
        </Segment >
    )
}

export default Home;