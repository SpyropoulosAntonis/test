import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { Form, FormFieldProps,Label, } from 'semantic-ui-react'
import { DateTimePicker } from 'react-widgets'
//import DateTimePicker from 'react-widgets/lib/DateTimePicker';

interface Iprops extends FieldRenderProps<Date , HTMLElement> , FormFieldProps {}

const DateInput:React.FC<Iprops> = (p) => {
    return (
        <Form.Field error={p.meta.touched && !!p.meta.error}  width={p.width}>
           <DateTimePicker 
           
           placeholder={p.placeholder}
           value={p.input.value || null}
           onChange={p.input.onChange}
           onBlur={p.input.onBlur}
           onKeyDown={(e)=>e.preventDefault()}
           date={p.date}
           time={p.time}
           {...p.rest}
           />
            {p.meta.touched && p.meta.error && 
            (
                <Label pointing color='red'>
                    {p.meta.error}
                </Label>
            )}
        </Form.Field>
    )
}

export default DateInput
