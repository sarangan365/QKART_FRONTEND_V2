import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// eslint-disable-next-line
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import { useHistory, Link } from "react-router-dom";


const Header = ({ children, hasHiddenAuthButtons }) => {
  const history = useHistory();
  
  const backtoEx=(<Box className="header">
  <Box className="header-title">
      <img src="logo_light.svg" alt="QKart-icon"></img>
  </Box>
  <Button
    className="explore-button"
    startIcon={<ArrowBackIcon />}
    variant="text"
    onClick={() => {
     history.push("/");
 }}
  >
    Back to explore
  </Button>
</Box>);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("balance");
    history.push("/");
  }
  const check =(props)=>{
    console.log(history.location.pathname)

  }
  if(history.location.pathname === "/"){
    
      return(
      <Box className="header">
      <Box className="header-title">
          <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      <h1>{hasHiddenAuthButtons} </h1>
        <Button
        className="explore-button"
        startIcon={<ArrowBackIcon />}
        variant="text"
        onClick={() => {
        history.push("/");
        }}
        >
        Back to explore
        </Button>
      
      <Link to="/login">
      <button type="button">
        login here
      </button>
      </Link>

      <Link to="/register">
      <button type="button">
      Regsiter
      </button>
      </Link>
   
   <button type="button"onClick={check}>
      check
    </button>
  </Box>)

  }
  else if(history.location.pathname=="/login"||history.location.pathname=="/register")
  {
              return (
                backtoEx
              );
    }
    // else if(history.location.pathname=="/success"){
    //   return(
    //     <Box className="header-title"> 
    //       <Box className="header-title">
    //       <img src="logo_light.svg" alt="QKart-icon"></img>
    //   </Box>
    //     <Link to="/login">
    //     <button type="button"onClick={logout}>
    //     logout
    //     </button>
    //     </Link>
    //     </Box>
    //   );
    // }
  };


export default Header;
 {/* <Button
        className="explore-button"
        startIcon={<ArrowBackIcon />}
        variant="text"
        onClick={() => {
          history.push("/");
      }}
    >
      Back to explore
    </Button>

  <React.Fragment>
  <Link to="/login">
    <button type="button">
     login here
        </button>
  </Link>
  <Link to="/register">
    <button type="button">
      Regsiter
    </button>
  </Link>
  <Link to="/login">
    <button type="button"onClick={logout}>
      logout
    </button>
  </Link>
    <button type="button"onClick={check}>
      check
    </button>
  
  
  </ React.Fragment> */}