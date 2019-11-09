import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import axios from 'axios';
import * as config from '../../config/config';
import '../search/SearchUser.css';

export default class SearchProject extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            allProject: [], 
            projectId: "",
            projectName: "",
            searchProjects: ""
        }
    }
    
searchProject = (e) => {
    this.setState({showModal: true})
    axios.get(config.Project_Url).then(response => {
        this.setState({allProject: response.data})
    })
}

closeModal = (e) => {
    this.setState({showModal: false})
}

updateProjectName = (e) => {
  this.setState({searchProjects: e.target.value})
}

resetProject = () => {
    this.setState({projectId: ""})
}

updateProject = (projectId) => {
    this.setState({projectId})
}

selectProject = (e) => {
    this.setState({projectId: e.target.id, projectName: e.target.value ,showModal: false});
    this.props.selectProject(e);
}

updateProjectFromTask = (data) => {
    if(data)
         this.setState({projectName: data.projectName, projectId: data.projectId})
}

render(){
    const {showModal,allProject,projectName,searchProjects} = this.state
    
    let filteredData = allProject.filter((project)=> {
        return project.projectName.toLowerCase().search(searchProjects)!==-1;
    });

    return (
       
<div>
        <input text="input" value={projectName} disabled name="projectName"></input>
                    <button onClick={this.searchProject} disabled={this.props.isParentTask}>Search</button>
            
        <Modal show={showModal} onHide={this.closeModal}>
              <Modal.Header closeButton>
              <Modal.Title>{this.props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="list-all-project">
                    <table cellPadding="10">
                    <th>Project Name <input type="text" size="10" onChange={this.updateProjectName} value={searchProjects}></input></th>
                        <th>Start Date</th> 
                        <th>End Date</th> 
                        <th>Action</th>
                        
                    <tbody>
                        
                        {
                        filteredData.map((data, idx)=> (
                            <tr id={idx}><td>{data.projectName}</td><td>{data.startDate}</td><td>{data.endDate}</td><td><button onClick={this.selectProject} value={data.projectName} id={data.projectId}>Select</button></td></tr>
                        ))
                    }
                    </tbody>
                    </table>
                </div>
                </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.closeModal}>
               Close
            </Button>
            <Button variant="primary" onClick={this.closeModal}>
                 Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        </div>
    )
}
}

