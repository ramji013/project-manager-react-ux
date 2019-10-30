import React, {Component} from 'react';
import Project from '../search/SearchProject';
import {getAll, updateData} from '../../service/projectmanager';
import * as config from '../../config/config';
import axios from 'axios';

export default class ViewTask extends Component{

    constructor(props){
        super(props);
        this.state = {
            allTask : [],
            projectId : "",
            projectName: ""
        }
    }

    selectProject = (e) => {
        let task = getAll(config.Task_Url+"?projectId="+e.target.id);
        this.setState({
            allTask: task
           })
        }
        // axios.get(config.Task_Url+"?projectId="+e.target.id).then(response => {
        //     alert(response.data)
        //     this.setState({
        //         allTask: response.data
        //        })
        // })}

        // endTask = () => {
        //     updateData
        // }

    render(){
        const {allTask} = this.state;
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
                                    <button>Edit</button>
                                    <button onClick={this.endTask}>End Task</button>
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