import React from "react";
import { useState } from "react";
import LinkButton from "./NavBarComponent/LinkButton";
import Nav from "./NavBarComponent/Nav";
import MenuTitle from "./NavBarComponent/MenuTitle";
import { useHistory } from "react-router-dom";

export default function Navbar() {
	const [showMenu, setShowMenu] = useState(false);
	const userName = false;
	const [navActive, setNavActive] = useState([false, false]);
	console.log(navActive);

	return (
		<Nav>
			<MenuTitle
				onClick={() => {
					setNavActive([false, false]);
				}}
				menuOpen={() => setShowMenu(!showMenu)}
			/>

			<div
				className={`${
					showMenu ? "flex" : "hidden"
				} flex-col mt-2 space-y-4 md:flex md:space-y-0 
            md:flex-row md:items-center md:space-x-10 md:mt-0`}
			>
				{userName ? (
					<LinkButton
						active={navActive[0]}
						onClick={() => {
							setNavActive([true, false]);
						}}
						dest="/profile"
					>
						{userName}
					</LinkButton>
				) : (
					<LinkButton
						active={navActive[0]}
						onClick={() => {
							setNavActive([true, false]);
						}}
						dest="/register"
					>
						Register
					</LinkButton>
				)}
				{userName ? (
					<LinkButton
						active={navActive[1]}
						onClick={() => {
							setNavActive([false, true]);
						}}
						dest="/logout"
					>
						Logout
					</LinkButton>
				) : (
					<LinkButton
						active={navActive[1]}
						onClick={() => {
							setNavActive([false, true]);
						}}
						dest="/login"
					>
						Login
					</LinkButton>
				)}
			</div>
		</Nav>
	);
}
