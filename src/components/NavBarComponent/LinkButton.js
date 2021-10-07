import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


//ColorBef indicates color before hover, colorAf indicates color after hover
const LinkButton = ({ def, active, children, dest, addClass, onClick }) => {
    console.log(active)
    const colorBef = active ? "text-gray-50" : "text-gray-200";
    const colorAf = active ? "bg-gray-700" : "hover:bg-gray-600 bg-gray-800";

    return (
        <Link className={[colorBef, colorAf, addClass,
            " px-3 py-2 rounded-md text-sm font-medium  ease-out transition duration-300 transform"].join(' ')}
            to={dest} onClick={onClick}>{children}</Link>
    )

}
LinkButton.defaultProps = {
    def: true
}

LinkButton.propTypes = {
    dest: PropTypes.string.isRequired,
    children: PropTypes.string
}



export default LinkButton
