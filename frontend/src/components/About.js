import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Chip,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { api } from "../services/api";
import AnimatedContainer from "./AnimatedContainer";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import PsychologyIcon from "@mui/icons-material/Psychology";
import HandshakeIcon from "@mui/icons-material/Handshake";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import FavoriteIcon from "@mui/icons-material/Favorite";

const About = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await api.get("/about");
        setAbout(res.data);
      } catch (err) {
        setError("Failed to load about info");
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  // Function to parse values and create value cards
  const parseValues = (valuesString) => {
    if (!valuesString) return [];

    // Split by common separators and clean up
    const values = valuesString
      .split(/[,;|]/)
      .map((value) => value.trim())
      .filter((value) => value.length > 0)
      .slice(0, 6); // Limit to 6 values for better layout

    return values;
  };

  // Value card configurations
  const valueIcons = [
    <LightbulbIcon key="innovation" />,
    <PsychologyIcon key="mindset" />,
    <HandshakeIcon key="collaboration" />,
    <TrendingUpIcon key="growth" />,
    <EmojiObjectsIcon key="creativity" />,
    <FavoriteIcon key="passion" />,
  ];

  const valueColors = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  ];

  if (loading)
    return (
      <Box display="flex" justifyContent="center" py={8}>
        <CircularProgress />
      </Box>
    );
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!about) return <Alert severity="info">No about info found.</Alert>;

  const values = parseValues(about.values);

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, px: 2 }}>
      <AnimatedContainer delay={0.2}>
        <Paper
          elevation={8}
          sx={{
            maxWidth: 900,
            mx: "auto",
            p: { xs: 3, md: 6 },
            borderRadius: 6,
            background: "linear-gradient(120deg, #1976d2 0%, #00bcd4 100%)",
            color: "#fff",
            boxShadow: 8,
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
              <Avatar
                src={about.photoUrl ? about.photoUrl : "/profile-photo.jpg"}
                alt={about.name}
                sx={{
                  width: 160,
                  height: 160,
                  mx: "auto",
                  mb: 2,
                  boxShadow: 4,
                  border: "5px solid #fff",
                }}
              />
              <Typography variant="h5" sx={{ fontWeight: 700, mt: 2 }}>
                {about.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.85 }}>
                Full Stack Developer & Machine Learning Enthusiast
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
                About Me
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 3, fontSize: "1.15rem", lineHeight: 1.7 }}
              >
                {about.bio}
              </Typography>

              {/* Professional Values Section */}
              {values.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 3,
                      textAlign: "center",
                      textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    My Core Values
                  </Typography>
                  <Grid container spacing={2}>
                    {values.map((value, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                          sx={{
                            background: valueColors[index % valueColors.length],
                            borderRadius: 3,
                            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            "&:hover": {
                              transform: "translateY(-8px) scale(1.02)",
                              boxShadow: "0 16px 48px rgba(0,0,0,0.2)",
                            },
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            position: "relative",
                            overflow: "hidden",
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: "rgba(255,255,255,0.1)",
                              opacity: 0,
                              transition: "opacity 0.3s ease",
                            },
                            "&:hover::before": {
                              opacity: 1,
                            },
                          }}
                        >
                          <CardContent
                            sx={{
                              p: 3,
                              textAlign: "center",
                              color: "#fff",
                              position: "relative",
                              zIndex: 1,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                mb: 2,
                                "& .MuiSvgIcon-root": {
                                  fontSize: "2.5rem",
                                  filter:
                                    "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                                },
                              }}
                            >
                              {valueIcons[index % valueIcons.length]}
                            </Box>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 700,
                                fontSize: "1.1rem",
                                textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                                lineHeight: 1.3,
                              }}
                            >
                              {value}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              <Box display="flex" flexWrap="wrap" gap={1.5} sx={{ mb: 2 }}>
                {about.skills &&
                  about.skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      color="secondary"
                      sx={{ fontWeight: 500 }}
                    />
                  ))}
              </Box>

              <Button
                variant="contained"
                color="secondary"
                size="large"
                component={RouterLink}
                to="/contact"
                sx={{ fontWeight: 700, borderRadius: 8, mt: 2 }}
              >
                Contact Me
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </AnimatedContainer>
    </Box>
  );
};

export default About;
