import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import Home from "./pages/Home/Home";
import './App.css'
//color #30d484 green
function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route  path="/home" component={Home} />
    
      </div>
    </Router>
  );
}

export default App;
