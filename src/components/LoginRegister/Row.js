import React, { Children } from 'react'

export default function Row({ children }) {
    const numRows = Children.count(children)
    let styling
    if (numRows > 1) {
        styling = "lg:flex lg:justify-between"
    }
    return (
        <div className={styling}>
            {children}
        </div>
    )
}
