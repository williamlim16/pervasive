import React from 'react'

function Nav({ children }) {
    return (
        <div className=" bg-black">
            <nav className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
                {children}
            </nav>
        </div>
    )
}

export default Nav
