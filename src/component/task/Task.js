import React, {Component} from 'react';
import User from '../search/SearchUser';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from 'date-fns/addDays';
import '../task/task.css';
import SearchProject from '../search/SearchProject';
import SearchParentTask from '../search/SearchParentTask';
import {createData, updateData} from '../../service/projectmanager';
import * as config from '../../config/config';


export default class Task extends Component{

    constructor(props){
        super(props);
        this.state = {
            projectName: "",
            projectId: "",
            task: "",
            isParentTask: false,
            priority: 0,
            parentTask: "",
            startDate : new Date(),
            endDate: new Date(),
            userId: "",
            taskId: "" ,
            parentTaskId: "" ,
            parentTaskName: ""
        }
        this.updateProjectFromTask = React.createRef();
        this.populateParentTaskFromTask = React.createRef();
        this.showCurrentUser = React.createRef();
}
    componentDidMount(){
        const {taskData} = this.props;
        this.updateProjectFromTask.current.updateProjectFromTask(taskData);
        this.populateParentTaskFromTask.current.populateParentTaskFromTask(taskData);
        this.showCurrentUser.current.showCurrentUser(taskData);
        if(taskData){
        this.setState({
            projectName: taskData.projectName,
            projectId: taskData.projectId,
            task: taskData.taskName,
            taskId: taskData.taskId,
            priority: taskData.priority,
            startDate: taskData.startDate ? new Date(taskData.startDate): null,
            endDate: taskData.endDate ? new Date(taskData.endDate) : null,
            parentTaskId: taskData.parentTaskId,
            isParentTask: false,
            userId: taskData.userId,
            parentTaskName: taskData.parentTaskName,
        })
    }
    }
    
    updateProject = (e) => {
        this.setState({projectName: e.target.value, projectId: e.target.id})
    }

    taskChange = (e) => {
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

    updateTask = () => {
        const {projectId,projectName, task, isParentTask, priority, startDate, endDate, userId, parentTaskId,taskId} = this.state;
        if(projectId){
            const taskPayLoad = {
                "taskName" : task,
                "projectName": projectName,
                "projectId" : projectId,
                "isParentTask" : isParentTask,
                "priority": priority,
                "startDate": startDate,
                "endDate" : endDate,
                "userId" : userId,
                "parentTaskId" : parentTaskId,
                "taskId" : taskId
            }
            updateData(config.Task_Url, taskPayLoad);
            this.props.taskData.startDate = this.getDateFormat(startDate);
            this.props.taskData.endDate = this.getDateFormat(endDate);
            this.props.taskData.priority = priority;
            this.props.closeModal();
        }
    }

    getDateFormat = (date) => {
        var month = '' + date.getMonth(),
        day = '' + date.getDate(),
        year = '' + date.getYear()
        return [year, month, day].join('-');
    }   

    selectParentTask = (e) => {}

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

    createTask = (e) => {
        const {projectId,projectName, task, isParentTask, priority, startDate, endDate, userId} = this.state;
        if(projectId){
            const taskPayLoad = {
                "taskName" : task,
                "projectName": projectName,
                "projectId" : projectId,
                "isParentTask" : isParentTask,
                "priority": priority,
                "startDate": startDate,
                "endDate" : endDate,
                "userId" : userId
            }
            createData(config.Task_Url, taskPayLoad);

            this.setState({
                projectName: "",
                projectId: "",
                task: "",
                isParentTask: false,
                priority: 0,
                parentTask: "",
                startDate : new Date(),
                endDate: new Date(),
                userId: ""
            })
        }
    }

    render(){
        const {task, startDate, endDate , isParentTask, priority} = this.state;
        const{ isUpdate} = this.props;
        return(
            <div className="task-container">
                <table>
                    <body>
                        <tr>
                            <td>Project:</td>
                            <td><SearchProject selectProject = {this.updateProject} isParentTask={isUpdate} ref={this.updateProjectFromTask}/></td>
                        </tr>
                        <tr>
                            <td>Task:</td>
                            <td><input type="text" value={task} onChange={this.taskChange}></input></td>
                        </tr>
                        <tr><td></td><td><input type="checkbox" onClick={this.updateParentTask} checked={isParentTask}></input>Parent Task</td></tr>
                        <tr><td>Priority: </td> <td> <input type="range" min="0" max="30" defaultValue="0" disabled={isParentTask} value={priority} onChange={this.updatePriority}></input> {priority}</td></tr>
                        <tr><td>Parent Task:</td> <td><SearchParentTask selectParentTask = {this.selectParentTask} isParentTask={isParentTask || isUpdate} ref= {this.populateParentTaskFromTask}/></td></tr>
                        <tr><td>Start Date</td>
                        <td><DatePicker selected={startDate} onChange={this.updateStartDate} selectsStart startDate={startDate} id="startDate" disabled={isParentTask}/>
                        End Date: <DatePicker selected={endDate} onChange={this.updateEndDate} selectsStart endDate={endDate} minDate={addDays(startDate, 1)} id="endDate" disabled={isParentTask}/> </td></tr>
                        <tr><td>User:</td><td><User updateUserId={this.updateUserId} title="Search User" isParentTask={isParentTask} ref={this.showCurrentUser}/></td></tr>
                        { 
                            !isUpdate ?
                        <div>
                            <button onClick={this.createTask}>Add</button>
                            <button>Reset</button>
                        </div>:
                        <div>
                            <button onClick={this.updateTask}>Update</button>
                            <button onClick={()=> this.props.closeModal()}>Cancel</button>
                        </div>
                    }

                        </body>
                </table>
            </div>
        );
    }

}