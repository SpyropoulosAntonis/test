import { Menu, Container, Button } from 'semantic-ui-react'
import React from 'react'
import {observer} from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';


const NavBar: React.FC = () => {
    //const activitystore = useContext(activityStore)
    //const {openCreateForm:OpenForm} = activitystore;
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
            </Container>

        </Menu>
    );
};

export default observer (NavBar)
