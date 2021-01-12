import React from "react";
import styled from "styled-components";
import MessageItem from './MessageItem';
const Wrapper = styled.div`
  border: red solid 1px;
  flex:1;
`;

export default () => (
  <Wrapper>
    <MessageItem author="Jacky" message="Hello World !" bg="dark" />
    <MessageItem author="Cindy" message="Hello World 2 !" />
  </Wrapper>
);

