import React from "react";
import styled from "styled-components";

const FormWrapper = styled.form`
  width: 100%;
  height: 100%;
  height:40px;
  width:100%;
  display:flex;
`;
const SendMessageBtn = styled.button`
  width:100px;
  height:100%;
`
const InputSpace = styled.input`
  flex:1;
`

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    console.log("Submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <FormWrapper onSubmit={this.handleSubmit}>
        <InputSpace
          type="text" 
          value={this.state.value}
          onChange={this.handleChange}
          />
        <SendMessageBtn type="submit" value="Submit">
          Send
        </SendMessageBtn>
      </FormWrapper>
    );
  }
}

export default () => (
    <MessageForm/>
);
