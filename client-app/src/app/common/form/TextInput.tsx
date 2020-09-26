import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { Form, FormFieldProps,Label } from 'semantic-ui-react'


interface Iprops extends FieldRenderProps<string, HTMLElement>, FormFieldProps { }

const TextInput: React.FC<Iprops> = (p) => {
    return (
        <Form.Field  error={p.meta.touched && !!p.meta.error} type={p.type} width={p.width}>
            <input {...p.input} placeholder={p.placeholder} />
            {p.meta.touched && !!p.meta.error &&
                (
                    <Label pointing color='red'>
                        {p.meta.error}
                    </Label>
                )}

        </Form.Field>
    )
}

export default TextInput