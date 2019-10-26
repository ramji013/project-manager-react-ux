import React, {Component} from 'react';

export default class ButtonComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            addText : "",
            resetText: ""
        }
    }

    render(){
        return(
            <div>
                <button> {this.props.text1}</button>
                <button> {this.props.text2}</button>
            </div>
        );
    }
}
