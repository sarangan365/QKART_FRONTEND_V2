import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import {useHistory,Link} from 'react-router-dom';
import {useState} from 'react';


const Header = ({ children, hasHiddenAuthButtons }) => {

    const history = useHistory();
    const [islog,setlog] = useState();
    const logout = ()=>{
      localStorage.removeItem('username');
      localStorage.removeItem('token');
      localStorage.removeItem('balance');
      history.push("/");
      window.location.reload();
      setlog(false);

    }
    const username = localStorage.getItem('username');
    return (
      
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        
        { !hasHiddenAuthButtons  &&
          <>
          <Link to="/">
          <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={()=>{history.push("/")}}
        >
          Back to explore
        </Button>
        </Link>
        </>
        }
        {/* for logged in users Products page view */}
        {
          hasHiddenAuthButtons &&  localStorage.getItem('username') && 
          <div>
            <Stack
  direction="row"
  justifyContent="flex-end"
  alignItems="center"
  spacing={2}
>
            <Avatar alt={username} username={username} src="avatar.png" />
        <p>{username}</p>
        <Link to="/">

        <Button type="Button" onClick={logout}>

        LOGOUT

        </Button> 

        </Link>
        </Stack>

            </div>
        }
        {
          hasHiddenAuthButtons && !localStorage.getItem('username') &&
            <div>
              <Stack
 direction="row"
 justifyContent="flex-end"
 alignItems="center"
 spacing={4}
>
            <Link to="/register">
            <Button className="button" variant="contained" onClick={()=>{history.push("/register")}}>REGISTER</Button>
            </Link>
            
            <Link to="/login">
            <Button className="button" variant="contained" onClick={()=>{ history.push("/login")}}>LOGIN</Button>
            </Link>
            </Stack>
            </div>
           
        }
      </Box>
      

    );
};

export default Header;