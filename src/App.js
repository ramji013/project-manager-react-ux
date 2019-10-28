import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import User from './component/user/User';
import Project from './component/project/Project';
import Home from './router/Home';
import CreateTask from './component/task/CreateTask';
import ViewTask from './component/task/ViewTask';

export default class App extends Component {
  render(){
    return (
     <div>
        <Router>
         <Home/>
         <Switch>
           <Route path="/addProject" component = {Project}/>
           <Route path="/addUser" component = {User}/>
           <Route path="/addTask" component = {CreateTask}/>
           <Route path="/viewTask" component = {ViewTask}/>
          </Switch>
        </Router>
     </div>
    );
  } 
}
