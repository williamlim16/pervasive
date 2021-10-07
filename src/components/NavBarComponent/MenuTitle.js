import React from 'react'
import { Link } from 'react-router-dom'

function MenuTitle({ menuOpen, colorBef, colorAf, onClick }) {
    return (
        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <Link to="/" onClick={onClick} className={`transform hover:scale-125 ease-out font-bold ${colorBef} transition duration-300 text-xl md:text-2xl ${colorAf}`}>
                <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                    alt="Workflow"
                />
                <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                />
            </Link>
        </div>

    )
}

MenuTitle.defaultProps = {
    colorBef: "text-gray-200",
    colorAf: "hover:text-indigo-400"
}


export default MenuTitle
