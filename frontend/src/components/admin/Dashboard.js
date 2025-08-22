import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Tabs,
  Tab,
  Alert,
  Avatar,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import ProjectsManager from "./ProjectsManager";
import CertificatesManager from "./CertificatesManager";
import PublicationsManager from "./PublicationsManager";
import BlogManager from "./BlogManager";
import AboutManager from "./AboutManager";
import { api } from "../../services/api";

const Dashboard = () => {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState(0);
  const [photo, setPhoto] = useState(localStorage.getItem("adminPhoto") || "");
  const [photoUrlInput, setPhotoUrlInput] = useState("");

  useEffect(() => {
    // Update localStorage when photo changes
    if (photo) {
      localStorage.setItem("adminPhoto", photo);
    }
  }, [photo]);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("photo", file);
      try {
        const res = await api.post("/about/photo", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setPhoto(res.data.url);
        localStorage.setItem("adminPhoto", res.data.url);
      } catch (err) {
        alert("Failed to upload photo");
      }
    }
  };

  const handlePhotoUrlSubmit = (e) => {
    e.preventDefault();
    if (photoUrlInput) {
      setPhoto(photoUrlInput);
      localStorage.setItem("adminPhoto", photoUrlInput);
      setPhotoUrlInput("");
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <Container>
        <Alert severity="error">
          Access denied. You must be an admin to view this page.
        </Alert>
      </Container>
    );
  }

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper
            elevation={8}
            sx={{
              p: { xs: 3, md: 5 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 6,
              background: "linear-gradient(120deg, #23263a 0%, #00bcd4 100%)",
              color: "#fff",
              boxShadow: "0 8px 32px 0 rgba(0,0,0,0.18)",
            }}
          >
            <Avatar
              src={photo || "/profile-photo.jpg"}
              alt="Admin Photo"
              sx={{
                width: 120,
                height: 120,
                mb: 2,
                boxShadow: 3,
                border: "4px solid #fff",
              }}
            />
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Button
                variant="outlined"
                component="label"
                sx={{
                  color: "#fff",
                  borderColor: "#fff",
                  fontWeight: 600,
                  borderRadius: 8,
                }}
              >
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handlePhotoChange}
                />
              </Button>
              <Box
                component="form"
                onSubmit={handlePhotoUrlSubmit}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <TextField
                  size="small"
                  variant="outlined"
                  placeholder="Paste image URL"
                  value={photoUrlInput}
                  onChange={(e) => setPhotoUrlInput(e.target.value)}
                  sx={{
                    background: "#fff",
                    borderRadius: 2,
                    mr: 1,
                    minWidth: 200,
                  }}
                  InputProps={{ style: { color: "#1976d2" } }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  sx={{
                    borderRadius: 8,
                    fontWeight: 700,
                    background:
                      "linear-gradient(90deg, #1976d2 0%, #00bcd4 100%)",
                  }}
                >
                  Use URL
                </Button>
              </Box>
            </Stack>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: 800, letterSpacing: 1, color: "#fff" }}
            >
              Welcome, {user.username}!
            </Typography>
            <Typography
              variant="body1"
              color="#e0e0e0"
              paragraph
              align="center"
              sx={{ maxWidth: 600, fontWeight: 500 }}
            >
              Manage your portfolio content from this dashboard.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            elevation={6}
            sx={{
              width: "100%",
              borderRadius: 6,
              background: "linear-gradient(120deg, #181c24 0%, #23263a 100%)",
              color: "#f3f4f6",
              boxShadow: "0 4px 24px 0 rgba(0,0,0,0.18)",
            }}
          >
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                borderBottom: "1px solid #31364a",
                ".MuiTab-root": {
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "#b0b8c1",
                },
                ".Mui-selected": { color: "#00bcd4 !important" },
              }}
            >
              <Tab label="About Page" />
              <Tab label="Projects" />
              <Tab label="Certificates" />
              <Tab label="Publications" />
              <Tab label="Blog Posts" />
            </Tabs>
            <Box sx={{ p: { xs: 1, md: 4 } }}>
              {currentTab === 0 && <AboutManager />}
              {currentTab === 1 && <ProjectsManager />}
              {currentTab === 2 && <CertificatesManager />}
              {currentTab === 3 && <PublicationsManager />}
              {currentTab === 4 && <BlogManager />}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
