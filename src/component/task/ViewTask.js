import React, {Component} from 'react';


export default class ViewTask extends Component{

    render(){
        return(
            <div>
                <div className="c">
                    <label>Project:</label> <input type="text"></input> <button>Search</button>
                    <label>Sort Task By:</label> <button>Start Date</button> <button>End Date</button>
                    <button>Priority</button> <button>Completed</button>
                    <hr className="boder-dotted"/>

                    <table cellPadding="10">
                        <thead>
                            <th>Task</th>
                            <th>Parent</th>
                            <th>Priority</th>
                            <th>Start</th>
                            <th>End</th>
                            <th></th>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="task-parent-container">Task1 d ddddddd </td> 
                                <td className="task-parent-container">Parent Task1</td>
                                <td>10</td>
                                <td>2019-01-10</td>
                                <td>2019-01-10</td>
                                <td>
                                    <button>Edit</button>
                                    <button>End Task</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}