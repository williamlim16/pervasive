import React from 'react'
import { Link } from 'react-router-dom'

function MenuTitle({ menuOpen, colorBef, colorAf }) {
    return (
        <div className="flex items-center justify-between">
            <Link to="/" className={`transform hover:scale-125 ease-out font-bold ${colorBef} transition duration-300 text-xl md:text-2xl ${colorAf}`}
            >UMNLP</Link>

            <div onClick={menuOpen} className="flex md:hidden">

                <button type="button"
                    className="text-gray-200 hover:text-gray-400 focus:outline-none focus:text-gray-400"
                    aria-label="toggle menu">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                        <path
                            d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z">
                        </path>
                    </svg>
                </button>
            </div>
        </div >

    )
}

MenuTitle.defaultProps = {
    colorBef: "text-gray-200",
    colorAf: "hover:text-indigo-400"
}


export default MenuTitle
