import React from "react";
import styled from "styled-components";
import MessageItem from './MessageItem';
const Wrapper = styled.div`
  border: red solid 1px;
  flex:1;
`;

export default ({ chatHistory }) => (
  <Wrapper>
    {chatHistory.map((messageItem, lineNumber) => (
      <MessageItem key={lineNumber} author={messageItem.username} message={messageItem.message} bg={lineNumber%2 === 0} />
    ))}
  </Wrapper>
);

