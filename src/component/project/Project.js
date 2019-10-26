import React, {Component} from 'react';
//import '../App.css';
import * as config from '../../config/config';
import {createData, updateData, deleteData} from '../../service/projectmanager';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from 'date-fns/addDays';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import '../project/Project.css';
import Manager from '../search/SearchUser';


export default class Project extends Component{

    constructor(props){
        super(props);
        this.state = {
            allProject: [],
            allUser: [],
            projectName : "",
            priority: 0,
            startDate : null,
            endDate: null,
            managerId: "",
            showModal : false,
            isChecked: false
            }
        this.resetUser = React.createRef();

    }
    

    componentWillMount(){
        axios.get(config.Project_Url).then(response => {
            this.setState({allProject: response.data})
        })
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

    updateUserId = (e) => {
        if(e.target.value)
            this.setState({managerId: e.target.value});
        else
            this.setState({managerId: ""})
    }

    createUser = () => {
        const{projectName, startDate, endDate, priority,managerId, allProject} = this.state;
        alert("projectName:" + projectName + " startDate: "+ startDate + " endDate: "+ endDate + "priority: " + priority + " managerid: " + managerId)

        if(projectName){
            const userPayload = {
                "projectName": projectName,
                "startDate": startDate,
                "endDate": endDate,
                "priority": priority,
                "managerId": managerId
            }
            alert(userPayload)
            createData(config.Project_Url, userPayload)
            allProject.push(userPayload);
            alert(allProject)
            this.setState({allProject, projectName: "", startDate: null, endDate: null, priority:0, managerId: ""}) 
            this.resetUser.current.resetUser();
        }
    }

    sort = (field) => {
        
    }

    reset = () => {
        this.setState({ projectName : "",
        priority: 0,
        startDate : null,
        endDate: null, isChecked: false})
    }

    enableDate = (e) => {
        const {isChecked} = this.state;
        if(!isChecked){
            this.setState({isChecked: true, startDate: new Date(), endDate: new Date()});
        }
        else
            this.setState({isChecked: false, startDate: null, endDate: null})
    }

    editProject = (e, idx) => {
        const project = this.state.allProject[e.target.id];
        this.setState({projectName: project.projectName,
                isChecked: true,
                startDate: new Date(project.startDate),
                endDate: new Date(project.endDate),
                priority: project.priority,
                managerId: project.managerId
        })
       
    }

    render(){
        const {projectName, priority, startDate, endDate,isChecked, allProject} = this.state;
      
        return(
          
            <Container className="project-component-container">   
            
                <Row>
                    <Col sm="0"><label htmlFor="projectName">Project: </label></Col> 
                    <Col> <input type="text" name="projectName" value={projectName} onChange={this.updateProjectName} size="74"></input></Col>
                </Row>
                <Row>
                    <Col sm="8" className="checkbox-align">
                        <input type="checkbox" checked={isChecked} name="setStartEndDate" onClick={this.enableDate}></input> <label htmlFor="setStartEndDate">Set Start and End Date</label>
                        <DatePicker selected={startDate} onChange={this.updateStartDate} selectsStart startDate={startDate} endDate={endDate} id="startDate" disabled={!isChecked}/>
                        <DatePicker selected={endDate} onChange={this.updateEndDate} selectsStart endDate={endDate} minDate={addDays(startDate, 1)} id="endDate" disabled={!isChecked}/>
                        
                    </Col>
                </Row>
                <Row>
                    <Col sm="0"><label htmlFor="priority">Priority:</label></Col>
                    <Col><input type="range" name="priority" min="0" max="30" value={priority} onChange={this.updatePriority}></input> {priority}</Col>
                </Row>
                <Row>
                    <Col sm="0"><label htmlFor="managerPid">Manager:</label></Col>
                    <Col sm="6"><Manager updateUserId={this.updateUserId} ref={this.resetUser} title="Search Manager"/></Col>
                </Row>
               
                <div className="add-reset-button-component">
                    <button onClick={this.createUser} style={{"top": "10%"}}> Add </button>
                    <button onClick= {this.reset}> Reset </button>
                </div>
                <hr className="boder-dotted"/>
                <div>
                    <input type="text" placeholder="Search..." value={this.searchProject}></input>
                    <div className="sort-by">
                            <label>Sort By:</label> <button onClick={this.sort('startDate')}>Start Date</button>
                            <button onClick={this.sort('endDate')}>End Date</button>
                            <button onClick={this.sort('priority')}>Priority</button>
                            <button onClick={this.sort('completed')}>Completed</button>
                    </div>
                    {
                        
                        allProject.map((data, idx) => (
                    <div className="container-flex" id={idx}>
                        <div className="project-container">
                            <div>Project: {data.projectName}</div>
                                        <div className="left-project-container">
                                            <div>No of Tasks: {data.noOfTask} </div>
                                            <div>Start Date:{data.startDate}</div>
                                        </div>
                                        <div className="right-project-container">
                                                <div>Completed:{data.completed}</div>
                                                <div>End Date:{data.endDate}</div>
                                        </div>
                        </div>
                            <div className="margin-priority">
                                <div >Priority:</div>
                                <div className="project-priority">{data.priority}</div>
                            </div>
                            <div className="project-update-suspend">
                                <div><button onClick={this.editProject} id={idx}>Update</button></div>
                                <div><button onClick={this.suspendProject}>Suspend</button></div>
                            </div>

                        </div>
                        ))
                        }
                    </div>    
                    
            </Container>
           
        );
    }
}