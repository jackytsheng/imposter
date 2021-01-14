import React from 'react';
import styled from 'styled-components'
import GameLobby from '../components/GameLobby';
import ChatScreen from "./ChatScreen";
const PageLayout = styled.div`
  position:fixed;
  top:0;
  bottom:0;
  right:0;
  left:0;
  display:flex;

`

export default (props) => (
  <PageLayout>
    <GameLobby {...props}/>
    <ChatScreen {...props}/>
  </PageLayout>
);