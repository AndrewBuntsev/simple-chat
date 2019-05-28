import React, {Component} from 'react';

class SendMessageComponent extends Component{
    onClick = e => {
        console.log('Sending message: ' + this.refs.text.value);
        fetch('http://localhost:51000/api/addMessage', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({messageText: this.refs.text.value})
        })
    };
    render(){
        return(
        <>
        <input type='text' id='text' ref='text'></input>
        <button onClick={this.onClick}>send</button>
        </>);
    }
}

export default SendMessageComponent;