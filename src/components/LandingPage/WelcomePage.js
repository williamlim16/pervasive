import React from "react";
import TopTrashCanList from "../TopTrashCanList";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAPI } from "../../context/ApiContext";
import Hero from "./Hero";
import Features from "./Features";
import Team from "./Team";
import Footer from "./Footer";

function WelcomePage() {
  //Axios
  const [topTrashCans, setTopTrashCans] = useState([]);
  const { fetchTopTrashCans } = useAPI();

  useEffect(() => {
    async function fetchData() {
      const result = await fetchTopTrashCans();
      setTopTrashCans(result.data);
    }
    fetchData();
  }, []);

  return (
    <div className="container flex flex-col mb-10">
      <Hero />
      <Features />
      <Team />
      <Footer />
    </div>
  );
}

export default WelcomePage;
