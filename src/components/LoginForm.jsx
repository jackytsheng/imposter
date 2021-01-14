import React from "react";
import styled from "styled-components";

const LoginContainer = styled.form`
  width: 300px;
  height: 500px;
  padding: 20px;
  border:solid 2px black;
  display: flex;
  flex-direction:column;
  justify-content:space-between;
  align-items:center;
  
`;

const InputField = styled.input`
  width: 200px;
  height: 30px;
`;

const SubmitBtn = styled.button`
  width:100px;
  height:30px;
  cursor:pointer;
`

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", room: "" };

    this.handleChangeRoomID = this.handleChangeRoomID.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUserName(event) {
    this.setState({ username: event.target.value });
  }
  handleChangeRoomID(event) {
    this.setState({ room: event.target.value });
  }

  handleSubmit(event) {
    const {username,room} = this.state;
    event.preventDefault();
    console.log(`${username} joined room ${room}`);
    this.props.setLoginDetail(this.state.username,this.state.room);
    this.setState({ username: "", room: "" });
  }

  render() {
    const {username,room} = this.state;
    return (
      <LoginContainer onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="username">User Name</label>
          <InputField
            type="text"
            id="username"
            placeholder="Enter Name"
            value={username}
            onChange={this.handleChangeUserName}
          />
        </div>
        <div>
          <label htmlFor="roomID">Room ID</label>
          <InputField
            type="text"
            id="roomID"
            placeholder="Enter Room ID"
            value={room}
            onChange={this.handleChangeRoomID}
          />
        </div>
        <SubmitBtn
          type="submit"
          value="Submit"
          disabled={
            !this.state.room ||
            !this.state.username ||
            !this.state.username.trim() ||
            !this.state.room.trim()
          }
        >
          Join Room
        </SubmitBtn>
      </LoginContainer>
    );
  }
}

export default (props) => <LoginForm {...props} />;
