import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import welcomeScreen from "../frontend/screens/welcomeScreen";
import loginScreen from "../frontend/screens/loginScreen";
import registerScreen from "../frontend/screens/registerScreen";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/" component={welcomeScreen} />
          <Route path="/login" component={loginScreen} />
          <Route path="/register" component={registerScreen} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
