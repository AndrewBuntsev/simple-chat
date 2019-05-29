import React from 'react';
import './App.css';
import SendMessageComponent from './components/SendMessageComponent';
import MessageListComponent from './components/MessageListComponent';

class App extends React.Component {

  state = {};

  componentDidMount(){
    fetch('http://localhost:51000/api/test')
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(console.log);
  }

  render(){
    return (
      <div className="App">
        <MessageListComponent></MessageListComponent>
        <SendMessageComponent></SendMessageComponent>
      </div>
    );
  }
}

export default App;
