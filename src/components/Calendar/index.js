import React from 'react';
import CalendarButton from '../CalendarButton';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: this.daysInMounth(this.props.mm, this.props.yyyy)
    };
  }
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div>
        {this.createTable()}

        <button onClick={this.props.prevClick}>prev</button>
        <button onClick={this.props.nextClick}>next</button>
      </div>
    );
  }
  createTable() {
    let days = this.state.days;
    let table = [];
    for (let i = 0; i < days; i++) {
      table.push(<CalendarButton onClick={() => this.props.onClick(i)} value={i} />);
    }
    return table;
  }
  daysInMounth(mm, yyyy) {
    return new Date(yyyy, mm, 0).getDate();
  }
}
export default Calendar;
