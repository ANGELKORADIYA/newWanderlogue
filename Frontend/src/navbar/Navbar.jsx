import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  InputBase,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import logo from "./logo.png";
import { toast } from "react-toastify";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  flexGrow: 1,
  background: "linear-gradient(135deg, #110011, #111a50)",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  zIndex: 10000,
}));

const StyledMenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  fontWeight: "bold",
}));

const StyledSearch = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledSearchIcon = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  padding: theme.spacing(0.5, 0.5, 0.5, 0.5),
  paddingLeft: `calc(1em + ${theme.spacing(3.5)})`,
  transition: theme.transitions.create("width"),
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "20ch",
  },
}));

const StyledLogo = styled("img")(({ theme }) => ({
  height: 40,
  marginRight: theme.spacing(2),
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    color: theme.palette.common.white,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: "inherit",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
}));

const Navbar = ({
  setIsSidebarActive,
  isSidebarActive,
  isAuthenticated,
  changecookie,
}) => {
  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  // useEffect(() => {
  //   changecookie(document.cookie);
  // }, [changecookie]);

  const handleLogout = () => {
    document.cookie = "token=;expires=" + new Date().toUTCString();
    toast.success("Logged out successfully!", { position: "bottom-center" });
    
    changecookie(document.cookie);
    window.location.reload();

  };

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Box display="flex" alignItems="center">
          <StyledMenuButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar}
          >
            <MenuIcon />
          </StyledMenuButton>
          <StyledLogo src={logo} alt="Wanderlogue Logo" />
          <StyledTitle variant="h6">Wanderlogue</StyledTitle>
        </Box>
        <StyledSearch>
          <StyledSearchIcon>
            <SearchIcon />
          </StyledSearchIcon>
          <StyledInputBase
            placeholder="Search..."
            inputProps={{ "aria-label": "search" }}
          />
        </StyledSearch>
        <Box display="flex" alignItems="center">
          <StyledLink to="/dashboard">
            <StyledButton>Home</StyledButton>
          </StyledLink>
          <StyledLink to="/createpost">
            <StyledButton>Create Post</StyledButton>
          </StyledLink>
          <StyledLink to="/yourpost">
            <StyledButton>Your Post</StyledButton>
          </StyledLink>
          <StyledLink to="/yourfavorite">
            <StyledButton>Your Likes</StyledButton>
          </StyledLink>
          <StyledLink to="/yourcomment">
            <StyledButton>Your Comments</StyledButton>
          </StyledLink>
        </Box>
        <Box display="flex" alignItems="center">
          {isAuthenticated ? (
            <>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <StyledButton onClick={handleLogout}>Logout</StyledButton>
            </>
          ) : (
            <>
              <StyledLink to="/login">
                <StyledButton>Login</StyledButton>
              </StyledLink>
              <StyledLink to="/signup">
                <StyledButton>Signup</StyledButton>
              </StyledLink>
            </>
          )}
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Navbar;
