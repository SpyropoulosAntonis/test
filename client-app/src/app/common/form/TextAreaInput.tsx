import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { Form, FormFieldProps, Label } from 'semantic-ui-react'


interface Iprops extends FieldRenderProps<string , HTMLElement> , FormFieldProps {}

const TextAreaInput:React.FC<Iprops> = (p) => {
    return (
        <Form.Field error={p.meta.touched && !!p.meta.error} width={p.width}>
            <textarea rows={p.rows} {...p.input} placeholder={p.placeholder}  />
            {p.meta.touched && !!p.meta.error && 
            (
                <Label pointing color='red'>
                    {p.meta.error}
                </Label>
            )}
        </Form.Field>
    )
}

export default TextAreaInput
