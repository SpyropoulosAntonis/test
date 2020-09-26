import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { Image, Item, Label, List, Segment } from 'semantic-ui-react'

export const ActivityDetailedSidebar = () => {
    return (
       <Fragment> 
           <Segment
           textAlign='center'
           style={{border:'none'}}
           attached='top'
           secondary
           inverted
           color='teal'
           >
               3 People Going
           </Segment>
            <Segment attached>
                <List relaxed divided>
                    <Item style={{position: 'Relative'}}>
                        <Label
                        style={{position : 'absolute'}}
                        color='orange'
                        ribbon='right'
                    >
                        Host
                    </Label>
                    <Image size='tiny' src={'/assets/user.png'} />
                    <Item.Content verticalAlign='middle'>
                        <Item.Header as= 'h3'>
                            <Link to={`#`}>Bob</Link>
                        </Item.Header>
                        <Item.Extra style={{color:'orange'}}> Following</Item.Extra>
                    </Item.Content>
                    </Item>

                    <Item style = {{positin : 'relative'}}>
                        <Image size='tiny' src={'/assets/user.png'} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='h3'>
                                <Link to={`#`}>Tom</Link>
                                                            </Item.Header>
                        <Item.Extra style={{color :'orange'}}>Following</Item.Extra>
                        </Item.Content>
                    </Item>

                    <Item style = {{positin : 'relative'}}>
                        <Image size='tiny' src={'/assets/user.png'} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='h3'>
                                <Link to={`#`}>Sally</Link>
                                                            </Item.Header>
                        <Item.Extra style={{color :'orange'}}></Item.Extra>
                        </Item.Content>
                    </Item>

                </List>
            </Segment>
       </Fragment>
    )
}

export default ActivityDetailedSidebar;