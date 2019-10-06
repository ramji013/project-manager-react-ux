import React, {Component} from 'react';
import '../App.css';
import * as config from '../config/config';
import {createData, updateData, deleteData} from '../service/projectmanager';
import axios from 'axios';

export default class User extends Component{

    state = {
        firstName: "",
        lastName: "",
        employeeId: "",
        allUser: [],
        isEditBtnClicked: false,
        searchUser: "",
        filteredData: [],
        allUserBckup: []
    }

    componentDidMount(){
        //var getUserData = ;
       // const allUser = await getAllUser(config.User_Url);
    
        axios.get(config.User_Url).then(response => {
            this.setState({allUser: response.data}) 
        })
     //   this.setState({allUser: getUserData});
       
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
        const response = createData(config.User_Url, userPayload)
        if(response.data)
            allUser.push(userPayload);
        this.setState({allUser: allUser}) 
        console.log("response: "+ response)
    }
    }

    editUser = (e) => {
        alert("id" + e.target.id)
        const userData = this.state.allUser[e.target.id];
        alert("user data: "+ userData)
        this.setState({firstName: userData.firstName,
            lastName: userData.lastName,
            employeeId: userData.employeeId,
            isEditBtnClicked : true
        })
    }

    deleteUser = (e) => {
        const {allUser} = this.state;
        allUser.splice(e.target.id,1)
        this.setState({allUser})
    }

    updateUser = () => {
        const {firstName, lastName, employeeId} = this.state
        const payLoad = {
            "firstName" : firstName,
            "lastName" : lastName,
            "employeeId" : employeeId
        }
    }

    filterByFirstName = () => {
        const {allUser,searchUser} = this.state;
            this.setState({
                allUserBckup: allUser,
                allUser: allUser.filter((data) => {return data.firstName.startsWith(searchUser)})});
    }

    filterByLastName = () => {
        const {allUser,searchUser} = this.state;
            this.setState({
                allUserBckup: allUser,
                allUser: allUser.filter((data) => {return data.lastName.startsWith(searchUser)})});
    }

    filterById = () => {
        const {allUser,searchUser} = this.state;
            this.setState({
                allUserBckup: allUser,
                allUser: allUser.filter((data) => {return data.employeeId.startsWith(searchUser)})});
    }

    cancelUpdate = () => {
        this.setState({
            firstName: "",
            lastName: "",
            employeeId: "",
            isEditBtnClicked: false})
    }

    updateSearchStateChange = (e) => {
        const {allUserBckup} = this.state;
        if(!e.target.value && allUserBckup.length>0){
            this.setState({allUser: allUserBckup})
        }
        this.setState({searchUser: e.target.value})
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
                isEditBtnClicked===false ?
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
                    <button type="button" onClick={this.filterByFirstName}>First Name</button>
                    <button type="button" onClick={this.filterByLastName}>Last Name</button>
                    <button type="button" onClick={this.filterById}>Id</button>
                </div>
                <hr className="boder-dotted"/>

                        {
                            allUser.map((data, idx) => (
                                <div id={data.employeeId} className="row">
                                    <div className="column">
                                        First Name: <label value={data.fistName}>{data.firstName}</label><br/>
                                        Last Name: <label value={data.lastName}>{data.lastName}</label><br/>
                                        Employee Id: <label value={data.employeeId}>{data.employeeId}</label>
                                    </div>
                                    <div className="column">
                                        <div><button onClick={this.editUser} id={idx}>Edit</button></div>
                                        <div><button onClick={this.deleteUser} id={idx}>Delete</button></div>
                                    </div>
                                    <hr className="boder-dotted"/>
                                </div>
                            )
                            )
                        }

            </div>
            </div>
        );
    }
}