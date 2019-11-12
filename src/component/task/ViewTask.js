import React, {Component} from 'react';
import Project from '../search/SearchProject';
import {updateData,deleteData} from '../../service/projectmanager';
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
            taskId: "",
            isStartDateSorted: false,
            isCompletedSorted: false,
            isEndDateSorted: false,
            isPrioritySorted: false
        }
    }

    selectProject = (e) => {
        axios.get(config.Task_Url+"?projectId="+e.target.id).then(response => {
            this.setState({
                allTask: response.data
               })
        })}

        endTask = (e) => {
            updateData(config.Task_Complete_Url+"?taskId="+e.target.id)
            const {allTask} = this.state
            allTask[e.target.value].taskCompleted = true
            this.setState({allTask})
        }

    editTask = () => {
        this.setState({isEdited: true})
    }       

    closeModal = (e) => {
        this.setState({editTask: false})
    }


    sortByCompleted = () => {
        const {allTask, isCompletedSorted} = this.state;
        let sortedData;
        if(!isCompletedSorted){
            this.setState({isCompletedSorted: true})
            sortedData = allTask.sort((task1, task2) => {
            return task1.taskCompleted < task2.taskCompleted ? -1: 1;
        });
        }else{
            this.setState({isCompletedSorted: false})
            sortedData = allTask.sort((task1, task2) => {
                return task1.taskCompleted > task2.taskCompleted ? -1: 1;
        });
        this.setState({allTask: sortedData});
    }
}


sortByStartDate = () => {
    const {allTask, isStartDateSorted} = this.state;
    let sortedData;
    if(!isStartDateSorted){
        this.setState({isStartDateSorted: true})
        sortedData = allTask.sort((task1, task2) => {
        return new Date(task2.startDate) - new Date(task1.startDate);
    });
    }else{
        this.setState({isStartDateSorted: false})
        sortedData = allTask.sort((task1, task2) => {
            return  new Date(task1.startDate) - new Date(task2.startDate);
    });
    this.setState({allTask: sortedData});
}
}

sortByEndDate = () => {
    const {allTask, isEndDateSorted} = this.state;
    let sortedData;
    if(!isEndDateSorted){
        this.setState({isEndDateSorted: true})
        sortedData = allTask.sort((task1, task2) => {
        return new Date(task2.endDate) - new Date(task1.startDate);
    });
    }else{
        this.setState({isEndDateSorted: false})
        sortedData = allTask.sort((task1, task2) => {
            return  new Date(task1.startDate) - new Date(task2.startDate);
    });
    this.setState({allTask: sortedData});
}
}

sortByPriority = () => {
    const {allTask, isPrioritySorted} = this.state;
    let sortedData;
    if(!isPrioritySorted){
        this.setState({isPrioritySorted: true})
        sortedData = allTask.sort((task1, task2) => {
        return task1.priority < task2.priority ? -1: 1;
    });
    }else{
        this.setState({isPrioritySorted: false})
        sortedData = allTask.sort((task1, task2) => {
            return task1.priority > task2.priority ? -1: 1;
    });
    this.setState({allTask: sortedData});
}
}

deleteTask = (e) => {
    const {allTask} = this.state;
    allTask.splice(e.target.id,1);
    this.setState({allTask});
    deleteData(config.Task_Url+"?taskId="+e.target.value);
}


    render(){
        const {allTask, taskId,editTask} = this.state;
        return(
            <div>
                <div className="container">
                    <Project selectProject= {this.selectProject}/>
                    <label>Sort Task By:</label> <button onClick={this.sortByStartDate}>Start Date</button> <button onClick={this.sortByEndDate}>End Date</button>
                    <button onClick={this.sortByPriority}>Priority</button> <button onClick={this.sortByCompleted}>Completed</button>
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
                                    !data.taskCompleted?
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
                                        <button id={idx} value={data.taskId} onClick={this.deleteTask}>Delete Task</button>
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