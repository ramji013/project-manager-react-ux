import React, {Component} from 'react';
import axios from 'axios';
import * as config from '../../config/config';

export default class ProjectList extends Component{

    constructor(props){
        super(props);
        this.state= {
            allProject: [],
            searchProject: "",
            isCompletedSorted: false,
            isPrioritySorted: false,
            isStartDateSorted: false
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
            return project2.startDate - project1.startDate ? -1: 1;
        });
        }else{
            this.setState({isStartDateSorted: false})
            sortedData = allProject.sort((project1, project2) => {
                return project1.startDate - project2.startDate ? -1: 1;
        });
        this.setState({allProject: sortedData});
    }
    }

    sortByEndDate = () => {
        
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

    render(){
        const {allProject, searchProject} = this.state;

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
                                <div><button onClick={this.suspendProject}>Suspend</button></div>
                            </div>

                        </div>
                        ))
                        }
                    </div>  
        );
    }
}