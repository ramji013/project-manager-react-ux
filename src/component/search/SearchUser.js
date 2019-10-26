import React, {Component} from 'react';
import {Modal, Button, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import * as config from '../../config/config';
import '../search/SearchUser.css';

export default class SearchUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            allUser: [], 
            userId: ""
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

filterByFirstName = (e) => {
    // this.setState({allUser: allUser.filter((user)=> {
    //     return user.firstName.toLowerCase().indexOf(e.target.value)!==-1;
    // })})
    this.state.allUser.filter((user)=> {
        return user.firstName.toLowerCase().indexOf(e.target.value)!==-1;
    });
}

resetUser = () => {
    this.setState({userId: ""})
}

selectUser = (e) => {
    this.setState({userId: e.target.value, showModal: false});
    this.props.updateUserId(e);
}

render(){
    const {userId,showModal,allUser} = this.state
    return (
<div>
        <input text="input" value={userId} disabled name="managerId" onChange={this.updateManagerId}></input>
                    <button onClick={this.searchUser}>Search</button>
            
        <Modal show={showModal} onHide={this.closeModal}>
              <Modal.Header closeButton>
              <Modal.Title>{this.props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="list-all-user">
                    <table>
                    <th>First Name <input type="text" size="10" onChange={this.filterByFirstName}></input></th>
                        <th>Last Name <input type="text" size="10"></input></th> 
                        <th>Id <input type="text" size="10"></input></th> 
                        <th>Action</th>
                        
                    <tbody>
                        
                        {
                        allUser.map((data, idx)=> (
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

