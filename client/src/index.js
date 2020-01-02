import React from 'react'
import ReactDom from 'react-dom'
import Calendar from './components/Calendar'
import List from './components/List'
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            store: [{
                list: Array()
            }],
            current: 0,
            text: '',
            days: 1,
            show: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.showCalendar = this.showCalendar.bind(this)
    }
    render(){
        const items = this.state.store[this.state.current]
        return(
            <div>
                <button onClick={this.showCalendar}>{this.state.current}</button>
                <Calendar show={this.state.show} value={this.state.current} />
                <List items={items} />
                <form onSubmit={this.handleSubmit}>
                    <input
                        onChange = {this.handleChange}
                        value = {this.state.text}
                    />
                    <button>
                        add
                    </button>
                </form>
            </div>
        )
    }
    handleChange(e) {
        this.setState({
            text: e.target.value
        })
    }
    handleSubmit(e) {
        e.preventDefault()
        if (!this.state.text.length) {
            return
        }
        const store  = this.state.store.slice()
        store[this.state.current].list.push(this.state.text)
        console.log(store)
        this.setState({
            store: store,
            text: ''
        })
    }
    showCalendar(e) {
        this.setState({
            show: !this.state.show
        })
    }
}



ReactDom.render(<App />,document.getElementById('app'))