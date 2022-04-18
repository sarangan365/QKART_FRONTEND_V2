import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import {useHistory, Link } from "react-router-dom";
import {useState} from "react";
const Header = ({ children, hasHiddenAuthButtons }) => {
  // for getting to previous states
  var a = {hasHiddenAuthButtons}
 const[isLog,setLog]=useState(true)
  const history = useHistory()
  // For logout purpose
  const localName = localStorage.getItem("username");
  // const localToken = localStorage.getItem("token");
  
  const logout = (a) => {
    var a = false;
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("balance");
    history.push("/");
    setLog(false)
    console.log("islog: ",isLog)
   // window.location.reload();
    return a;
  }
  const check=()=>{
    setLog("check")
    console.log("islog: ",{isLog})
  }

  if(isLog===true && history.location.pathname ==="/"){
    // to display with logot and profile
  return (
    <Box className="header-title">
      <Box className="header-title">
        <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
      >
        <Avatar source="avatar"></Avatar>
        <p>{localName}</p>
        {/* display logut button */}
        <Link to="/">
          <button type="button" onClick={logout}>
            logout
          </button>
        </Link>
        
      </Stack>
    </Box>
  );

  }else if(isLog===false && history.location.pathname ==="/"||isLog===undefined ){
    return (
          <Box className="header-title">
            <Box className="header-title">
              <img src="logo_light.svg" alt="QKart-icon"></img>
            </Box>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={2}
            >
              {/* display reg and login button button */}
              <Link to="/login">
                <button type="button">login here</button>
              </Link>
              <Link to="/register">
                <button type="button">Regsiter</button>
              </Link>
            </Stack>
          </Box>
        );

  }else if(history.location.pathname ==="/login"||history.location.pathname ==="/register"){
    // back to explore
    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        
        <Link to="/">
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
        >
          back to explore
        </Button>
        </Link>
      </Box>
    );
  }
  


  
};
    


export default Header;
