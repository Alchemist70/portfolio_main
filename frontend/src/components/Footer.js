import React from "react";
import { Box, Typography, Link, IconButton, Stack } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import AnimatedContainer from "./AnimatedContainer";

const Footer = () => {
  return (
    <AnimatedContainer delay={0.3} y={30}>
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          py: { xs: 2, sm: 3 },
          px: { xs: 1, sm: 2 },
          mt: "auto",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: { xs: 2, sm: 0 },
          textAlign: { xs: "center", sm: "left" },
        }}
      >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="center"
        alignItems="center"
        mb={1}
      >
        <IconButton
          component={Link}
          href="https://github.com/Alchemist70" // TODO: Replace with your GitHub
          target="_blank"
          rel="noopener"
          aria-label="GitHub"
          sx={{ color: "inherit" }}
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          component={Link}
          href="https://linkedin.com/in/abbas-abdulhadi" // TODO: Replace with your LinkedIn
          target="_blank"
          rel="noopener"
          aria-label="LinkedIn"
          sx={{ color: "inherit" }}
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          component={Link}
          href="mailto:abdulhadiakanni@gmail.com" // TODO: Replace with your email
          aria-label="Email"
          sx={{ color: "inherit" }}
        >
          <EmailIcon />
        </IconButton>
      </Stack>
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        &copy; {new Date().getFullYear()} Abdulhadi Abbas Akanni. All rights
        reserved.
      </Typography>
      <Typography variant="caption" sx={{ opacity: 0.7 }}>
        Built with React, Material-UI, Node.js, and MongoDB
      </Typography>
      </Box>
    </AnimatedContainer>
  );
};

export default Footer;
