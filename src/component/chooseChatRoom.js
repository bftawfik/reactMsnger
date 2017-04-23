import React, { Component } from 'react';
import uuid from 'uuid';
class ChooseChatRoom extends Component {
  constructor(){
    super();
    this.state= {
      chatRoom:{
        name:{
          show:0
        },
        password:{
          show:0
        },
        submitBtn:{
          label:"Join"
        }
      }
    }
  }
  //-------------------------------------------------------
  joinClicked(e){
    e.preventDefault();
    if(this.refs.chatRoom.value === "Choose A Chat Room"){
      alert('Please Choose A Valide Chat Room');
    }else{
      if(this.refs.chatRoom.value === "Create New Chat Room"){
        if(this.refs.chatRoomName.value === '' || this.refs.chatRoomPassword.value === ''){
          alert("The Chat Room Name And Password Are Required");
        }else{
          let nweChatRoom={
            chatRoomName: this.refs.chatRoomName.value,
            id: uuid.v4(),
            password: this.refs.chatRoomPassword.value,
          };
          this.props.createNewChatRoom(nweChatRoom);
        }
      }else{
        console.log(this.refs.chatRoom.value);
        //this.props.joinChatRoom(nweChatRoom);
      }
    }
  }
  //-------------------------------------------------------
  selectChanged(e){
    let chatRoom = this.state.chatRoom;
    if(e.target.value === "Create New Chat Room"){
      chatRoom.name.show = 1;
      chatRoom.password.show = 1;
      chatRoom.submitBtn.label = "Create";
    }else if(e.target.value !== "Choose A Chat Room"){
      chatRoom.name.show = 0;
      chatRoom.password.show = 1;
      chatRoom.submitBtn.label = "Join";
    }else{
      chatRoom.name.show = 0;
      chatRoom.password.show = 0;
      chatRoom.submitBtn.label = "Join";
    }
    this.setState({chatRoom: chatRoom});
  }
  //-------------------------------------------------------
  render() {
    let chatRoomsOption = this.props.chatRooms.map((p, i) => {
      return (<option key={i} chatRoomId= {p.id}>{p.chatRoomName}</option>);
    });
    let chatRoomName = null;
    if(Boolean(this.state.chatRoom.name.show)){
      chatRoomName=<div>
        <label htmlFor="chatRoomName">Chat Room Name: </label>
        <input type="text" ref="chatRoomName"></input>
        <br/>
      </div>;
    }
    let chatRoomPassword = null;
    if(Boolean(this.state.chatRoom.password.show)){
      chatRoomPassword=<div>
        <label htmlFor="chatRoomPassword">Chat Room Password: </label>
        <input type="text" ref="chatRoomPassword"></input>
        <br/>
      </div>;
    }
    return (
      <div className="ChooseChatRoom">
        <header>
          <h2>Please Choose A Chat Room To Join</h2>
        </header>
        <article>
          <form onSubmit={this.joinClicked.bind(this)} action="#">
            <label htmlFor="chatRoom">Chat Rooms: </label>
            <select ref="chatRoom" onChange={this.selectChanged.bind(this)}>
              <option>Choose A Chat Room</option>
              <option value="00">Create New Chat Room</option>
              {chatRoomsOption.map((p) => {
                return (p)})}
            </select>
            <br/>
            {chatRoomName}
            {chatRoomPassword}
            <button type="submit">{this.state.chatRoom.submitBtn.label}</button>
          </form>
        </article>
        <footer></footer>
      </div>
    );
  }
}

export default ChooseChatRoom;
