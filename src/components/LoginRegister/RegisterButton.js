import React from 'react'

export default function RegisterButton({ disabled, clearFields }) {
    const style = {
        default: 'w-auto rounded-lg text-md shadow-xl font-large text-white px-12 py-2',
        clear: disabled ? 'opacity-50 bg-gray-500' : 'opacity-100 bg-gray-500 hover:bg-gray-700',
        submit: disabled ? 'opacity-50 bg-purple-500' : 'opacity-100 bg-purple-500 hover:bg-purple-700'
    }
    return (
        <div className='flex items-center justify-center  md:gap-8 gap-4'>
            <input value="Clear" disabled={disabled} type="button" onClick={clearFields} className={`${style.default} ${style.clear}`} />
            <input value="Submit" disabled={disabled} type="submit" className={`${style.default} ${style.submit}`} />
        </div>

    )
}
