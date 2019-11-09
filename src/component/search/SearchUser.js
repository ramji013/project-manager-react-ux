import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import axios from 'axios';
import * as config from '../../config/config';
import '../search/SearchUser.css';

export default class SearchUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            allUser: [], 
            userId: "",
            firstName: ""
        }
    }
    
searchUser = (e) => {
    this.setState({showModal: true})
    axios.get(config.User_Url).then(response => {
        this.setState({allUser: response.data})
    })
}

closeModal = (e) => {
    this.setState({showModal: false})
}

updateFirstName = (e) => {
  this.setState({firstName: e.target.value})
}

resetUser = () => {
    this.setState({userId: ""})
}

showCurrentUser = (data) => {
    if(data)
        this.setState({userId: data.userId})
}

updateUser = (userId) => {
    this.setState({userId})
}

selectUser = (e) => {
    this.setState({userId: e.target.value, showModal: false});
    this.props.updateUserId(e);
}

render(){
    const {userId,showModal,allUser,firstName} = this.state

    let filteredData = allUser.filter((user)=> {
        return user.firstName.toLowerCase().search(firstName)!==-1;
    });

    return (
       
<div>
        <input text="input" value={userId} disabled name="managerId"></input>
                    <button onClick={this.searchUser} disabled={this.props.isParentTask}>Search</button>
            
        <Modal show={showModal} onHide={this.closeModal}>
              <Modal.Header closeButton>
              <Modal.Title>{this.props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="list-all-user">
                    <table cellPadding="10">
                    <th>First Name <input type="text" size="10" onChange={this.updateFirstName} value={firstName}></input></th>
                        <th>Last Name</th> 
                        <th>Id</th> 
                        <th>Action</th>
                        
                    <tbody>
                        
                        {
                        filteredData.map((data, idx)=> (
                            <tr id={idx}><td>{data.firstName}</td><td>{data.lastName}</td><td>{data.employeeId}</td><td><button onClick={this.selectUser} value={data.employeeId}>Select</button></td></tr>
                        ))
                    }
                    </tbody>
                    </table>
                </div>
                </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.closeModal}>
               Close
            </Button>
            <Button variant="primary" onClick={this.closeModal}>
                 Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        </div>
    )
}
}

