import React from 'react';
import swal from 'sweetalert';

import './App.css';
import SendMessageComponent from './components/SendMessageComponent';
import MessageListComponent from './components/MessageListComponent';
import ClientListComponent from './components/ClientListComponent';

class App extends React.Component {
  state = {};

  componentDidMount() {
    //https://sweetalert.js.org/guides/#advanced-examples
    let swalOptions = {
      title: 'Welcome to the Simple Chat!',
      text: 'Please tell us your unique name',
      content: 'input',
      button: {
        text: 'GO !',
        closeModal: false
      },
      closeOnClickOutside: false,
      closeOnEsc: false
    };

    (async () => {
      let logged = false;
      let name = '';
      while (!logged) {
        //Get name from popup
        name = await swal(swalOptions);

        //Validate the name on the server
        let res = await fetch(
          'http://localhost:51000/api/anonymousLogin?name=' + name
        ).then(data => data.json());

        //Name is failed
        if (res.err) {
          await swal(
            Object.assign({}, swalOptions, {
              title: 'Error',
              text: res.err,
              icon: 'error',
              content: null,
              button: {
                text: 'Try again',
                closeModal: false
              }
            })
          );
        } else {
          //Name is approved
          logged = true;
        }
      }

      //Close the swal and start chatting
      swal.close();
    })();
  }

  render() {
    return (
      <div className="App">
        <MessageListComponent />
        <SendMessageComponent />
        <ClientListComponent />
      </div>
    );
  }
}

export default App;
