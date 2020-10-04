import { AxiosResponse } from 'axios'
import React from 'react'
import { Message } from 'semantic-ui-react'

interface Iprops {
    error: AxiosResponse,
    text: string
}


const ErrorMessage: React.FC<Iprops> = (p) => {
    return (
        <Message error>
            <Message.Header>Error code :{p.error.status} </Message.Header>
            {p.error.data && Object.keys(p.error.data.errors).length > 0 &&
                (
                    <Message.List>
                        {Object.values(p.error.data.errors).flat().map((err, i) =>
                            (
                                <Message.Item key={i}> {err} </Message.Item>
                            ))}
                    </Message.List>
                )}
            {p.text && !p.error.data && <Message.Content content={p.text} />}
        </Message>
    )
}

export default ErrorMessage
