import React, {Component} from 'react';
import Project from '../search/SearchProject';
import {getAll} from '../../service/projectmanager';
import * as config from '../../config/config';
import axios from 'axios';

export default class ViewTask extends Component{

    constructor(props){
        super(props);
        this.state = {
            allTask : []
        }
    }

    componentWillMount(){
        axios.get(config.Task_Url).then(response => {
            this.setState({allTask: response.data})
        })
    }

    render(){
        const {allTask} = this.state;
        return(
            <div>
                <div className="container">
                    Project: <Project/>
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
                            <tr id={idx}>
                                <td className="task-child-container"><div>{data.taskName}</div></td> 
                                <td className="task-parent-container"><div>{data.parentTaskName}</div></td>
                                <td>{data.priority}</td>
                                <td>{data.startDate}</td>
                                <td>{data.endDate}</td>
                                <td>
                                    <button>Edit</button>
                                    <button>End Task</button>
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