import React from 'react';
import ReactDom from 'react-dom';
import Calendar from './components/Calendar';
import List from './components/List';
import axios from 'axios';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: [
        {
          list: Array(),
          day: 0
        }
      ],
      current: 0,
      text: '',
      days: 1,
      show: false,
      dd: 0,
      mm: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showCalendar = this.showCalendar.bind(this);
  }
  render() {
    const items = this.state.store[this.state.current];
    return (
      <div>
        <button onClick={this.showCalendar}>
          {this.state.dd}.{this.state.mm}
        </button>
        <Calendar
          onClick={i => this.dateUpdate(i)}
          dd={this.state.dd}
          mm={this.state.mm}
          show={this.state.show}
          value={this.state.current}
        />
        <List items={items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.text} />
          <button>add</button>
        </form>
      </div>
    );
  }
  handleChange(e) {
    this.setState({
      text: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const store = this.state.store.slice();
    store[this.state.current].list.push(this.state.text);

    this.setState({
      store: store,
      text: ''
    });
  }
  showCalendar(e) {
    this.setState({
      show: !this.state.show
    });
  }
  componentDidMount() {
    const getDate = new Date();
    const store = this.state.store.slice();
    const list = store[0].list.slice();
    for (let i = 0; i < 31; i++) {
      store.push({
        list: Array(),
        day: i
      });
    }

    this.setState({
      store: store,
      dd: getDate.getDate(),
      mm: getDate.getMonth() + 1
    });
  }
  dateUpdate(i) {
    this.setState({
      dd: i,
      show: !this.state.show,
      current: i
    });
  }
  /*async getDataAxios() {
    const response = await axios.get('http://localhost:3002/');
    console.log(response.data);
  }*/
}

ReactDom.render(<App />, document.getElementById('app'));
