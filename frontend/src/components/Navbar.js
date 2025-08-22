import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AnimatedContainer from "./AnimatedContainer";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigationItems = [
    { text: "Home", path: "/" },
    { text: "Projects", path: "/projects" },
    { text: "Certificates", path: "/certificates" },
    { text: "Publications", path: "/publications" },
    { text: "Blog", path: "/blog" },
    { text: "Contact", path: "/contact" },
    { text: "About", path: "/about" },
  ];

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#1976d2" }}>
          My Portfolio
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navigationItems.map((item) => (
          <ListItem
            key={item.text}
            component={RouterLink}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{
              borderRadius: "12px",
              margin: "4px 8px",
              border: "1px solid rgba(25, 118, 210, 0.2)",
              background: "rgba(25, 118, 210, 0.05)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                backgroundColor: "rgba(25, 118, 210, 0.1)",
                border: "1px solid rgba(25, 118, 210, 0.4)",
                transform: "translateX(4px)",
              },
            }}
          >
            <ListItemText
              primary={item.text}
              sx={{
                "& .MuiListItemText-primary": {
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: "#1976d2",
                },
              }}
            />
          </ListItem>
        ))}
        <ListItem sx={{ justifyContent: "center", mt: 2 }}>
          <IconButton
            onClick={toggleDarkMode}
            sx={{
              borderRadius: "12px",
              border: "1px solid rgba(25, 118, 210, 0.2)",
              background: "rgba(25, 118, 210, 0.05)",
              color: "#1976d2",
              "&:hover": {
                backgroundColor: "rgba(25, 118, 210, 0.1)",
                border: "1px solid rgba(25, 118, 210, 0.4)",
              },
            }}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AnimatedContainer delay={0.1} y={-20}>
        <AppBar
          position="fixed"
          sx={{
            px: { xs: 1, sm: 2 },
            py: { xs: 0.5, sm: 1 },
            background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
            boxShadow: "0 4px 20px rgba(25, 118, 210, 0.15)",
            backdropFilter: "blur(10px)",
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar
            sx={{
              flexDirection: { xs: "row", sm: "row" },
              alignItems: "center",
              gap: { xs: 1, sm: 2 },
            }}
          >
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: "none",
                color: "inherit",
                fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.8rem" },
                fontWeight: 700,
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  textShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  transform: "scale(1.02)",
                },
              }}
            >
              My Portfolio
            </Typography>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: { xs: 1, sm: 2 },
                }}
              >
                {navigationItems.map((item) => (
                  <Button
                    key={item.text}
                    color="inherit"
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                      fontWeight: 600,
                      textTransform: "none",
                      px: { xs: 1.5, sm: 2 },
                      py: { xs: 0.5, sm: 1 },
                      borderRadius: "12px",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        border: "1px solid rgba(255, 255, 255, 0.4)",
                        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                        transform: "translateY(-2px) scale(1.05)",
                      },
                      "&:active": {
                        transform: "translateY(0px) scale(1.02)",
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
                <IconButton
                  sx={{
                    ml: 1,
                    fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" },
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      border: "1px solid rgba(255, 255, 255, 0.4)",
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                      transform: "translateY(-2px) scale(1.05)",
                    },
                    "&:active": {
                      transform: "translateY(0px) scale(1.02)",
                    },
                  }}
                  onClick={toggleDarkMode}
                  color="inherit"
                >
                  {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Box>
            )}

            {/* Mobile Hamburger Menu */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    border: "1px solid rgba(255, 255, 255, 0.4)",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                    transform: "translateY(-2px) scale(1.05)",
                  },
                  "&:active": {
                    transform: "translateY(0px) scale(1.02)",
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </AnimatedContainer>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 250,
            background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
            borderLeft: "1px solid rgba(25, 118, 210, 0.1)",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Spacer to prevent content from hiding under fixed header */}
      <Toolbar />
    </>
  );
};

export default Navbar;
