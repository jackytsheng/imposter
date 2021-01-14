import React from "react";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";

const LoginWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content:center;
  align-items:center;
`;

export default (props) => (
  <LoginWrapper>
    <LoginForm {...props} />
  </LoginWrapper>
);
