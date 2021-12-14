import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Hero = () => {
  const [navActive, setNavActive] = useState([false, false]);

  return (
    <div className="flex flex-row content-center">
      <div className="bg-white h-screen flex flex-col justify-center items-center w-1/2">
        <div className="ml-10">
          <h1 className="lg:text-8xl md:text-7xl sm:text-5xl text-3xl font-black mb-5">
            Automatic Trash Sorter
          </h1>
          <h5 className="lg:text-4xl md:text-3xl sm:text-2xl text-2xl mb-14">
            Data to enrich your recylcing experience
          </h5>
        </div>
        <Link
          className="py-6 px-10 bg-blue-300 rounded-full text-3xl hover:bg-blue-400 transition duration-300 ease-in-out flex items-center"
          to="/register"
        >
          Get Started &nbsp;
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            ></path>
          </svg>
        </Link>
      </div>

      <div
        className="bg-cover w-1/2"
        style={{ backgroundImage: `url(/trash_can.jpg)` }}
      ></div>
    </div>
  );
};

export default Hero;
