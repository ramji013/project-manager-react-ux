import React, {Component} from 'react';
import '../../App.css';
import * as config from '../../config/config';
import {createData, updateData, deleteData} from '../../service/projectmanager';
import axios from 'axios';
import '../user/User.css';

export default class User extends Component{

    state = {
        firstName: "",
        lastName: "",
        employeeId: "",
        allUser: [],
        isEditBtnClicked: false,
        searchUser: "",
        filteredData: [],
        allUserBkup: []
    }

    componentDidMount(){
        axios.get(config.User_Url).then(response => {
            this.setState({allUser: response.data, allUserBkup: response.data}) 
        })
    }

    reset = () => {
        this.setState({
            firstName: "",
            lastName: "",
            employeeId: ""})
    }

    updateFirstName = (e) => {
        this.setState({firstName : e.target.value})
    }

    updateLastName = (e) =>{
        this.setState({lastName: e.target.value})
    }

    updateEmployeeId = (e) => {
        this.setState({employeeId: e.target.value})
    }

    createUser = () =>{
        const {firstName, lastName, employeeId, allUser} = this.state;
        if(firstName){
        const userPayload = {
            "firstName": firstName,
            "lastName": lastName,
            "employeeId": employeeId
        }
        createData(config.User_Url, userPayload)
        allUser.push(userPayload);
        this.setState({allUser: allUser, firstName: "", lastName: "", employeeId: ""}) 
    }
    }

    editUser = (e) => {
        const userData = this.state.allUser[e.target.id];
        this.setState({firstName: userData.firstName,
            lastName: userData.lastName,
            employeeId: userData.employeeId,
            isEditBtnClicked : true,
            editedIdx: e.target.id
        });
    }

    deleteUser = (e) => {
        const {allUser} = this.state;
        const data = allUser[e.target.id];
        deleteData(config.User_Url+"?employeeId="+data.employeeId)
        allUser.splice(e.target.id,1)
        this.setState({allUser})
    }

    updateUser = () => {
        const {firstName, lastName, employeeId, editedIdx, allUser} = this.state
        const payLoad = {
            "firstName" : firstName,
            "lastName" : lastName,
            "employeeId" : employeeId
        }
        updateData(config.User_Url, payLoad);
        allUser[editedIdx] = payLoad;
        this.setState({
            firstName: "",
            lastName: "", 
            employeeId: "",
            allUser, 
            isEditBtnClicked: false})
    }

    sortByFirstName = () => {
        const {allUser} = this.state;
            let sortedData = allUser.sort((user1, user2) => {
                return user1.firstName < user2.firstName ? -1: 1;
            });
            this.setState({allUser: sortedData});
    }

    sortByLastName = () => {
        const {allUser} = this.state;
            let sortedData = allUser.sort((user1, user2) => {
                return user1.lastName < user2.lastName ? -1: 1;
            });
            this.setState({allUser: sortedData});
    }

    sortById = () => {
        const {allUser} = this.state;
        let sortedData = allUser.sort((user1, user2) => {
            return user1.employeeId < user2.employeeId ? -1: 1;
        });
        this.setState({allUser: sortedData});
    }

    cancelUpdate = () => {
        this.setState({
            firstName: "",
            lastName: "",
            employeeId: "",
            isEditBtnClicked: false})
    }

    updateSearchStateChange = (e) => {
        const {allUser, allUserBkup} = this.state;
        if(!e.target.value){
            this.setState({allUser: allUserBkup, searchUser:""})
        }else{
            let filteredData = allUser.filter((user)=> {
                return user.firstName.toLowerCase().indexOf(e.target.value)!==-1;
            });
            this.setState({searchUser: e.target.value, allUser: filteredData})
        }
    }

    render(){
        const {firstName, lastName, employeeId,searchUser,allUser,isEditBtnClicked} = this.state;

        return(
            <div>
            <div className="align-center">
                <form>
                <table>
                    <tbody>
                        <tr><td><label htmlFor="firstName">First Name:</label></td><td><input name="firstName" type="text" value={firstName} onChange={this.updateFirstName} required></input></td></tr> 
                        <tr><td><label htmlFor="lastName">Last Name:</label></td><td><input name="lastName" type="text" value={lastName} onChange={this.updateLastName} required></input></td></tr> 
                        <tr><td><label htmlFor="employeeId">Employee ID:</label></td><td><input name="employeeId" type="text" value= {employeeId} onChange={this.updateEmployeeId} required></input></td></tr> 
                    </tbody>
                </table>
                </form>
                {
                !isEditBtnClicked ?
                <div className="container">
                    <button onClick={this.createUser}> Add </button>
                    <button onClick= {this.reset} className="reset"> Reset </button>
                </div>:
                <div className="container">
                    <button onClick={this.updateUser}> Update </button>
                    <button onClick= {this.cancelUpdate}> Cancel </button>
                </div>
                }
                <hr className="boder-solid"/>
                <div className="container">
                    <input type="text" name="search" placeholder="search" value={searchUser} onChange={this.updateSearchStateChange}></input>
                    <label>Sort:</label>
                    <button type="button" onClick={this.sortByFirstName}>First Name</button>
                    <button type="button" onClick={this.sortByLastName}>Last Name</button>
                    <button type="button" onClick={this.sortById}>Id</button>
                </div>
                <hr className="boder-dotted"/>

                        {
                            allUser.map((data, idx) => (
                                    <div className="container" id={data.employeeId}>
                                        <div className="box">
                                            <div className="box-row">
                                               
                                           <div className="box-cell box1">
                                                    First Name: <label value={data.fistName}>{data.firstName}</label><br/>
                                                    Last Name: <label value={data.lastName}>{data.lastName}</label><br/>
                                                    Employee Id: <label value={data.employeeId}>{data.employeeId}</label>
                                                </div>
                                                
                                                <div className="box-cell box2">
                                                    <div><button onClick={this.editUser} id={idx}>Edit</button></div>
                                                    <div><button onClick={this.deleteUser} id={idx}>Delete</button></div>
                                                </div>
                                                
                                            </div>
                                            <hr className="boder-dotted"/>
                                            </div>
                                    </div>
                               
                            )
                            )
                        }
            </div>
            </div>
        );
    }
}