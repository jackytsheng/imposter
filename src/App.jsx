import React from 'react';
import Page from './layout/Page';
import io from "socket.io-client";
import Login from './layout/Login';

const IP = '192.168.0.13'
const ServerIP = IP || "localhost";
const socket = io(`http://${ServerIP}:3010`);

class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      login:false,
      username: "",
      room: "",
    }
    this.setLoginDetail = this.setLoginDetail.bind(this);
    this.sendMessageToServer = this.sendMessageToServer.bind(this);
  }

  componentDidMount(){
    // socket.on("message", (message) => {
    //   console.log("connection established");
    //   console.log("server says:", message);
    // });
    
  }
  setLoginDetail(username,room){
    this.setState({
      login:true,username,room,
    },this.connectToSocket)
  }
  connectToSocket(){
    const {username,room} = this.state;
    socket.emit("joinRoom", { username, room });
  
  }
  sendMessageToServer(message){
    console.log("I am sending message to server")
    socket.emit("chatMessage",message);
  }
  render(){
    const {login} = this.state; 
    return login ? <Page sendMessageToServer={this.sendMessageToServer} /> : <Login setLoginDetail={this.setLoginDetail}/>
  }
}

export default App;