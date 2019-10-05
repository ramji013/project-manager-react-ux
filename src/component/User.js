import React, {Component} from 'react';
import '../App.css';
import * as config from '../config/config';
import {createData, getAllUser} from '../service/projectmanager';
import axios from 'axios';

export default class User extends Component{

    state = {
        firstName: "",
        lastName: "",
        employeeId: "",
        allUser: [],
        editFirstName: "",
        editLastName: "",
        editEmployeeId: ""
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
            employeeId: userData.employeeId
        })
    }


    render(){
        const {firstName, lastName, employeeId,searchUser,allUser,editFirstName, editLastName, editEmployeeId} = this.state;
        return(
            <div>
            <div className="align-center">
                <table>
                    <tbody>
                        <tr><td><label htmlFor="firstName">First Name:</label></td><td><input name="firstName" type="text" value={firstName} onChange={this.updateFirstName} required></input></td></tr> 
                        <tr><td><label htmlFor="lastName">Last Name:</label></td><td><input name="lastName" type="text" value={lastName} onChange={this.updateLastName} required></input></td></tr> 
                        <tr><td><label htmlFor="employeeId">Employee ID:</label></td><td><input name="employeeId" type="text" value= {employeeId} onChange={this.updateEmployeeId} required></input></td></tr> 
                    </tbody>
                </table>
                <div className="Container">
                    <button onClick={this.createUser}> Add </button>
                    <button onClick= {this.reset} className="reset"> Reset </button>
                </div>
                <hr className="boder-solid"/>
                <div className="Container">
                    <input type="text" name="search" placeholder="search" value={searchUser}></input>
                    <label>Sort:</label>
                    <button type="button" onClick={this.sortByFirstName}>First Name</button>
                    <button type="button" onClick={this.sortByLastName}>Last Name</button>
                    <button type="button" onClick={this.sortById}>Id</button>
                </div>
                <hr className="boder-dotted"/>

                        {
                            allUser.map((data, idx) => (
                                <div id={idx} className="row">
                                    <div className="column">
                                        First Name:<label value={data.fistName}>{data.firstName}</label><br/>
                                        Last Name: <label value={data.lastName}>{data.lastName}</label><br/>
                                        Employee Id: <label value={data.employeeId}>{data.employeeId}</label>
                                    </div>
                                    <div className="column">
                                        <div><button onClick={this.editUser} id={idx}>Edit</button></div>
                                        <div><button onClick={this.deleteUser}>Delete</button></div>
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