import React, {Component} from 'react';
import {Link} from 'react-router-dom'

const navStyle = {
    color: 'white'
}

export default class Home extends Component{
    
    render(){
    return (
        <nav className="nav-tag">
            <ul className="nav-links">
                <li><Link style={navStyle} to="/addProject">Add Project</Link></li>
                <li><Link style={navStyle} to="/addTask">Add Task</Link></li>
                <li><Link style={navStyle} to="/addUser">Add User</Link></li>
                <li><Link style={navStyle} to="/viewTask">View Task</Link></li>
            </ul>
        </nav>
    );
}
}
