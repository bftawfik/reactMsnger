import React, { Component } from 'react';
import uuid from 'uuid';
class AddUser extends Component {
  // constructor(){
  //   super();
  // }
  //-------------------------------------------------------
  loginClicked(e){
    e.preventDefault();
    if(this.refs.userName.value=== ''){
      alert("The User Name is Required");
    }else{
      let user= {
        userName: this.refs.userName.value,
        id: uuid.v4(),
      }
      this.props.onSubmit(user);
    }
  }
  //-------------------------------------------------------
  render() {
    return (
      <div className="AddUser">
        <header>
          <h2>Please Insert Your User Name</h2>
        </header>
        <article>
          <form onSubmit={this.loginClicked.bind(this)} action="#">
            <label htmlFor="userName">User Name: </label>
            <input type="text" ref="userName"></input>
            <br/>
            <button type="submit" disabled={this.props.disabled}>Log-in</button>
          </form>
        </article>
        <footer></footer>
      </div>
    );
  }
}

export default AddUser;
