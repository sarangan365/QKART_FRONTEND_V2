import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  Grid,
  IconButton,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";
// eslint-disable-next-line
import { Logout, Person } from "@mui/icons-material";

const Header = ({ children, hasHiddenAuthButtons }) => {
  const history = useHistory();
  // by clearing the local storage then no token and user name will be found then u should go to reg or login
  const handleLogOut = () => {
    localStorage.clear();
    //upon reloading page will be refresh to show login or register
    window.location.reload();
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickAvatar = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopup = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box className="header">
      <Box className="header-title" onClick={() => history.push("/")}>
        <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      {children}
      <Box>
        {/* If this hasHiddenAuthButton is true value by props passed corresponding to the page 
        if true(set backtoexplore button
        else if(localstorage has token  and username) dothis ===>(display logout with profile pic)else ===>(display login and register in product page) */}
        {hasHiddenAuthButtons ? (
          <Button
            className="explore-button"
            startIcon={<ArrowBackIcon />}
            variant="text"
            onClick={() => history.push("/")}
          >
            BACK TO EXPLORE
          </Button>
        ) : (
          <Box>
            {localStorage.getItem("username") &&
            localStorage.getItem("token") ? (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <IconButton onClick={handleClickAvatar} sx={{ padding: 0 }}>
                  <img
                    style={{
                      height: "80%",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                    src="avatar.png"
                    alt={localStorage.getItem("username")}
                  />
                </IconButton>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClosePopup}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <Box sx={{ padding: "1rem" }}>
                    <Typography sx={{ marginBottom: "0.5rem" }}>
                      {localStorage.getItem("username").split(" ")[0]}
                    </Typography>
                    <Button
                      variant="text"
                      onClick={() => {
                        handleClosePopup();
                        handleLogOut();
                      }}
                      startIcon={<Logout />}
                    >
                      Logout
                    </Button>
                  </Box>
                </Popover>
              </Box>
            ) : (
              <Grid item>
                <Stack direction="row" spacing={1}>
                  <Button variant="text" onClick={() => history.push("/login")}>
                    LOGIN
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => history.push("/register")}
                  >
                    REGISTER
                  </Button>
                </Stack>
              </Grid>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Header;
