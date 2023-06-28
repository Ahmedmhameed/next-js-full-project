import React from 'react'
type Props = {
    type?: string,
    title: string,
    state: string,
    placeholder: string
    isTextarea: boolean
    setState: (value: string) => void,
}
function FormFiled(
    { type, title, state, placeholder, isTextarea, setState }: Props
) {
    return (
        <div className='flexStart flex-col w-full gap-4'>
            <label
                htmlFor={title}
                className='w-full text-gray-100'>
                {title}
            </label>
            {isTextarea ?
                (<textarea
                    id={title}
                    required
                    placeholder={placeholder}
                    value={state}
                    className='form_field-input'
                    onChange={(e) => setState(e.target.value)}
                ></textarea>) :
                (<input
                    type={type ?? "text"}
                    id={title}
                    required
                    placeholder={placeholder}
                    value={state}
                    className='form_field-input'
                    onChange={(e) => setState(e.target.value)}

                />)
            }
        </div>
    )
}

export default FormFiled
