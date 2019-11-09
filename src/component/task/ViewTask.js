import React, {Component} from 'react';
import Project from '../search/SearchProject';
import {updateData} from '../../service/projectmanager';
import * as config from '../../config/config';
import axios from 'axios';
import EditTask  from '../task/Task';
import {Modal, Button} from 'react-bootstrap';

export default class ViewTask extends Component{

    constructor(props){
        super(props);
        this.state = {
            allTask : [],
            projectId : "",
            projectName: "",
            isTaskCompleted: false,
            editTask: false,
            taskId: ""
        }
    }

    selectProject = (e) => {
        axios.get(config.Task_Url+"?projectId="+e.target.id).then(response => {
            alert(response.data)
            this.setState({
                allTask: response.data
               })
        })}

        endTask = (e) => {
            updateData(config.Task_Complete_Url+"?taskId="+e.target.id)
            const {allTask} = this.state
            allTask[e.target.value].isTaskCompleted = true
            this.setState({allTask})
        }

    editTask = () => {
        this.setState({isEdited: true})
    }       

    closeModal = (e) => {
        this.setState({editTask: false})
    }

    render(){
        const {allTask, taskId,editTask} = this.state;
        return(
            <div>
                <div className="container">
                    Project: <Project selectProject= {this.selectProject}/>
                    <label>Sort Task By:</label> <button>Start Date</button> <button>End Date</button>
                    <button>Priority</button> <button>Completed</button>
                    <hr className="boder-dotted"/>

                    <table cellPadding="10">
                        <thead>
                            <th>Task</th>
                            <th>Parent</th>
                            <th>Priority</th>
                            <th>Start</th>
                            <th>End</th>
                            <th></th>
                        </thead>
                        <tbody>
                            { 
                                allTask.map((data, idx) => (
                            <tr id={idx+1}>
                                <td className="task-child-container"><div>{data.taskName}</div></td> 
                                <td className="task-parent-container"><div>{data.parentTaskName}</div></td>
                                <td>{data.priority}</td>
                                <td>{data.startDate}</td>
                                <td>{data.endDate}</td>
                                <td>
                                {
                                    !data.isTaskCompleted?
                                    <div>
                                        <button id={idx} onClick={(e)=> this.setState({editTask: true, taskId: idx})}>Edit</button>
                                        {editTask && idx===taskId ? 

                                        <Modal show={editTask} onHide={this.closeModal} size="lg" >
                                        <Modal.Header closeButton>
                                        <Modal.Title>Update Task</Modal.Title>
                                      </Modal.Header>
                                      <Modal.Body>
                                          <EditTask isUpdate={true} taskData = {allTask[idx]} closeModal= {this.closeModal} />
                                      </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.closeModal}>
               Close
            </Button>
            </Modal.Footer>
        </Modal>: "" }
                                        <button id={data.taskId} value={idx} onClick={this.endTask}>End Task</button>
                                    </div>: 
                                    <div>Task Completed</div>
                                }
                               </td>
                            </tr>
                             ))
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}