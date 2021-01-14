import React from 'react';
import styled from "styled-components";

const Center = styled.div`
  padding: 30px;
`;
const CenterSquare = styled.div`
  width: 300px;
  height: 300px;
  border: solid 1px red;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
const PLAYER_COUNT = 10;
const PlayerSlot = styled.div`
  width: 100px;
  height: 50px;
  border: 1px blue solid;
`;

const generatePlayer = () => {
  let renderResult = [];
  for (let i = 0; i < PLAYER_COUNT; i++) {
    renderResult.push(<PlayerSlot key={"player_slot" + i} />);
  }

  return renderResult;
};

const LogOutBtn = styled.button`
  margin-top:20px;
  height:30px;
  width :100px;
  cursor:pointer;
`

export default (props) => (
  <Center>
    <CenterSquare>{generatePlayer()}</CenterSquare>
    <LogOutBtn onClick = {props.handleLogOut}>
      Log Out
    </LogOutBtn>
  </Center>
);