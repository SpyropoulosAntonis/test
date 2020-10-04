import { Menu, Container, Button, Image, Dropdown } from 'semantic-ui-react'
import React, { useContext} from 'react'
import {observer} from 'mobx-react-lite';
import { Link, NavLink } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';


const NavBar: React.FC = () => {
    const rootstore = useContext(RootStoreContext)
    const {user,logout} = rootstore.userStore 
    
    return (
        <Menu fixed="top" inverted>
            <Container>
                <Menu.Item header exact as={NavLink} to='/'>
                    <img src="/assets/logo.png" alt="Logo" style={{marginRight:10}}/>
                    Reactivities   
                </Menu.Item>
                <Menu.Item name='Activities' exact as={NavLink} to='/activities' />
                <Menu.Item>
                <Button //onClick={()=>OpenForm()}
                    exact as={NavLink} to='/createactivity'
                 positive content='Create Activity' />
                </Menu.Item>
                {user && 
                <Menu.Item position='right'>
                    <Image avatar  spaced='right' src={user.image || '/assets/user.png'}/>    
                    <Dropdown pointing='top left' text={`${user.displayName}`}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profile/username`} text='My profile'
                            icon='user'/>
                            <Dropdown.Item onClick={logout}  text='Logout' icon='power'/>
                        </Dropdown.Menu>
                    </Dropdown>
                        </Menu.Item>}

            </Container>

        </Menu>
    );
};

export default observer (NavBar)
