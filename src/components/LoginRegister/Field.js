import React, { forwardRef } from 'react'
const style = {
    dot: `text-red-500 pl-0.5`,
    error: `ring-red-500 ring-1`,
    disabled: `cursor-not-allowed`,
    label: 'block mb-2 text-md font-bold text-gray-700',
    errorMessage: `text-sm text-red-500 mt-2 mb-3`,
    checkboxLabel: `block overflow-hidden h-6 rounded-full bg-gray-300`,
    checkboxContainer: `relative w-10 mr-2 align-middle select-none mt-2`,
    iconContainer: `absolute flex border border-transparent left-0 top-0 h-full w-10`,
    icon: `flex items-center justify-center rounded-tl rounded-bl z-10 text-gray-400 text-lg h-full w-full`,
    checkbox: `checked:bg-blue-500 checked:right-0 focus:outline-none right-4 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer`,
    default: `text-base relative flex flex-1 w-full mt-1 rounded-md py-2 px-4 bg-white text-gray-700 placeholder-gray-400 text-base focus:outline-none focus:ring-1 focus:border-transparent border border-transparent`,
};

const LockIcon = (
    <svg
        height="20"
        width="20"
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 448 512"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" />
    </svg>
);

const Input = (
    { value, onChange, disabled, dot, error, label, name, type = 'text', iconSelect, ...rest },
    ref) => {
    let component;
    let icon;
    if (iconSelect === 'LockIcon') {
        icon = LockIcon
    }
    if (type !== 'checkbox' && type !== 'select' && type !== 'textarea') {
        component = (
            <div className="relative">
                <div className={style.iconContainer}>
                    <div className={style.icon}>{icon}</div>
                </div>
                <input
                    aria-required={dot}
                    aria-invalid={!!error}
                    className={`${style.default} ${icon ? 'pl-12' : ''}  
              ${error ? style.error : 'border-gray-300'} 
              ${disabled ? style.disabled : ''} `}
                    disabled={disabled}
                    id={name}
                    name={name}
                    type={type}
                    ref={ref}
                    onChange={onChange}
                    value={value}
                    {...rest}
                />
            </div>
        );
    }
    return (
        <>
            <label htmlFor={name} className={style.label}>
                {label}
            </label>
            {component}
            {error.length ?
                <div >
                    <p className={style.errorMessage}>{error}</p>
                </div>
                :
                <div className="mb-1">&nbsp;</div>
            }
        </>
    );
}
const Field = forwardRef(Input);

export default Field
