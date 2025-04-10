import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  InputAdornment,
  TextField,
  IconButton,
  Avatar,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Search as SearchIcon,
  AccountCircle as ProfileIcon,
} from "@mui/icons-material";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../application/context/AuthContext";

const Navbar = () => {
  const { user, isLoggedIn, logout, setLocalData } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleLogoutClick = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "black", color: "white", boxShadow: "none" }}
    >
      <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo Image */}
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            height: 40,
            flexGrow: 1,
            maxWidth: 150,
            objectFit: "contain",
          }}
        />

        {/* Navigation Links */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginRight: "20px",
            alignItems: "center",
          }}
        >
          <Button
            color="inherit"
            component="a"
            href="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            HOME
          </Button>
          <Button color="inherit" component={Link} to="/my-recipes">
            MY RECIPES
          </Button>
          <Button color="inherit" component={Link} to="/favorites">
            FAVORITES
          </Button>
          <Button color="inherit" component={Link} to="/add">
            ADD NEW
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            CONTACT
          </Button>
        </div>

        {/* Search Bar and Profile Dropdown */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "white" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
                width: "200px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "white",
                "& fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.3)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.5)",
                },
              },
              "& .MuiInputBase-input": {
                color: "white",
                "&::placeholder": {
                  color: "rgba(255, 255, 255, 0.7)",
                  opacity: 1,
                },
              },
            }}
          />
          {/* Welocome Message */}
          {isLoggedIn ? (
            <div>
              <p>Hi, {user?.name || "User"}</p>
            </div>
          ) : (
            <p>Guest </p>
          )}

          {/* Profile Icon with Dropdown */}
          <IconButton onClick={handleOpenMenu} color="inherit" sx={{ p: 0 }}>
            <Avatar sx={{ bgcolor: "#ff5722" }}>
              <ProfileIcon />
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {!isLoggedIn ? (
              <div>
                <MenuItem
                  component={Link}
                  to="/login"
                  onClick={handleCloseMenu}
                >
                  Login
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/signup"
                  onClick={handleCloseMenu}
                >
                  Sign Up
                </MenuItem>
              </div>
            ) : (
              <MenuItem component={Link} to="/" onClick={handleLogoutClick}>
                Logout
              </MenuItem>
            )}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
