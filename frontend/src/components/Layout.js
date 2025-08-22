import React from "react";
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useTheme } from "../contexts/ThemeContext";
import Footer from "./Footer";

const Layout = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.default",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: { xs: 2, sm: 4 },
          bgcolor: "background.default",
          width: "100%",
          px: { xs: 0, sm: 0 },
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
          <Outlet />
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
