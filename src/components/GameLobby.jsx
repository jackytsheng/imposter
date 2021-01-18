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
  width: 150px;
  display:flex;
  justify-content:center;
  align-items:center;
  border: 1px blue solid;
`;

const generatePlayer = (playerList) => {

  return playerList.map((playerInfo,i) => <PlayerSlot key={"player_slot" + i}>
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


const InputGroup = ({ game, handleChangeGame, handleLogOut, role }) => {
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
          disabled = {role === "player"}
          label="Select Game"
          onChange={handleChangeGame}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="mafia">Mafia</MenuItem>
          <MenuItem value="imposter">Imposter</MenuItem>
          <MenuItem value="avalon">Avalon</MenuItem>
        </Select>
      </FormControl>
      {role === "admin" ? <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => console.log("Game Start !")}
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
      </ButtonGroup> : null
      }

      <Button variant="outlined" onClick={handleLogOut}>
        Log Out
      </Button>
    </InputGroupContainer>
  );
};

export default (props) => (
  <Center>
    <CenterSquare>{generatePlayer(props.userList)}</CenterSquare>

    <InputGroup {...props}/>
  
  </Center>
);