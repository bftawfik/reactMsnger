import React, { Component } from 'react';
// import uuid from 'uuid';
import SendMsgBox from './sendMsgBox';

class ChatRoomWindow extends Component {
  constructor(){
    super();
    this.state= {
      chatRoomName:{
        show:0,
      },
      submitBtn:{
        label:"Join"
      }
    }
  }
  //-------------------------------------------------------
  render() {
    return (
      <div className="ChatRoomWindow">
        <header>
          <h3>Welcome To Our Anonymous Chat Room Service</h3>
          <h4>Window Name</h4>
          <h4>Active Users:</h4>
        </header>
        <article className="chatRoomBox"></article>
        <footer><SendMsgBox></SendMsgBox></footer>
      </div>
    );
  }
}

export default ChatRoomWindow;
