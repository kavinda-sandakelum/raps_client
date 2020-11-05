import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";


import SignIn from "./components/signin.component"
import Home from "./components/home.component"




function App() {
  return (
      <Router>
          <div className="container">
          <Route path="/" exact component={Home}/>
          <Route path="/signin" component={SignIn}/>
          </div>
      </Router>
  );
}

export default App;
