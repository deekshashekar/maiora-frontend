import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
import Landing from "./components/Landing";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/" exact>
          <div>
            <Landing />
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
