import React from 'react'
import { Link } from 'react-router-dom'

export default function Success({ success }) {
    return (
        <>
            <hr className="mb-6 border-t" />
            <div className="text-center">
                <Link className="inline-block text-md text-blue-500 align-baseline hover:text-blue-800"
                    to="/login">
                    {success}
                </Link>
            </div>
        </>
    )
}
