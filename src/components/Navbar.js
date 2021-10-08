import React from 'react'
import { useState } from 'react'
import LinkButton from './NavBarComponent/LinkButton'
import Nav from './NavBarComponent/Nav'
import MenuTitle from './NavBarComponent/MenuTitle';
import { useAuth } from './../context/AuthContext';

export default function Navbar({ loggedIn }) {
    const [showMenu, setShowMenu] = useState(false)
    const [navActive, setNavActive] = useState([false, false])
    const { userLogout } = useAuth()

    async function logoutprocess() {
        await userLogout()
        setNavActive([false, false])
    }

    return (
        <Nav>
            <MenuTitle onClick={(() => { setNavActive([false, false]) })} menuOpen={() => setShowMenu(!showMenu)} />

            <div className={`${showMenu ? "flex" : "hidden"} flex-col mt-2 space-y-4 md:flex md:space-y-0 
            md:flex-row md:items-center md:space-x-10 md:mt-0`}>
                {loggedIn ?
                    <LinkButton active={navActive[0]} onClick={(() => { setNavActive([true, false]) })} dest="/profile">Profile</LinkButton> :
                    <LinkButton active={navActive[0]} onClick={(() => { setNavActive([true, false]) })} dest="/register">Register</LinkButton>
                }{loggedIn ?
                    <LinkButton active={navActive[1]} onClick={(() => { logoutprocess() })} dest="/logout" >Logout</LinkButton> :
                    <LinkButton active={navActive[1]} onClick={(() => { setNavActive([false, true]) })} dest="/login">Login</LinkButton>
                }
            </div>
        </Nav >
    )
}



