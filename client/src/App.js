import React from 'react';
import './styles/main.css'
import Home from "./home";
import Temp_Comp from "./components/temp_comp";
import {Route,BrowserRouter as Router,Switch,Redirect} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Redirect exact from="/" to="/home"/>
            <Route exact path="/home"  component={Home}/>
            <Route exact path="/topic/:id" component={Temp_Comp}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
