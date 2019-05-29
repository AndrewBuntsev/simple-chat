import React, {Component} from 'react';

/* #region Styles */
const containerStyle = {
    textAlign: 'left'
};

const inputStyle = {
    height: '1.5em',
    width: '50%',
    boxShadow: '2px 2px gray'
};

const buttonStyle = {
    height: '2em',
    marginLeft: '1em',
    width: '100px'
};
/* #endregion Styles */


class SendMessageComponent extends Component{
    onClick = e => {
        fetch('http://localhost:51000/api/addMessage', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({messageText: this.refs.text.value})
        });
        this.refs.text.value = '';
    };
    render(){
        return(
        <div style={containerStyle}>
            <input type='text' id='text' ref='text' style={inputStyle}></input>
            <button onClick={this.onClick} style={buttonStyle}>send</button>
        </div>);
    }
}

export default SendMessageComponent;