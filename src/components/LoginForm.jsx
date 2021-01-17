import React from "react";
import styled from "styled-components";
import {TextField, Button} from '@material-ui/core';

const LoginContainer = styled.form`
  width: 300px;
  padding: 50px;
  padding-bottom:20px;
  border-radius: 20px;
  box-shadow: 3px 6px 19px -2px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", room: "" , inValidUserName:false, inValidRoomId:false,};

    this.handleChangeRoomID = this.handleChangeRoomID.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUserName(event) {
    this.setState({ username: event.target.value, inValidUserName: false });
  }
  handleChangeRoomID(event) {
    this.setState({ room: event.target.value,inValidRoomId:false});
  }

  isFormValid(){
    let validForm = true;
    validForm = this.validateName();
    validForm = this.validateRoomID() && validForm;
    return validForm;
  }
  validateName(){
    const { username } = this.state;
    const regex = RegExp(/^[a-zA-Z ]*$/);
    if(username && username.trim() && regex.test(username.trim())){
      return true;
    }else{
      this.setState({inValidUserName:true});
      return false;
    }
  }
  validateRoomID(){
    const { room } = this.state;
    const regex = RegExp(/^[0-9]{4}$/);
   if(room && regex.test(room)){
     return true;
    }else{
      this.setState({inValidRoomId:true});
      return false;
    }
  }

  handleSubmit(event) {
    const {username,room} = this.state;
    event.preventDefault();
    if (this.isFormValid()) {
      console.log(`${username} joined room ${room}`);
      this.props.setLoginDetail(username.trim(), room);
      this.setState({ username: "", room: "", inValidUserName:false, inValidRoomId:false, });
    }
  }

  render() {
    const {username,room,inValidUserName,inValidRoomId} = this.state;
    return (
      <LoginContainer onSubmit={this.handleSubmit} autoComplete="off">
        <div>
          <TextField
            error={inValidUserName}
            helperText={inValidUserName ? "Invalid Name Entry." : " "}
            id="outlined-basic"
            type="text"
            label="Name"
            variant="outlined"
            value={username}
            onChange={this.handleChangeUserName}
          />
        </div>
        <div>
          <TextField
            error={inValidRoomId}
            helperText={inValidRoomId ? "Invalid Room ID Entry." : " "}
            id="outlined-basic"
            type="text"
            label="Room ID"
            variant="outlined"
            value={room}
            onChange={this.handleChangeRoomID}
          />
        </div>
          <Button variant="outlined" color="primary"  type="submit"
          disabled={
            !this.state.room ||
            !this.state.username ||
            !this.state.username.trim() ||
            !this.state.room.trim()
          }>
            Join Room
          </Button>
      </LoginContainer>
    );
  }
}

export default (props) => <LoginForm {...props} />;
