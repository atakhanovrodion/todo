import React from 'react';
import ReactDom from 'react-dom';
import Calendar from './components/Calendar';
import List from './components/List';
import axios from 'axios';
import { ipcRenderer } from 'electron';
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
      show: false,
      dd: 0,
      mm: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showCalendar = this.showCalendar.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
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
        <List deleteItem={this.deleteItem} items={items} />
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

    ipcRenderer.send('submitChanges', [this.state.current, this.state.text]);
    console.log('componentdidmount');
    ipcRenderer.once('lastId', (evt, result) => {
      //result[0][0] <-- FIX
      store[this.state.current].list.push({ id: result[0][0], text: result[1] });

      this.setState({
        store: store,
        text: ''
      });
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
    for (let i = 1; i < 32; i++) {
      store.push({
        list: Array(),
        day: i
      });
    }
    ipcRenderer.send('mainWindowLoaded');
    ipcRenderer.on('resultSent', (evt, result) => {
      for (let i = 0; i < result.length; i++) {
        store[result[i].day].list.push({ id: result[i].id, text: result[i].text });
      }
      this.setState({
        store: store,
        dd: getDate.getDate(),
        mm: getDate.getMonth() + 1
      });
    });
  }
  dateUpdate(i) {
    this.setState({
      dd: i,
      show: !this.state.show,
      current: i
    });
  }
  deleteItem(i) {
    let store = this.state.store.slice();

    ipcRenderer.send('deleteItem', i);
    ipcRenderer.on('itemDeleted', (evt, result) => {
      for (let j = 0; j < store[this.state.current].list.length; j++) {
        if (store[this.state.current].list[j].id == result) {
          console.log(store[this.state.current].list);
          store[this.state.current].list.splice(j, 1);
          console.log(store[this.state.current].list);
        }
      }
      //console.log(store[this.state.current].list);
      this.setState({
        store: store
      });
    });
  }
}

ReactDom.render(<App />, document.getElementById('app'));
