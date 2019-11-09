import React, {Component} from 'react';
import Task from '../task/Task';

export default class CreateTask extends Component{

    render(){
        return(
            <div>
                <Task isUpdate={false}/>
            </div>
        );
    }

}