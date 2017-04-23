import React, { Component } from 'react';
import * as firebase from 'firebase';

import AddUser from './component/addUser';
import ChooseChatRoom from './component/chooseChatRoom';
import ChatRoomWindow from './component/chatRoomWindow';

class App extends Component {
  constructor(){
    super();
    this.state= {
      logedIn:0,
      setionUser:{
      },
      setionChatRoom:{
      },
      addUser:{
        show:1,
        login:'disabled'
      },
      chooseChatRoom:{
        show:0,
      },
      chatRoomWindow:{
        show:0,
      }
    }
    this.allChatRooms = [];
  }
  //-------------------------------------------------------
  //-------------------------------------------------------
  //-------------------------------------------------------
  //-------------------------------------------------------
  firebaseInit(){
    var config= {
      apiKey: "AIzaSyAsUwbtY04h-mI_qSiFB4V3ElmxJWfXTlI",
      authDomain: "bftmsnger.firebaseapp.com",
      databaseURL: "https://bftmsnger.firebaseio.com",
      projectId: "bftmsnger",
      storageBucket: "bftmsnger.appspot.com",
      messagingSenderId: "849192663251"
    };
    firebase.initializeApp(config);
  }
  //-------------------------------------------------------
  firebaseAuth(){
    var email= "react@bftawfik.com";
    var password= "react@bftawfik.com";
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode= error.code;
      var errorMessage= error.message;
      // [START_EXCLUDE]
      if (errorCode=== 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
    this.database= firebase.database();
  }
  //-------------------------------------------------------
  activateWindowAlert(){
    window.addEventListener("beforeunload", function(e){
      var textMsg = "you are Leaving !"
      console.log(textMsg);
      if(Boolean(this.state.logedIn)){
        this.removeCurrentUser();
      }
      e.preventDefault();
      e.returnValue = textMsg;
      return textMsg;
    }.bind(this));
  }
  //-------------------------------------------------------
  loginClicked(user){
    let setionUser= this.state.setionUser;
    setionUser.userName= user.userName;
    setionUser.id= user.id;
    setionUser.setionId= "null";
    this.setState({setionUser: setionUser});
    //--
    let addUser= this.state.addUser;
    addUser.show= 0;
    this.setState({addUser: addUser});
    let chooseChatRoom= this.state.chooseChatRoom;
    chooseChatRoom.show=1;
    this.setState({chooseChatRoom: chooseChatRoom});
    //--
    if(!Boolean(this.state.logedIn)){
      this.addNewUser();
    }
  }
  //-------------------------------------------------------
  addNewUser(){
    this.logedInUsers = this.database.ref().child('logedInUsers');
    this.logedInUsers.once('value').then(function(snapshot) {
      var allLogedInUsers;
      if(snapshot.val() === null){
        allLogedInUsers = [];
      }else{
        allLogedInUsers = snapshot.val();
      }
      allLogedInUsers.push(this.state.setionUser);
      this.logedInUsers.set(allLogedInUsers);
      this.setState({logedIn: 1});
    }.bind(this));
  }
  //-------------------------------------------------------
  removeCurrentUser(){
    console.log("removeCurrentUser");
    this.logedInUsers = this.database.ref().child('logedInUsers');
    this.logedInUsers.once('value').then(function(snapshot) {
      var allLogedInUsers;
      if(snapshot.val() != null){
        allLogedInUsers = snapshot.val();
        let i = allLogedInUsers.findIndex(liUser => liUser.id === this.state.setionUser.id);
        console.log(i);
        allLogedInUsers.splice(i,1);
        this.logedInUsers.set(allLogedInUsers);
      }
    }.bind(this));
  }
  //-------------------------------------------------------
  getChatRooms(){
    console.log("getChatRooms");
    this.chatRooms = this.database.ref().child('chatRooms');
    this.chatRooms.once('value').then(function(snapshot) {
      var allChatRooms = [];
      if(snapshot.val() === null){
      }else{
        allChatRooms = snapshot.val();
      }
      this.allChatRooms = allChatRooms;
    }.bind(this));
  }
  //-------------------------------------------------------
  createNewChatRoom(nweChatRoom){
    console.log("createNewChatRoom");
    let setionChatRoom= nweChatRoom;
    var cRoom = this.state.setionChatRoom;
    cRoom.chatRoomName= setionChatRoom.chatRoomName;
    cRoom.id= setionChatRoom.id;
    cRoom.password= setionChatRoom.password;
    this.setState({setionChatRoom: cRoom});
    this.chatRooms = this.database.ref().child('chatRooms');
    this.chatRooms.once('value').then(function(snapshot) {
      var allChatRooms = this.allChatRooms;
      if(snapshot.val() === null){
      }else{
        allChatRooms = snapshot.val();
      }
      allChatRooms.push(setionChatRoom);
      this.chatRooms.set(allChatRooms);
      this.showChatRoom();
    }.bind(this));
  }
  joinChatRoom(){
    console.log("joinChatRoom");
  }
  //-------------------------------------------------------
  showChatRoom(){
    let chooseChatRoom= this.state.chooseChatRoom;
    chooseChatRoom.show= 0;
    this.setState({chooseChatRoom: chooseChatRoom});
    let chatRoomWindow= this.state.chatRoomWindow;
    chatRoomWindow.show=1;
    this.setState({chatRoomWindow: chatRoomWindow});
  }
  //-------------------------------------------------------
  //-------------------------------------------------------
  //-------------------------------------------------------
  //-------------------------------------------------------
  componentWillMount(){}
  //-------------------------------------------------------
  componentDidMount(){
    this.firebaseInit();
    //
    let addUser= this.state.addUser;
    addUser.login= "";
    this.setState({addUser: addUser});
    this.activateWindowAlert();
    this.firebaseAuth();
    this.getChatRooms();
  }
  //-------------------------------------------------------
  render() {
    let addUser= null;
    if(Boolean(this.state.addUser.show)){
      addUser= <AddUser disabled={this.state.addUser.login} onSubmit={this.loginClicked.bind(this)}></AddUser>;
    }
    let chooseChatRoom= null;
    if(Boolean(this.state.chooseChatRoom.show)){
      chooseChatRoom= <ChooseChatRoom chatRooms={this.allChatRooms} createNewChatRoom={this.createNewChatRoom.bind(this)} joinChatRoom={''}></ChooseChatRoom>;
    }
    let chatRoomWindow= null;
      if(Boolean(this.state.chatRoomWindow.show)){
        chatRoomWindow= <ChatRoomWindow></ChatRoomWindow>;
      }
    return (
      <div className="App">
        {addUser}
        {chooseChatRoom}
        {chatRoomWindow}
      </div>
    );
  }
  //-------------------------------------------------------
}

export default App;
