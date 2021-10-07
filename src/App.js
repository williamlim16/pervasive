import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import TopTrashCanList from "./components/TopTrashCanList";
import Waves from "./components/Waves";
import axios from "axios";

function App() {
  const adminUser = {
    email: "admin@admin.com",
    password: "admin123",
  };

  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  const Login = (details) => {
    console.log(details);
    if (
      details.email === adminUser.email &&
      details.password === adminUser.password
    ) {
      console.log("logged in!");
      setUser({
        name: details.name,
        email: details.email,
      });
    } else {
      console.log("does not match!");
    }
  };

  const Logout = () => {
    console.log("Logout");
  };

  //Axios
  const [topTrashCans, setTopTrashCans] = useState([]);

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios
      .get("http://localhost:8888/node/getTopTrashCans")
      .then((res) => {
        console.log("success");
        console.log(res);
        setTopTrashCans(res.data.data);
      })

      .catch((err) => {
        console.log("error");
        console.log(err.status);
        console.log(err.res.status);
      });

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  return (
    <div className="App">
      <Navbar />
      {/* <Waves /> */}
      <Welcome />

      <div className="container">
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <TopTrashCanList topTrashCans={topTrashCans} />
          </div>
        </div>
      </div>

      {/* {user.email != "" ? (
        <div className="welcome">
          <h2>
            Welcome, <span>{user.name}</span>{" "}
          </h2>
          <button>Logout</button>
        </div>
      ) : (
        <LoginForm Login={Login} error={error} />
      )} */}
    </div>
  );
}

export default App;
