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
      chatHistory:[],
      userList:[],
    }
    this.setLoginDetail = this.setLoginDetail.bind(this);
    this.sendMessageToServer = this.sendMessageToServer.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount(){
    socket.on("connect_error", (reason) => {
      console.log(reason);
      console.log("navigating back to login page")
        // the disconnection was initiated by the server, you need to reconnect manually
        this.handleLogOut();
    });
    
  }
  handleLogOut(){
    const {username,room} = this.state;
    console.log(`${username} has logged out room ${room}`);
    socket.disconnect();
    this.setState({ login: false, username: "", room: "",chatHistory:[] });
  }
  setLoginDetail(username,room){
    this.setState({
      login:true,username,room,
    },this.connectToSocket)
  }
  connectToSocket(){
    let { username, room, chatHistory } = this.state;
    chatHistory = JSON.parse(JSON.stringify(chatHistory));
    if(socket.disconnect){
      socket.open();
    }
    socket.emit("joinRoom", { username, room });
    socket.on("message", ({username,message}) => {
      chatHistory.push({ username, message });
      this.setState({ chatHistory });
    });
    socket.on("userList",userList=>{
      this.setState({userList})
    })
  }
  sendMessageToServer(message){
    console.log("I am sending message to server")
    socket.emit("chatMessage",message);
  }
  render(){
    const { login, chatHistory, userList } = this.state; 
    return login ? (
      <Page
        sendMessageToServer={this.sendMessageToServer}
        handleLogOut={this.handleLogOut}
        chatHistory={chatHistory ? chatHistory : []}
        userList={userList}
      />
    ) : (
      <Login setLoginDetail={this.setLoginDetail} />
    );
  }
}

export default App;