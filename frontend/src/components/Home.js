import React, { useEffect, useState, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Avatar,
  Paper,
  IconButton,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

const Home = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isQuickLinksVisible, setIsQuickLinksVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [isSocialVisible, setIsSocialVisible] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const heroRef = useRef(null);
  const quickLinksRef = useRef(null);
  const contactRef = useRef(null);
  const socialRef = useRef(null);

  useEffect(() => {
    // Page load animation - hero section slides up from bottom
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Create Intersection Observer for hero section
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeroVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Create Intersection Observer for quick links section
    const quickLinksObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsQuickLinksVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Create Intersection Observer for contact section
    const contactObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsContactVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Create Intersection Observer for social section
    const socialObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSocialVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Start observing elements
    if (heroRef.current) {
      heroObserver.observe(heroRef.current);
    }
    if (quickLinksRef.current) {
      quickLinksObserver.observe(quickLinksRef.current);
    }
    if (contactRef.current) {
      contactObserver.observe(contactRef.current);
    }
    if (socialRef.current) {
      socialObserver.observe(socialRef.current);
    }

    // Cleanup observers
    return () => {
      heroObserver.disconnect();
      quickLinksObserver.disconnect();
      contactObserver.disconnect();
      socialObserver.disconnect();
    };
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "100vh",
        fontFamily: "Inter, Montserrat, Roboto, Arial, sans-serif",
        background:
          "linear-gradient(135deg, #e0e7ff 0%, #f8fafc 50%, #c7d2fe 100%)",
        backgroundAttachment: "fixed",
        py: { xs: 2, md: 4 },
        px: { xs: 0, md: 2 },
        borderRadius: 0,
        boxShadow: "none",
        position: "relative",
        overflow: "visible",
      }}
    >
      {/* Decorative SVG or abstract background shape */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
          background: "none",
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <defs>
            <linearGradient id="bg-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <ellipse cx="720" cy="200" rx="900" ry="250" fill="url(#bg-grad)" />
        </svg>
      </Box>
      {/* Hero Section - Blue Box with Left-Right Layout - PAGE LOAD + SCROLL ANIMATED */}
      <div
        ref={heroRef}
        style={{
          opacity: isPageLoaded ? 1 : 0,
          transform: isPageLoaded ? "translateX(0px)" : "translateX(-100vw)",
          transition: "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          marginTop: "32px",
          marginBottom: "64px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Paper
          elevation={12}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            background:
              "linear-gradient(135deg, #1976d2 0%, #00bcd4 50%, #2196f3 100%)",
            color: "#fff",
            position: "relative",
            overflow: "hidden",
            transform: "perspective(1000px)",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(45deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)",
              zIndex: 1,
            },
            "&::after": {
              content: '""',
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
              animation: "float 6s ease-in-out infinite",
              zIndex: 0,
            },
            "@keyframes float": {
              "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
              "50%": { transform: "translateY(-20px) rotate(180deg)" },
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 6,
              minHeight: "400px",
            }}
          >
            {/* Left Side - Text Content */}
            <Box
              sx={{
                flex: 1,
                textAlign: { xs: "center", md: "left" },
                order: { xs: 2, md: 1 },
              }}
            >
              {/* Hello Text */}
              <Typography
                variant="h4"
                sx={{
                  mb: 2,
                  opacity: 0.9,
                  fontWeight: 500,
                  fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.8rem" },
                  textShadow: "0 2px 4px rgba(0,0,0,0.08)",
                  color: "#373737",
                  fontFamily: "Montserrat, Inter, Roboto, Arial, sans-serif",
                  letterSpacing: "0.01em",
                }}
              >
                Hello, It's Me
              </Typography>

              {/* Name */}
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  mb: 3,
                  fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.5rem" },
                  textShadow: "0 4px 16px rgba(129, 140, 248, 0.12)",
                  background:
                    "linear-gradient(90deg, #6366f1 0%, #818cf8 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "0.04em",
                  lineHeight: 1.2,
                  fontFamily: "Montserrat, Inter, Roboto, Arial, sans-serif",
                }}
              >
                Abdulhadi Abbas Akanni
              </Typography>

              {/* Description */}
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.95,
                  fontWeight: 600,
                  fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
                  textShadow: "0 2px 4px rgba(0,0,0,0.06)",
                  letterSpacing: "0.02em",
                  maxWidth: "500px",
                  lineHeight: 1.4,
                  color: "#444",
                  fontFamily: "Inter, Montserrat, Roboto, Arial, sans-serif",
                }}
              >
                I'm an AIML Engineer and Full Stack Developer who is passionate
                in Programming
              </Typography>

              {/* About Button */}
              <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to="/about"
                sx={{
                  borderRadius: "25px",
                  px: 5,
                  py: 2,
                  fontWeight: 600,
                  fontSize: "1.2rem",
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
                  border: "2px solid rgba(255,255,255,0.3)",
                  color: "#fff",
                  "&:hover": {
                    background: "rgba(255,255,255,0.3)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                About
              </Button>
            </Box>

            {/* Right Side - Profile Picture */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                order: { xs: 1, md: 2 },
              }}
            >
              <Avatar
                src="https://via.placeholder.com/220x220/1976d2/ffffff?text=AA"
                alt="Abdulhadi Abbas Akanni"
                sx={{
                  width: { xs: 140, sm: 180, md: 220 },
                  height: { xs: 140, sm: 180, md: 220 },
                  border: "4px solid rgba(255,255,255,0.4)",
                  boxShadow:
                    "0 25px 50px rgba(0,0,0,0.3), 0 0 30px rgba(33, 150, 243, 0.3)",
                  transition: "all 0.4s ease",
                  "&:hover": {
                    transform: "scale(1.08) rotate(5deg)",
                    boxShadow:
                      "0 35px 70px rgba(0,0,0,0.4), 0 0 40px rgba(33, 150, 243, 0.5)",
                    border: "4px solid rgba(255,255,255,0.6)",
                  },
                }}
              />
            </Box>
          </Box>

          {/* Social Icons - Left Side */}
          <Box
            sx={{
              position: "absolute",
              left: { xs: "15px", md: "25px" },
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              gap: 3,
              zIndex: 3,
            }}
          >
            <IconButton
              href="https://github.com/yourusername"
              target="_blank"
              sx={{
                color: "#fff",
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                "&:hover": {
                  background: "rgba(255,255,255,0.2)",
                  transform: "scale(1.1)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              sx={{
                color: "#fff",
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                "&:hover": {
                  background: "rgba(255,255,255,0.2)",
                  transform: "scale(1.1)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              href="mailto:abdulhadiakanni@gmail.com"
              sx={{
                color: "#fff",
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                "&:hover": {
                  background: "rgba(255,255,255,0.2)",
                  transform: "scale(1.1)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <EmailIcon />
            </IconButton>
          </Box>
        </Paper>
      </div>

      {/* Quick Links Section - SCROLL ANIMATED */}
      <div
        ref={quickLinksRef}
        style={{
          opacity: isQuickLinksVisible ? 1 : 0,
          transform: isQuickLinksVisible
            ? "translateY(0px) scale(1)"
            : "translateY(60px) scale(0.95)",
          transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          marginBottom: "64px",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card
              component={RouterLink}
              to="/certificates"
              sx={{
                height: "100%",
                textDecoration: "none",
                transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-12px) scale(1.02)",
                  boxShadow:
                    "0 20px 40px rgba(0,0,0,0.15), 0 0 0 2px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.3)",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                  border: "2px solid rgba(59, 130, 246, 0.8)",
                  "&::before": {
                    opacity: 1,
                    transform: "scale(1.1)",
                  },
                  "&::after": {
                    opacity: 0.8,
                    transform: "rotate(180deg) scale(1.2)",
                  },
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    "linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)",
                  borderRadius: 18,
                  opacity: 0,
                  transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  zIndex: 1,
                  pointerEvents: "none",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: "-50%",
                  left: "-50%",
                  width: "200%",
                  height: "200%",
                  background:
                    "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
                  borderRadius: "50%",
                  opacity: 0,
                  transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  zIndex: 0,
                  pointerEvents: "none",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: 700, color: "#1976d2" }}
                >
                  Certificates
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: "1rem" }}>
                  View my professional certifications and achievements
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              component={RouterLink}
              to="/projects"
              sx={{
                height: "100%",
                textDecoration: "none",
                transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-12px) scale(1.02)",
                  boxShadow:
                    "0 20px 40px rgba(0,0,0,0.15), 0 0 0 2px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.3)",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                  border: "2px solid rgba(59, 130, 246, 0.8)",
                  "&::before": {
                    opacity: 1,
                    transform: "scale(1.1)",
                  },
                  "&::after": {
                    opacity: 0.8,
                    transform: "rotate(180deg) scale(1.2)",
                  },
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    "linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)",
                  borderRadius: 18,
                  opacity: 0,
                  transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  zIndex: 1,
                  pointerEvents: "none",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: "-50%",
                  left: "-50%",
                  width: "200%",
                  height: "200%",
                  background:
                    "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
                  borderRadius: "50%",
                  opacity: 0,
                  transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  zIndex: 0,
                  pointerEvents: "none",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: 700, color: "#1976d2" }}
                >
                  Projects
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: "1rem" }}>
                  Explore my latest projects and GitHub repositories
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              component={RouterLink}
              to="/publications"
              sx={{
                height: "100%",
                textDecoration: "none",
                transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-12px) scale(1.02)",
                  boxShadow:
                    "0 20px 40px rgba(0,0,0,0.15), 0 0 0 2px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.3)",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                  border: "2px solid rgba(59, 130, 246, 0.8)",
                  "&::before": {
                    opacity: 1,
                    transform: "scale(1.1)",
                  },
                  "&::after": {
                    opacity: 0.8,
                    transform: "rotate(180deg) scale(1.2)",
                  },
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    "linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)",
                  borderRadius: 18,
                  opacity: 0,
                  transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  zIndex: 1,
                  pointerEvents: "none",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: "-50%",
                  left: "-50%",
                  width: "200%",
                  height: "200%",
                  background:
                    "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
                  borderRadius: "50%",
                  opacity: 0,
                  transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  zIndex: 0,
                  pointerEvents: "none",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: 700, color: "#1976d2" }}
                >
                  Publications
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: "1rem" }}>
                  Read my articles and technical publications
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>

      {/* Get In Touch Section - SCROLL ANIMATED */}
      <div
        ref={contactRef}
        style={{
          opacity: isContactVisible ? 1 : 0,
          transform: isContactVisible
            ? "translateY(0px) scale(1)"
            : "translateY(60px) scale(0.95)",
          transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          marginBottom: "48px",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
            textAlign: "center",
            mb: 6,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 700, color: "#1976d2", mb: 2 }}
          >
            Ready to Work Together?
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 3, fontSize: "1.1rem", color: "text.secondary" }}
          >
            Let's discuss your next project and bring your ideas to life
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/contact"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(33, 150, 243, 0.3)",
                },
              }}
            >
              Get In Touch
            </Button>
            <Button
              variant="outlined"
              color="primary"
              component={RouterLink}
              to="/projects"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(33, 150, 243, 0.2)",
                },
              }}
            >
              View Projects
            </Button>
          </Box>
        </Paper>
      </div>

      {/* Social Links - SCROLL ANIMATED */}
      <div
        ref={socialRef}
        style={{
          opacity: isSocialVisible ? 1 : 0,
          transform: isSocialVisible
            ? "translateY(0px) scale(1)"
            : "translateY(60px) scale(0.95)",
          transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            backgroundColor: "rgba(33, 150, 243, 0.05)",
            borderRadius: 3,
            border: "1px solid rgba(33, 150, 243, 0.1)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              mb: 3,
              fontWeight: 600,
              color: "#1976d2",
            }}
          >
            Connect With Me
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            <IconButton
              component="a"
              href="https://github.com/Alchemist70"
              target="_blank"
              sx={{
                color: "#1976d2",
                backgroundColor: "rgba(33, 150, 243, 0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(33, 150, 243, 0.2)",
                  transform: "translateY(-3px) scale(1.1)",
                },
              }}
            >
              <GitHubIcon fontSize="large" />
            </IconButton>
            <IconButton
              component="a"
              href="https://linkedin.com/in/abbas-abdulhadi"
              target="_blank"
              sx={{
                color: "#1976d2",
                backgroundColor: "rgba(33, 150, 243, 0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(33, 150, 243, 0.2)",
                  transform: "translateY(-3px) scale(1.1)",
                },
              }}
            >
              <LinkedInIcon fontSize="large" />
            </IconButton>
            <IconButton
              component="a"
              href="mailto:abdulhadiakanni@gmail.com"
              sx={{
                color: "#1976d2",
                backgroundColor: "rgba(33, 150, 243, 0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(33, 150, 243, 0.2)",
                  transform: "translateY(-3px) scale(1.1)",
                },
              }}
            >
              <EmailIcon fontSize="large" />
            </IconButton>
          </Box>
        </Paper>
      </div>
    </Container>
  );
};

export default Home;
