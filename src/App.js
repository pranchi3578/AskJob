import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Askjob from"./Components/Askjob/askjob.js";
import Home from"./Components/Home";
import Choice from "./Components/Choice/choice";


class App extends Component {
  constructor(props) {
    super(props);
   
  }

  componentDidMount() {}

  render() {
    return (
      
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Askjob} />
          <Route exact path="/SignUp" component={Home}/>     
          <Route exact path="/Choice" component={Choice}/>  
       </Switch>
      </BrowserRouter>
       
    );
  }
}

export default App;
