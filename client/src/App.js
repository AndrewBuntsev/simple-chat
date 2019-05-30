import React from 'react';
import swal from 'sweetalert';


import './App.css';
import SendMessageComponent from './components/SendMessageComponent';
import MessageListComponent from './components/MessageListComponent';

class App extends React.Component {

  state = {};

  componentDidMount(){
    //https://sweetalert.js.org/guides/#advanced-examples
    let swalOptions = {
      title: 'Welcome to the Simple Chat!', 
      text: 'Please tell us your unique name',
      content: 'input',
      button: {
        text: "GO !",
        closeModal: false
      },
      closeOnClickOutside: false,
      closeOnEsc: false
    };
    swal(swalOptions)
      .then(value => swal(Object.assign({}, swalOptions, {text: 'hello ' + value, content: null})))
      .then(value => setTimeout(() => swal.close(), 5000));


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
