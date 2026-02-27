import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ChangeEventHandler } from 'react'

type SelectOptionsProps = {
    value: string,
    optionName: string
}

type CustomInputProps = {
    name: string,
    id: string,
    type?: string,
    value: string,
    label: string,
    required: boolean
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    placeholder?: string,
    className?: string,
    selectOptions?: SelectOptionsProps[],
    min?: string,
    icon: IconDefinition,
}

const CustomInput: React.FC<CustomInputProps> = ({ name, label, id, type, value, required, onChange, placeholder, selectOptions, icon }) => {
    return (
        <div className='form-field' >
            <label htmlFor={name} className='form-label' >
                <FontAwesomeIcon icon={icon} className='mr-2' />
                <p> {label}</p>
            </label>
            {type ? <input type={type} name={name} value={value} id={id} required={required} onChange={onChange} placeholder={placeholder} className='form-input' /> : <select id={id} name={name} value={value} onChange={onChange} className='form-select' required={required} >
                {
                    selectOptions?.map((option, i) => {
                        return (
                            <option key={i} value={option.value} > {option.optionName} </option>
                        )
                    })
                }
            </select>}
        </div>
    )
}

export default CustomInput