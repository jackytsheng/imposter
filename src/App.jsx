import React from 'react';
import Page from './layout/Page';
import io from "socket.io-client";
import Login from './layout/Login';

const IP = '192.168.0.13'
const ServerIP = IP || "localhost";
const socket = io(`http://${ServerIP}:3010`);
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      username: "",
      room: "",
      chatHistory: [],
      userList: [],
      game: "",
      role: "",
      totalSeatNumber: 10,
      seatsList: [],
      isInGame: false,
      playerTurn: false,
      userID:"",
    };
    this.setLoginDetail = this.setLoginDetail.bind(this);
    this.sendMessageToServer = this.sendMessageToServer.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleChangeGame = this.handleChangeGame.bind(this);
    this.handleGameStart = this.handleGameStart.bind(this);
  }

  componentDidMount() {
    socket.on("connect_error", (reason) => {
      console.log(reason);
      console.log("navigating back to login page");
      // the disconnection was initiated by the server, you need to reconnect manually
      this.handleLogOut();
    });
    socket.on("disconnect",()=>{
       this.resetState();
    })
  }  
  handleChangeGame(gameChangeEvent){ 
    const game = gameChangeEvent.target.value;
    const {room} = this.state;
    const SendGameToServer =()=>{
      console.log("Game changed to ",game)
      socket.emit("gameSelection", { room, game });
    }
    this.setState({ game }, SendGameToServer);
  };
  resetState(){
    this.setState({
      login: false,
      username: "",
      room: "",
      chatHistory: [],
      userList: [],
      game: "",
      role: "",
      totalSeatNumber: 10,
      seatsList: [],
      isInGame: false,
      playerTurn: false,
      userID: "",
    });
  }
  handleLogOut() {
    const { username, room } = this.state;
    console.log(`${username} has logged out room ${room}`);
    socket.disconnect();
    this.resetState();
  }
  setLoginDetail(username, room) {
    this.setState(
      {
        login: true,
        username,
        room,
      },
      this.connectToSocket
    );
  }
  handleGameStart(){
    const {room,game} =this.state;
    console.log("Game Start !");
    socket.emit("gameStart",{room,game});
    this.setState({isInGame:true})
    socket.off("message");
  }

  connectToSocket() {
    let { username, room, chatHistory, isInGame } = this.state;
    chatHistory = JSON.parse(JSON.stringify(chatHistory));
    if (socket.disconnect) {
      socket.open();
    }
    socket.on("gameStart",() => {
      socket.off("message");
      this.setState({ isInGame: true });
    }
    );
    
    socket.on("message", ({ username, message }) => {
        console.log("I am receiving message ")
        chatHistory.push({ username, message });  
        this.setState({ chatHistory })
      }
    );
  
    socket.emit("joinRoom", { username, room });
    
    socket.on("userList", (userList) => {
      const {role} = userList.find(user=>user.id === socket.id);
      this.setState({ userList, role });
    });
    socket.on("gameMessage", ({ username, seat, message }) => {
      username = seat? seat + "." + username: username;
      chatHistory.push({ username, message });
      this.setState({ chatHistory });
    });
    socket.on("gameChange", (game) => {
      this.setState({ game });
    });
    socket.on("roomInfo", (roomInfo) => {
      const { seatsList, totalSeatNumber } = roomInfo;
      this.setState({ seatsList, totalSeatNumber, userID: socket.id }, () =>
        console.log(roomInfo)
      );
    });
    socket.on("GameOver", () => {
      this.setState({ isInGame: false, playerTurn: false });
    });
  }
  sendMessageToServer(message) {
    const {isInGame} = this.state;
    console.log("I am sending message to server");
    if(isInGame){
      socket.emit("gameMessage", message);
    }else{socket.emit("chatMessage", message);}
  }
  render() {
    const {
      login,
      chatHistory,
      userList,
      game,
      role,
      seatsList,
      totalSeatNumber,
      isInGame,
      playerTurn,
      userID,
    } = this.state;
    return login ? (
      <Page
        sendMessageToServer={this.sendMessageToServer}
        handleLogOut={this.handleLogOut}
        chatHistory={chatHistory ? chatHistory : []}
        userList={userList}
        game={game}
        role={role}
        playerTurn={playerTurn}
        isInGame={isInGame}
        userID={userID}
        seatsList={seatsList}
        totalSeatNumber={totalSeatNumber}
        handleChangeGame={this.handleChangeGame}
        handleGameStart={this.handleGameStart}
      />
    ) : (
      <Login setLoginDetail={this.setLoginDetail} />
    );
  }
}

export default App;