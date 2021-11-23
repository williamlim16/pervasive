import React from 'react'

export default function Grid({ children, size }) {
    return (
        <div className={`grid grid-cols-1 p-4 space-y-8 lg:gap-6 lg:space-y-0 ${size === "1" ? 'xl:grid-cols-1' : 'xl:grid-cols-2'}`}>
            {children}
        </div>
    )
}
