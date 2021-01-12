import React from 'react';
import styled from "styled-components";
import ChatSpace from "../components/ChatSpace";
import InputField from "../components/InputField";

const ChatWrapper = styled.div`
  border:black solid 2px;
  width:100%;
  height:100%;
  display:flex;
  flex-direction: column;
  padding:15px;
`


export default () => 
  <ChatWrapper>
    <ChatSpace/>
    <InputField/>
  </ChatWrapper>