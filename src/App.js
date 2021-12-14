import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Waves from "./components/Waves";
import WelcomePage from "./components/LandingPage/WelcomePage";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import React from "react";
import { useEffect, useState } from "react";
import Chart from "./components/Dashboard/Chart";
import { useAuth } from "./context/AuthContext";
import DashboardAdmin from "./components/Admin/DashboardAdmin";
import UserDashboard from "./components/UserDashboard";

function App() {
  useEffect(() => {
    document.body.className = "bg-gray-100";
    document.title = "Trash Sorter";
  }, []);
  const [loggedIn, setLoggedIn] = useState();
  const [admin, setAdmin] = useState(-1)
  const { checkUserLogin, checkAdmin } = useAuth();

  useEffect(() => {
    async function setLogin() {
      const data = await checkUserLogin();
      setLoggedIn(data);
    }
    setLogin();
  }, [checkUserLogin]);

  useEffect(() => {
    async function setAdminLogin() {
      if (loggedIn) {
        const adminValue = await checkAdmin();
        setAdmin(adminValue)
      }
    }

    setAdminLogin();

  }, [loggedIn])
  return (
    <Router>
      <Navbar loggedIn={loggedIn} />
      <Switch>
        <Route path="/" exact>
          {loggedIn ? (admin === 1 ? <DashboardAdmin /> : <UserDashboard />) : <WelcomePage />}
        </Route>
        <Route path="/login">
          {loggedIn ? <Redirect to="/" exact /> : <Login />}
        </Route>
        <Route path="/register">
          {loggedIn ? <Redirect to="/" exact /> : <Register />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
