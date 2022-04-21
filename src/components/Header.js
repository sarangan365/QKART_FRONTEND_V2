import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {
  const history = useHistory();

  const handleLogOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Box className="header">
      <Box className="header-title" onClick={() => history.push("/")}>
        <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      {children}
      <Box>
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
              <Box>
                <Button variant="text" onClick={() => history.push("/login")}>
                  LOGIN
                </Button>
                <Button
                  variant="contained"
                  onClick={() => history.push("/register")}
                >
                  REGISTER
                </Button>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Header;
