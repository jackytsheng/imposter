import React from 'react';
import styled from "styled-components";
import {
  Select,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  ButtonGroup,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserPlus,faCrown,faUser} from '@fortawesome/free-solid-svg-icons'

const MATERIAL_UI_PRIMARY_COLOR = "#4152b6";
const MATERIAL_UI_GREY_COLOR = "#c4c4c4";
const Center = styled.div`
  padding: 30px;
`;
const CenterSquare = styled.div`
  width: 308px;
  height: 264px;
  border-radius: 10px;
  border: dashed 2px ${MATERIAL_UI_GREY_COLOR};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const MAX_PLAYER_COUNT = 10;

const PlayerSlot = styled.div`
  width: 140px;
  margin: 10px 5px;
  height: 30px;
  display: flex;
  color:${MATERIAL_UI_PRIMARY_COLOR};
  justify-content: center;
  align-items: center;
  border-radius:10px;
  border:1px solid ${MATERIAL_UI_PRIMARY_COLOR};
`;
const IconContainer = styled.div`
  font-size:16px;
  width:50px;
  display:flex;
  justify-content:center;
  align-items:center;
`
const NameTag = styled.div`
  font-size:16px;
  flex:1;
`

const generateSeat = (totalSeat,seatsList)=>{
  let seatArray = Array(totalSeat).fill(undefined);
      seatsList.forEach(seat=>{
        //seat number is 1 more than index
        seatArray[seat.seatNumber-1] = seat.player;
      }
    )
  return seatArray.map((playerInfo,i) => {
    if(playerInfo){
      return (
        <PlayerSlot key={"player_slot" + i}>
          <IconContainer>
            {playerInfo.role === "admin" ? (
              <FontAwesomeIcon icon={faCrown} />
            ) : (
              <FontAwesomeIcon icon={faUser} />
            )}
          </IconContainer>
          <NameTag>{playerInfo.username}</NameTag>
        </PlayerSlot>
      );
    }else{
       return (
         <PlayerSlot key={"player_slot" + i}>
           <IconContainer>
             <FontAwesomeIcon icon={faUserPlus} />
           </IconContainer>
           <NameTag></NameTag>
         </PlayerSlot>
       );
    }
  })
}


const generatePlayer = (playerList) => {

  return playerList.map((playerInfo,i) => 
  <PlayerSlot key={"player_slot" + i}>
    {playerInfo.username + `${playerInfo.role === "admin"?" (admin)":""}`}
  </PlayerSlot>);
};


const InputGroupContainer = styled.div`
  width:100%;
  height:250px;
  padding-top:20px;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  align-items:center;
  div,button {
    width:100%;
  }
`


const InputGroup = ({
  game,
  handleChangeGame,
  handleLogOut,
  role,
  handleGameStart,
}) => {
  return (
    <InputGroupContainer>
      <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">
          Select Game
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={game}
          disabled={role === "player"}
          label="Select Game"
          onChange={handleChangeGame}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="mafia">Mafia</MenuItem>
          <MenuItem value="imposter">Imposter</MenuItem>
          <MenuItem value="avalon">Avalon</MenuItem>
        </Select>
      </FormControl>
      {role === "admin" ? (
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleGameStart}
            disabled={!game}
          >
            Game Start
          </Button>

          {game === "imposter" ? (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => console.log("Game Setting Click !")}
            >
              Setting
            </Button>
          ) : null}
        </ButtonGroup>
      ) : null}

      <Button variant="outlined" onClick={handleLogOut}>
        Log Out
      </Button>
    </InputGroupContainer>
  );
};

export default (props) => (
  <Center>
    <CenterSquare>
      {generateSeat(props.totalSeatNumber, props.seatsList)}
    </CenterSquare>

    <InputGroup {...props} />
  </Center>
);