import React from 'react'

export default function CalendarButton(props) {
    return(
        <button onClick={props.onClick}>{props.value}</button>
    )
}