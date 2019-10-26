import React, {Component} from 'react';
import axios from 'axios';
import * as config from '../../config/config';

export default class ProjectList extends Component{

    constructor(props){
        super(props);
        this.state= {
            allProject: []
        }
    }

    componentDidMount(){
        axios.get(config.Project_Url).then(response => {
            this.setState({allProject: response.data})
        })
    }

    sort = (field) => {
        
    }

    updateProjectProperties = (e) => {
        alert(this.state.allProject[e.target.id])
        this.props.updateProjectProperties(e,this.state.allProject[e.target.id]);
    }

    render(){
        const {allProject} = this.state;
        return(
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
                                <div><button onClick={this.updateProjectProperties} id={idx}>Update</button></div>
                                <div><button onClick={this.suspendProject}>Suspend</button></div>
                            </div>

                        </div>
                        ))
                        }
                    </div>  
        );
    }
}