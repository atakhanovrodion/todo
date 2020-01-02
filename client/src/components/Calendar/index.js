import React from "react";


class Calendar extends React.Component {
    render() {
        if (!this.props.show){
            return null
        }
        return(
            <div>hello world</div>
        )
    }
    
}
export default Calendar