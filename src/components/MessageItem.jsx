import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width:100%;
  height:30px;
  display:flex;
  padding-left:10px;
  align-items:center;
  background-color: ${prop => prop.bg === "dark" ? "lightgrey": "none"};
`;

const AuthorStyle = styled.span`
  font-weight:700;
`
const Author = ({name}) => (
  <AuthorStyle> {name + " : "} </AuthorStyle>
);


export default ({ message,author,bg }) => (
  <Wrapper bg={bg}>
    <Author name = {author} />
    {message}
  </Wrapper>
);
