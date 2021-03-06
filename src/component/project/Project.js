import React, {Component} from 'react';
import * as config from '../../config/config';
import {createData, updateData} from '../../service/projectmanager';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from 'date-fns/addDays';
import '../project/Project.css';
import Manager from '../search/SearchUser';
import ProjectList from '../project/ProjectList';

export default class Project extends Component{

    constructor(props){
        super(props);
        this.state = {
            allProject: [],
            projectName : "",
            priority: 0,
            startDate : null,
            endDate: null,
            managerId: "",
            isChecked: false,
            isEditBtnClicked: false,
            projectId: ""
            }
        this.updateUser = React.createRef();
    }

    updateProjectName = (e) => {
        this.setState({projectName: e.target.value})
    }

    updatePriority = (e) => {
        this.setState({priority: e.target.value})
    }

    updateStartDate = date => {
        this.setState({startDate: date})
    }

    updateEndDate = date => {
        this.setState({endDate: date})
    }

    updateProjectProperties = (e,project) => {
        this.setState({
            projectName: project.projectName,
            isChecked: true,
            startDate: new Date(project.startDate),
            endDate: new Date(project.endDate),
            priority: project.priority,
            managerId: project.managerId,
            isEditBtnClicked: true,
            projectId: project.projectId
        })
       this.updateUser.current.updateUser(project.managerId)  
    }

    updateUserId = (e) => {
        if(e.target.value)
            this.setState({managerId: e.target.value});
        else
            this.setState({managerId: ""})
    }

    createProject = () => {
        const{projectName, startDate, endDate, priority,managerId} = this.state;
        if(projectName){
            const userPayload = {
                "projectName": projectName,
                "startDate": startDate,
                "endDate": endDate,
                "priority": priority,
                "managerId": managerId
            }
            createData(config.Project_Url, userPayload)
            this.setState({projectName: "", startDate: null, endDate: null, priority:0, managerId: ""}) 
            this.updateUser.current.resetUser();
        }
    }

    updateProject = () => {
        const{projectName, startDate, endDate, priority,managerId, projectId} = this.state;
        if(projectName){
            const userPayload = {
                "projectName": projectName,
                "startDate": startDate,
                "endDate": endDate,
                "priority": priority,
                "managerId": managerId,
                "projectId" : projectId
            }
            updateData(config.Project_Url, userPayload)
            this.setState({projectName: "", startDate: null, endDate: null, priority:0, managerId: ""}) 
            this.updateUser.current.resetUser();
        }
    }

    reset = () => {
        this.setState({ projectName : "",
        priority: 0,
        startDate : null,
        endDate: null, isChecked: false, managerId: "", isEditBtnClicked: false})
        this.updateUser.current.updateUser("");
    }

    enableDate = (e) => {
        const {isChecked} = this.state;
        if(!isChecked){
            this.setState({isChecked: true, startDate: new Date(), endDate: new Date()});
        }
        else
            this.setState({isChecked: false, startDate: null, endDate: null})
    }

    render(){
        const {projectName, priority, startDate, endDate,isChecked, isEditBtnClicked, allProject} = this.state;
    
        return(
            <div className="project-component-container">
                <table>
                    <body>
                    <tr>
                        <td>Project</td>
                        <td><input type="text" name="projectName" value={projectName} onChange={this.updateProjectName}></input></td>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox" checked={isChecked} name="setStartEndDate" onClick={this.enableDate}></input>
                            Set Start and End Date
                        </td>
                        <td>
                            <DatePicker selected={startDate} onChange={this.updateStartDate} selectsStart startDate={startDate} id="startDate" disabled={!isChecked}/>
                            <DatePicker selected={endDate} onChange={this.updateEndDate} selectsStart endDate={endDate} minDate={addDays(startDate, 1)} id="endDate" disabled={!isChecked}/>
                        </td>
                    </tr>    
                
                <tr>
                    <td>Priority:</td>
                    <td><input type="range" name="priority" min="0" max="30" value={priority} onChange={this.updatePriority}></input> {priority}</td>
                </tr>
                <tr>
                    <td sm="0"><label htmlFor="managerPid">Manager:</label></td>
                    <td sm="6"><Manager updateUserId={this.updateUserId} ref={this.updateUser} title="Search Manager"/></td>
                </tr>
              
               {
                !isEditBtnClicked ? <div className="add-reset-button-component">
                    <button onClick={this.createProject} style={{"top": "10%"}}> Add </button>
                    <button onClick= {this.reset}> Reset </button>
                </div>:
                <div className="add-reset-button-component">
                    <button onClick={this.updateProject} style={{"top": "10%"}}> Update </button>
                    <button onClick= {this.reset}> Cancel </button>
                </div>
}
                <hr className="boder-dotted"/>
                <ProjectList updateProjectProperties = {this.updateProjectProperties} updatedProject = {allProject}/>
            </body>
            </table>
            </div>          
        );
    }
}