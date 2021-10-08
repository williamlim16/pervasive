import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Navbar from "./components/Navbar";
import WelcomePage from './components/WelcomePage';
import Register from './components/Register'
import { useEffect, useState } from 'react'
import { useAuth } from './context/AuthContext';
import UserDashboard from './components/UserDashboard';


function App() {
  useEffect(() => {
    document.body.className = 'bg-gray-100'
    document.title = "Trash Sorter";
  }, []);
  const [loggedIn, setLoggedIn] = useState()
  const { checkUserLogin } = useAuth()

  useEffect(() => {
    async function setLogin() {
      const data = await checkUserLogin()
      setLoggedIn(data)
    }
    setLogin()
  }, [checkUserLogin])
  return (
    <Router>
      <Navbar loggedIn={loggedIn} />
      <Switch>
        <Route path="/" exact>
          {loggedIn ? <UserDashboard /> : <WelcomePage />}
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
