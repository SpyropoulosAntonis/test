import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { Form, FormFieldProps, Label, Select } from 'semantic-ui-react'


interface Iprops extends FieldRenderProps<string, HTMLElement>, FormFieldProps { }

const SelectInput: React.FC<Iprops> = (p) => {
    return (
        <Form.Field error={p.meta.touched && !!p.meta.error} width={p.width}>
            <Select
                value={p.input.value}
                onChange={(e, data) => p.input.onChange(data.value)}
                placeholder={p.placeholder}
                options={p.options} />
            {p.meta.touched && !!p.meta.error &&
                (
                    <Label pointing color='red'>
                        {p.meta.error}
                    </Label>
                )}
        </Form.Field>
    )
}

export default SelectInput