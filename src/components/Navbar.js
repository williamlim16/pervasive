import React from 'react'
import { useState } from 'react'
import LinkButton from './HeaderComp/LinkButton'
import Nav from './HeaderComp/Nav'
import MenuTitle from './HeaderComp/MenuTitle';
import { useAuth } from '../context/AuthContext'
import { useHistory } from "react-router-dom"

export default function Navbar() {
    const [showMenu, setShowMenu] = useState(false)
    const userName = false

    const { logout } = useAuth()


    return (
        <Nav>
            <MenuTitle menuOpen={() => setShowMenu(!showMenu)} />

            <div className={`${showMenu ? "flex" : "hidden"} flex-col mt-2 space-y-4 md:flex md:space-y-0 
            md:flex-row md:items-center md:space-x-10 md:mt-0`}>
                <LinkButton dest="/">Home</LinkButton>
                {userName ?
                    <LinkButton dest="/profile">{userName}</LinkButton> :
                    <LinkButton dest="/register">Register</LinkButton>
                }{userName ?
                    <LinkButton dest="/logout" onClick={() => removeUser()}>Logout</LinkButton> :
                    <LinkButton dest="/login">Login</LinkButton>
                }
            </div>
        </Nav >
    )
}



