import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  Grid,
  Stack,
  Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {
  const history = useHistory();
// by clearing the local storage then no token and user name will be found then u should go to reg or login
  const handleLogOut = () => {
    localStorage.clear();
    //upon reloading page will be refresh to show login or register
    window.location.reload();
  };

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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginRight: "5px",
                    marginBottom: "1px",
                  }}
                >
                  <img
                    style={{
                      height: "30px",
                      marginTop: "15px",
                      marginRight: "10px",
                    }}
                    src="avatar.png"
                    alt={localStorage.getItem("username")}
                  ></img>
                  <Typography sx={{maxWidth: "8rem"}} my="1rem">{localStorage.getItem("username").split(" ")[0]}</Typography>
                </Box>
                <Button variant="text" onClick={() => handleLogOut()}>
                  LOGOUT
                </Button>
              </Box>
            ) : (
              <Grid item>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="text"
                        onClick={() => history.push("/login")}
                      >
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
