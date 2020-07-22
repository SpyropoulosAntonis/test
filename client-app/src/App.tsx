import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react'


class App extends Component {
  state = {
    Values: []
  }

  componentDidMount() {
    axios.get('https://localhost:44312/api/values').then((response) => {
      console.log(response);
      this.setState({
        Values: response.data
      })
    })
  }

  render() {
    return (
      <div>
        <Header as='h2'>
          <Icon name='plug' />
          <Header.Content>Reactivities</Header.Content>
        </Header>
        <List divided relaxed>
        {this.state.Values.map((test: any) => (
            <List.Item>
            <List.Icon name='github' size='large' verticalAlign='middle' />
            <List.Content>
              <List.Header as='a'>{test.id}</List.Header>
              <List.Description as='a'>{test.name}</List.Description>
            </List.Content>
          </List.Item>
          ))}
          
        </List>
       

      </div>
    );
  }
}


export default App;
