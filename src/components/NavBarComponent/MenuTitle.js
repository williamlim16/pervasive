import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo";

function MenuTitle({ menuOpen, colorBef, colorAf, onClick }) {
	return (
		<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
			<Link
				to="/"
				onClick={onClick}
				className={`transform hover:scale-125 ease-out font-bold ${colorBef} transition duration-300 text-xl md:text-2xl ${colorAf}`}
			>
				<Logo />
			</Link>
		</div>
	);
}

MenuTitle.defaultProps = {
	colorBef: "text-gray-200",
	colorAf: "hover:text-indigo-400",
};

export default MenuTitle;
