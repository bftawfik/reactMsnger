import React, { Component } from 'react';
// import uuid from 'uuid';
class SendMsgBox extends Component {
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
      <div className="SendMsgBox">
        <input></input><button>Send</button>
      </div>
    );
  }
}

export default SendMsgBox;
