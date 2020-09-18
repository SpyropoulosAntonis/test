import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

interface Iprop 
{
    inverted? : boolean,
    content? : string 
}

export const LoadingComponent :React.FC<Iprop> = (p) => {
    return (
        <Dimmer active inverted={p.inverted}>
            <Loader content={p.content} />
        </Dimmer>
    )
}
