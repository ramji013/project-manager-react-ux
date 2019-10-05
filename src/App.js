import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import User from './component/User'
import Home from './router/Home'

export default class App extends Component {
  render(){
    return (
     <div>
        <Router>
         <Home/>
         <Switch>
           <Route path="/addUser" component = {User}/>
           </Switch>
        </Router>
     </div>
    );
  } 
}
