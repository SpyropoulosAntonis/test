import React, { Fragment } from 'react'
import { Header, Form, Button, Comment, Segment } from 'semantic-ui-react';


const HeaderStyle = {
    border: 'none'
}


export const ActivityDetailedChat = () => {
    return (
        <Fragment>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={HeaderStyle}
            >
                <Header>Chat about this event</Header>
            </Segment>
            <Segment attached>
                <Comment.Group>
                    <Comment>
                        <Comment.Avatar src='/assets/user.png' />
                        <Comment.Content>
                            <Comment.Author as='a'>Matt</Comment.Author>
                            <Comment.Metadata>
                                <div>Today at 5:42PM</div>
                            </Comment.Metadata>
                            <Comment.Text>How artistic!</Comment.Text>
                            <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>
                    <Comment>
                        <Comment.Avatar src='/assets/user.png' />
                        <Comment.Content>
                            <Comment.Author as='a'>Elliot Fu</Comment.Author>
                            <Comment.Metadata>
                                <div>Yesterday at 12:30AM</div>
                            </Comment.Metadata>
                            <Comment.Text>
                                <p>This has been very useful for my research. Thanks as well!</p>
                            </Comment.Text>
                            <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>
                    <Form reply>
                        <Form.TextArea />
                        <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                    </Form>
                </Comment.Group>
            </Segment>
        </Fragment>
    )
}
export default ActivityDetailedChat;