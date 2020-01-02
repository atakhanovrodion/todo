import React from "react";

export default class List extends React.Component {
    render(){
        const list = this.props.items.list
        
        return(
            <ul>
                {list.map(item =>(
                    <li>{item}</li>
                ))}
            </ul>
        )
    }
} 