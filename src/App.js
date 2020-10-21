import React from 'react';
import styled from 'styled-components';

const Center = styled.div`
  display:flex;
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  justify-content:center;
  align-items:center;
`
const CenterSquare = styled.div`
  width:300px;
  height:300px;
  border: solid 1px red;
  display:flex;
  flex-direction:column;
  flex-wrap:wrap;
  justify-content:center;
  align-items:center;
`

const PLAYER_COUNT = 10;
const PlayerSlot = styled.div`
  width:100px;
  height:50px;
  border: 1px blue solid;
`

const generatePlayer = ()=>{
  let renderResult =[];
  for (let i = 0; i<PLAYER_COUNT; i++ ){
    renderResult.push(
      <PlayerSlot key = {"player_slot" + i}/>
      
    )
  }


  return renderResult;
}

export default () => 
<Center>
  <CenterSquare>
    {generatePlayer()}
  </CenterSquare>  
</Center>