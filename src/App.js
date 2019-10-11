import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Askjob from"./Components/Askjob/askjob.js";
import Home from"./Components/Home";
import Choice from "./Components/Choice/choice";
import InputWorker from "./Components/Input/inputWorker.js";
import Workerprofile from "./Components/profile/workerprofile.js"
import InputCtr from "./Components/Input/inputCtr";
import CtrProfile from "./Components/profile/ctrprofile.js";


class App extends Component {
  constructor(props) {
    super(props);
   
  }

  componentDidMount() {}

  render() {
    return (
      
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Workerprofile} />
          <Route exact path="/SignUp" component={Home}/>     
          <Route exact path="/Choice" component={Choice}/>
          <Route exact path="/InputWorker" component={InputWorker}/>  
          <Route exact path="/InputCtr" component={InputCtr}/>
          <Route exact path="/CtrProfile" component={CtrProfile}/>  

       </Switch>
      </BrowserRouter>
       
    );
  }
}

export default App;
