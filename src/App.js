import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Navbar from "./components/Navbar";
import Waves from "./components/Waves";
import WelcomePage from './components/WelcomePage';
import Register from './components/Register'
import { useEffect } from 'react'


function App() {
  useEffect(() => {
    document.body.className = 'bg-gray-100'
    document.title = "UMNLP";
  }, []);
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <WelcomePage />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
