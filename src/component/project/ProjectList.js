import React, {Component} from 'react';
import axios from 'axios';
import * as config from '../../config/config';
import {deleteData} from '../../service/projectmanager';

export default class ProjectList extends Component{

    constructor(props){
        super(props);
        this.state= {
            allProject: [],
            searchProject: "",
            isCompletedSorted: false,
            isPrioritySorted: false,
            isStartDateSorted: false,
            isEndDateSorted: false
        }
    }

    componentDidMount(){
        axios.get(config.Project_Url).then(response => {
            this.setState({allProject: response.data})
        })
    }

    sortByCompleted = (e) => {
        const {allProject, isCompletedSorted} = this.state;
        let sortedData;
        if(!isCompletedSorted){
            this.setState({isCompletedSorted: true})
            sortedData = allProject.sort((project1, project2) => {
            return project1.completed < project2.completed ? -1: 1;
        });
        }else{
            this.setState({isCompletedSorted: false})
            sortedData = allProject.sort((project1, project2) => {
                return project1.completed > project2.completed ? -1: 1;
        });
        this.setState({allProject: sortedData});
    }
}

    sortByStartDate = () => {
        const {allProject, isStartDateSorted} = this.state;
        let sortedData;
        if(!isStartDateSorted){
            this.setState({isStartDateSorted: true})
            sortedData = allProject.sort((project1, project2) => {
            return new Date(project2.startDate) - new Date(project1.startDate);
        });
        }else{
            this.setState({isStartDateSorted: false})
            sortedData = allProject.sort((project1, project2) => {
                return  new Date(project1.startDate) - new Date(project2.startDate);
        });
        this.setState({allProject: sortedData});
    }
    }

    sortByEndDate = () => {
        const {allProject, isEndDateSorted} = this.state;
        let sortedData;
        if(!isEndDateSorted){
            this.setState({isEndDateSorted: true})
            sortedData = allProject.sort((project1, project2) => {
            return new Date(project2.endDate) - new Date(project1.startDate);
        });
        }else{
            this.setState({isEndDateSorted: false})
            sortedData = allProject.sort((project1, project2) => {
                return  new Date(project1.startDate) - new Date(project2.startDate);
        });
        this.setState({allProject: sortedData});
    }
    }

    sortByPriority = () => {
        const {allProject, isPrioritySorted} = this.state;
        let sortedData;
        if(!isPrioritySorted){
            this.setState({isPrioritySorted: true})
            sortedData = allProject.sort((project1, project2) => {
            return project1.priority < project2.priority ? -1: 1;
        });
        }else{
            this.setState({isPrioritySorted: false})
            sortedData = allProject.sort((project1, project2) => {
                return project1.priority > project2.priority ? -1: 1;
        });
        this.setState({allProject: sortedData});
    }
    }

    updateProjectProperties = (e) => {
        this.props.updateProjectProperties(e,this.state.allProject[e.target.id]);
    }

    updateSearchText = (e) => {
        this.setState({
            searchProject : e.target.value
        })
    }

    suspendProject = (e) =>{
        const {allProject} = this.state;
        const data = allProject[e.target.id];
        deleteData(config.Project_Url+"?projectId="+data.projectId)
        allProject.splice(e.target.id,1)
        this.setState({allProject})
    }

    render(){
        const {allProject, searchProject} = this.state;
        //allProject.push(this.props.updatedProject);
        
       const filteredData = allProject.filter((user)=> {
            return user.projectName.toLowerCase().search(searchProject)!==-1;
        });

        return(
            <div>
                    <input type="text" placeholder="Search..." value={searchProject} onChange={this.updateSearchText}></input>
                    <div className="sort-by">
                            <label>Sort By:</label> <button onClick={this.sortByStartDate}>Start Date</button>
                            <button onClick={this.sortByEndDate}>End Date</button>
                            <button onClick={this.sortByPriority}>Priority</button>
                            <button onClick={this.sortByCompleted}>Completed</button>
                    </div>
                    {
                        filteredData.map((data, idx) => (
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
                                <div><button onClick={this.suspendProject} id={idx}>Suspend</button></div>
                            </div>

                        </div>
                        ))
                        }
                    </div>  
        );
    }
}