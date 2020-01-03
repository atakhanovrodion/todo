import React from "react";
import CalendarButton from '../CalendarButton'

class Calendar extends React.Component {
    render() {

        if (!this.props.show){
            return null
        }
        return(
            <div>{this.createTable()}</div>
        )
    }
    createTable(){
        let days = 31
        let table = []
        if (this.props.mm == 2){
            days = 28
        }
        for (let i= 0; i<days; i++){
            table.push(<CalendarButton 
            onClick={()=> this.props.onClick(i)} 
            value={i} />)
        }
        return table
    }
}
export default Calendar
