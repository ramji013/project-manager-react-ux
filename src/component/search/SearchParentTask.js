import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import axios from 'axios';
import * as config from '../../config/config';
import '../search/SearchUser.css';

export default class SearchParentTask extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            allParentTask: [], 
            projectTaskId: "",
            projectTaskName: "",
            searchParentTasks: ""
        }
    }

searchParentTask = (e) => {
    axios.get(config.Parent_Task_Url).then(response => {
        this.setState({allParentTask: response.data})
    })
    this.setState({showModal: true})
  
}

closeModal = (e) => {
    this.setState({showModal: false})
}

updateParentTaskName = (e) => {
  this.setState({searchParentTasks: e.target.value})
}

resetProject = () => {
    this.setState({parentTaskId: ""})
}

updateParentTask = (parentTaskId) => {
    this.setState({parentTaskId})
}

selectParentTask = (e) => {
    this.setState({parentTaskId: e.target.id, parentTaskName: e.target.value ,showModal: false});
    this.props.selectParentTask(e);
}

populateParentTaskFromTask = (data) => {
    if(data)
        this.setState({projectTaskId: data.parentTaskId,
            parentTaskName: data.parentTaskName })
}

render(){
    const {showModal,allParentTask,parentTaskName,searchParentTasks} = this.state

    let filteredData = allParentTask.filter((project) => {
        if(project.task!=null)
            return project.task.toLowerCase().search(searchParentTasks)!==-1;
    });

    return (
       
<div>
        <input text="input" value={parentTaskName} disabled name="projectName"></input>
                    <button onClick={this.searchParentTask} disabled={this.props.isParentTask}>Search</button>
            
        <Modal show={showModal} onHide={this.closeModal}>
              <Modal.Header closeButton>
              <Modal.Title>{this.props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="list-all-project">
                    <table cellPadding="10">
                    <th>Parent Task Name <input type="text" size="10" onChange={this.updateParentTaskName} value={searchParentTasks}></input></th>
                    <th>Action</th>
                    <tbody>
                        
                        {
                        filteredData.map((data, idx)=> (
                            <tr id={idx}><td>{data.task}</td><td><button onClick={this.selectParentTask} value={data.task} id={data.id}>Select</button></td></tr>
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