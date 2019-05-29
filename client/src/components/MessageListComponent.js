import React, {Component} from 'react';
import * as $ from 'jquery';


/* #region Styles */
const containerStyle = {
    
};

const listStyle = {
    width: '60%',
    height: '600px',
    overflow: 'auto',
    listStyle: 'none',
    background: '#d4f3e6',
    fontFamily: 'Garamond, serif',
    fontSize: '1.2rem',
    border: '1px #a59b15 solid',
    padding: '0.5em',
    boxShadow: '5px 5px #d9d9d9',
    borderRadius: '3px'
};

const listItemStyle = {
    textAlign: 'left',
    borderBottom: '1px gray dashed',
    marginBottom: '0.1em',
    paddingBottom: '0.3em'
};
/* #endregion Styles */

class MessageListComponent extends Component{
    
    state = {messages: []};

    eventSource = null;
    
    componentDidMount(){
        this.eventSource = new EventSource('http://192.168.1.3:51000/listenMessages');
        this.eventSource.addEventListener('message', e => {
            this.setState((state) => ({messages: state.messages.concat([e.data])}));
            $("#messagesContainer ul li").last().focus();
        }, true);
    }
    
    componentWillUnmount(){
        this.eventSource.close();
    }
    
    render(){
        let messages = this.state.messages.map((el, i) => <li key={i} tabIndex='1' style={listItemStyle}>{el}</li>);
        return(
        <div style={containerStyle} id='messagesContainer'>
            <ul style={listStyle}>
                {messages}
            </ul>
        </div>);
    }
}

export default MessageListComponent;