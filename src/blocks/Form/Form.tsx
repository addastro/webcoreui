import React from 'react'
import { classNames } from 'webcoreui'
import {
    Button,
    Checkbox,
    Input,
    Radio,
    Select,
    Slider,
    Switch,
    Textarea
} from 'webcoreui/react'

import type { FormField, FormProps } from './form'

const Form = ({
    fields,
    gap,
    className,
    ...rest
}: FormProps) => {
    const classes = classNames([
        'grid',
        gap || 'md',
        className
    ])

    const renderField = (field: FormField) => {
        switch (field.type) {
            case 'button': return (
                <Button type="submit" {...(({ label, type, ...rest }) => rest)(field)}>
                    {field.label}
                </Button>
            )
            case 'checkbox': return <Checkbox {...field} />
            case 'radio': return <Radio {...field} />
            case 'select': return <Select {...field} />
            case 'slider': return <Slider {...field} />
            case 'switch': return <Switch {...field} />
            case 'textarea': return <Textarea {...field} />
            case 'group': return null
            default: return <Input {...field} />
        }
    }

    return (
        <form className={classes} {...rest}>
            {fields.map((field, index) => {
                if (field.type === 'group') {
                    return (
                        <div
                            key={index}
                            className={classNames(['grid', gap || 'md', `col-${field.fields.length}`])}
                        >
                            {field.fields.map(field => renderField(field))}
                        </div>
                    )
                }

                return renderField(field)
            })}
        </form>
    )
}

export default Form
