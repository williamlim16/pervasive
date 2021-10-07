import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Navbar from "./components/Navbar";
import Waves from "./components/Waves";
import WelcomePage from './components/WelcomePage';


function App() {
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
      </Switch>
    </Router>
  );
}

export default App;
