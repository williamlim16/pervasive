import React from 'react'

export default function Config({ title, id, children }) {
    return (
        <div className="mt-5 relative transition h-auto duration-500" id={id}>
            <h1 className="text-2xl text-gray-800 font-semibold inline">{title}</h1>
            <hr className="mt-2" />
            {children}
        </div>
    )
}
