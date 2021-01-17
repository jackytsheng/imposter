import React from 'react';
import styled from "styled-components";

const Center = styled.div`
  padding: 30px;
`;
const CenterSquare = styled.div`
  width: 300px;
  height: 300px;
  padding:5px;
  border: solid 1px red;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const MAX_PLAYER_COUNT = 10;

const PlayerSlot = styled.div`
  width: 100px;
  display:flex;
  justify-content:center;
  align-items:center;
  border: 1px blue solid;
`;

const generatePlayer = (playerList) => {

  return playerList.map((playerInfo,i) => <PlayerSlot key={"player_slot" + i}>
    {playerInfo.username}
  </PlayerSlot>);
};

const LogOutBtn = styled.button`
  margin-top:20px;
  height:30px;
  width :100px;
  cursor:pointer;
`

export default (props) => (
  <Center>
    <CenterSquare>{generatePlayer(props.userList)}</CenterSquare>
    <LogOutBtn onClick={props.handleLogOut}>Log Out</LogOutBtn>
  </Center>
);