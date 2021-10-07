import React from "react";

const Navbar = ({ title }) => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<a className="navbar-brand" href="#">
				{title}
			</a>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarText"
				aria-controls="navbarText"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarText">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item">
						<a className="nav-link" href="#">
							Nyeh
						</a>
					</li>
				</ul>
				{/* <span class="navbar-text">Navbar text with an inline element</span> */}
				<button className="btn btn-primary my-2 my-sm-0" type="submit">
					Login
				</button>
			</div>
		</nav>
	);
};

Navbar.defaultProps = {
	title: "Trash Separator",
};

export default Navbar;
