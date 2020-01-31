import React from 'react';

export default class List extends React.Component {
  render() {
    const list = this.props.items.list;
    return (
      <ul>
        {list.map(item => (
          <li key={item.id}>
            {item.text}
            <button>edit</button>
            <button onClick={() => this.props.deleteItem(item.id)}>complete</button>
          </li>
        ))}
      </ul>
    );
  }
}
