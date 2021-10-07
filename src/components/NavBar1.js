import React from "react";

const Navbar = ({ title }) => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">
        {title}
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">
              Nyeh
            </a>
          </li>
        </ul>
        {/* <span class="navbar-text">Navbar text with an inline element</span> */}
        <button class="btn btn-primary my-2 my-sm-0" type="submit">
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
