import React, {Component} from 'react';
import User from '../search/SearchUser';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from 'date-fns/addDays';
import '../task/task.css';
import SearchProject from '../search/SearchProject';

export default class CreateTask extends Component{

    state = {
        project: "",
        task: "",
        isParentTask: false,
        priority: 0,
        parentTask: "",
        startDate : new Date(),
        endDate: new Date(),
        userId: ""
    }

    updateProject = (e) => {
        this.setState({project: e.target.value})
    }

    updateTask = (e) => {
        this.setState({task: e.target.value})
    }

    updateStartDate = date => {
        this.setState({startDate: date})
    }

    updateEndDate = date => {
        this.setState({endDate: date})
    }

    updateUserId = (e) => {
        if(e.target.value)
            this.setState({userId: e.target.value});
        else
            this.setState({userId: ""})
    }

    updateParentTask = () => {
        const{isParentTask} = this.state;
        alert(isParentTask)
        if(!isParentTask)
            this.setState({isParentTask: true, startDate:null, endDate: null});
        else
            this.setState({isParentTask: false, startDate: new Date(), endDate: new Date()});
        
    }

    updatePriority = (e) => {
        this.setState({priority: e.target.value})
    }

    render(){
        const {project, task, startDate, endDate , isParentTask, priority} = this.state;
        return(
            <div className="task-container">
                <table>
                    <body>
                        <tr>
                            <td>Project:</td>
                            <td><SearchProject selectProject = {this.updateProject}/></td>
                        </tr>
                        <tr>
                            <td>Task:</td>
                            <td><input type="text" value={task} onChange={this.updateTask}></input></td>
                        </tr>
                        <tr><td></td><td><input type="checkbox" onClick={this.updateParentTask} checked={isParentTask}></input>Parent Task</td></tr>
                        <tr><td>Priority: </td> <td> <input type="range" min="0" max="30" defaultValue="0" disabled={isParentTask} value={priority} onChange={this.updatePriority}></input> {priority}</td></tr>
                        <tr><td>Parent Task</td> <td><input type="text"></input><button disabled={isParentTask} onClick={this.searchProject}>Search</button></td></tr>
                        <tr><td>Start Date</td>
                        <td><DatePicker selected={startDate} onChange={this.updateStartDate} selectsStart startDate={startDate} id="startDate" disabled={isParentTask}/>
                        End Date: <DatePicker selected={endDate} onChange={this.updateEndDate} selectsStart endDate={endDate} minDate={addDays(startDate, 1)} id="endDate" disabled={isParentTask}/> </td></tr>
                        <tr><td>User:</td><td><User updateUserId={this.updateUserId} title="Search User" isParentTask={isParentTask}/></td></tr>
                        <div className="container-flex right-task-container">
                            <button>Add</button>
                            <button>Reset</button></div>
                        </body>
                </table>
            </div>
        );
    }

}