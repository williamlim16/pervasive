import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


//ColorBef indicates color before hover, colorAf indicates color after hover
const LinkButton = ({ def, colorBef, colorAf, children, dest, addClass, onClick }) => {
    return (
        <Link className={def ? [colorBef, colorAf, addClass,
            "text-sm font-medium md:hover:scale-125 hover:scale-105 ease-out transition duration-300 transform"].join(' ') :
            [colorBef, colorAf, addClass,
                "px-4 py-1 text-sm font-medium text-center transition duration-300  sm:hover:scale-110 hover:scale-105 ease-out transform border rounded"].join(' ')}
            to={dest} onClick={onClick}>{children}</Link>
    )

}
LinkButton.defaultProps = {
    def: true,
    colorBef: "text-gray-200",
    colorAf: "hover:text-indigo-400"
}

LinkButton.propTypes = {
    dest: PropTypes.string.isRequired,
    children: PropTypes.string
}



export default LinkButton
