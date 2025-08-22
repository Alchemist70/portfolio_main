import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  CardActions,
  CircularProgress,
  Alert,
  useTheme,
  Paper,
  IconButton,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { api } from "../services/api";

const Projects = ({ featured = false }) => {
  const theme = useTheme();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const itemsPerPage = 10;

  // Demo URL mapping for specific projects
  const demoUrlMapping = {
    'MedCare': 'https://health-management-qyw4.onrender.com/',
    'TreatsByShawty': 'https://treatsbyshawty-45r0.onrender.com',
    'ARS Commerce': 'https://ars-commerce-frontend.onrender.com/',
    'Cancer Diagnosis': 'https://cancer-diagnosis-qk1r.onrender.com',
    // Alternative title mappings
    'Health Management System': 'https://health-management-qyw4.onrender.com/',
    'MedCare Health System': 'https://health-management-qyw4.onrender.com/',
    'Treats By Shawty': 'https://treatsbyshawty-45r0.onrender.com',
    'Food Delivery App': 'https://treatsbyshawty-45r0.onrender.com',
    'E-commerce Frontend': 'https://ars-commerce-frontend.onrender.com/',
    'ARS E-commerce': 'https://ars-commerce-frontend.onrender.com/',
    'Cancer Detection System': 'https://cancer-diagnosis-qk1r.onrender.com',
    'AI Cancer Diagnosis': 'https://cancer-diagnosis-qk1r.onrender.com'
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get(
          `/projects?page=${currentPage}&size=${itemsPerPage}${
            featured ? "&featured=true" : ""
          }`
        );
        const data = response.data;
        setProjects(Array.isArray(data.items) ? data.items : []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalItems(data.pagination?.totalItems || 0);
        setLoading(false);
        // Reset visible cards when page changes
        setVisibleCards(new Set());
      } catch (err) {
        setError("Failed to fetch projects");
        setLoading(false);
      }
    };
    fetchProjects();
  }, [featured, currentPage]);

  useEffect(() => {
    // Create Intersection Observer for project cards
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.dataset.cardId;
            setVisibleCards(prev => new Set([...prev, cardId]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all project cards
    const cards = document.querySelectorAll('[data-card-id]');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [projects]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 5 }}>
        <Paper
          elevation={4}
          sx={{
            p: 3,
            borderRadius: 4,
            background: "linear-gradient(90deg, #23263a 0%, #1976d2 100%)",
            color: "#fff",
            mb: 4,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            My Projects
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.1rem", opacity: 0.95 }}
          >
            Explore my portfolio of innovative projects that showcase my skills in
            full-stack development, machine learning, and problem-solving. Each
            project represents a unique challenge and demonstrates my commitment to
            creating impactful solutions.
          </Typography>
        </Paper>
      </Box>

      <Grid container spacing={4}>
        {projects.map((project, index) => (
          <Grid item key={project._id} xs={12} md={6} lg={4}>
            <div
              data-card-id={project._id}
              style={{
                opacity: visibleCards.has(project._id) ? 1 : 0,
                transform: visibleCards.has(project._id) ? 'translateY(0px) scale(1)' : 'translateY(60px) scale(0.95)',
                transition: `all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.08}s`,
              }}
            >
              <Card
                elevation={8}
                sx={{
                  borderRadius: 4,
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #23263a 0%, #181c24 100%)'
                    : 'linear-gradient(135deg, #f4f7fa 0%, #e0e7ef 100%)',
                  color: theme.palette.text.primary,
                  boxShadow: theme.palette.mode === 'dark' ? '0 4px 24px 0 rgba(0,0,0,0.28)' : '0 4px 24px 0 rgba(60, 72, 88, 0.10)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '600px',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  '&:hover': {
                    boxShadow: theme.palette.mode === 'dark' 
                      ? '0 4px 24px 0 rgba(0,0,0,0.28), 0 0 0 3px rgba(33, 150, 243, 0.9), 0 0 30px rgba(33, 150, 243, 0.6), 0 0 60px rgba(33, 150, 243, 0.3)'
                      : '0 4px 24px 0 rgba(60, 72, 88, 0.10), 0 0 0 3px rgba(33, 150, 243, 0.9), 0 0 30px rgba(33, 150, 243, 0.6), 0 0 60px rgba(33, 150, 243, 0.3)',
                    border: '3px solid rgba(33, 150, 243, 0.9)',
                  },
                }}
              >
                {project.imageUrl && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={project.imageUrl}
                    alt={project.title}
                    sx={{
                      objectFit: "cover",
                      borderTopLeftRadius: 16,
                      borderTopRightRadius: 16,
                    }}
                  />
                )}
                <CardContent sx={{ 
                  flexGrow: 1, 
                  p: 3,
                  maxHeight: '400px',
                  overflowY: 'auto',
                  '&::-webkit-scrollbar': {
                    width: '8px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    borderRadius: '4px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: theme.palette.primary.main,
                    borderRadius: '4px',
                    '&:hover': {
                      background: theme.palette.primary.dark,
                    },
                  },
                }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.primary.main,
                      mb: 2,
                    }}
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 3,
                      color: theme.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    {project.description}
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    {Array.isArray(project.technologies) &&
                      project.technologies.map((tech) => (
                        <Chip
                          key={tech}
                          label={tech}
                          size="small"
                          sx={{
                            mr: 1,
                            mb: 1,
                            fontWeight: 600,
                            background: theme.palette.mode === 'dark' ? '#23263a' : '#e0e7ef',
                            color: theme.palette.primary.main,
                          }}
                        />
                      ))}
                  </Box>
                  {project.status && (
                    <Chip
                      label={project.status}
                      size="small"
                      sx={{
                        mb: 2,
                        fontWeight: 600,
                        background: project.status === 'COMPLETED'
                          ? '#43a047' // green for COMPLETED
                          : '#1976d2', // blue for IN PROGRESS
                        color: 'white',
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                        fontSize: '0.85rem',
                        boxShadow: '0 2px 8px 0 rgba(25, 118, 210, 0.10)',
                      }}
                    />
                  )}
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between", px: 3, pb: 3 }}>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {project.githubUrl && (
                      <Button
                        size="small"
                        color="primary"
                        variant="outlined"
                        href={project.githubUrl}
                        target="_blank"
                        startIcon={<GitHubIcon />}
                        sx={{ 
                          borderRadius: 8, 
                          fontWeight: 600,
                          minWidth: '100px'
                        }}
                      >
                        GitHub
                      </Button>
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      variant="contained"
                      href={demoUrlMapping[project.title] || project.demoUrl || project.liveUrl || '#'}
                      target="_blank"
                      startIcon={<PlayCircleOutlineIcon />}
                      onClick={() => {
                        console.log('Project Title:', project.title);
                        console.log('Mapped URL:', demoUrlMapping[project.title]);
                        console.log('Demo URL:', project.demoUrl);
                        console.log('Live URL:', project.liveUrl);
                      }}
                      sx={{ 
                        borderRadius: '50px',
                        fontWeight: 600,
                        minWidth: '120px',
                        background: 'linear-gradient(45deg, #e91e63 30%, #f06292 90%)',
                        color: 'white',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #c2185b 30%, #e91e63 90%)',
                          boxShadow: '0 4px 12px rgba(233, 30, 99, 0.4)',
                        }
                      }}
                    >
                      Demo
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </div>
          </Grid>
        ))}
      </Grid>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" alignItems="center" mt={6} gap={2}>
          <IconButton
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            sx={{
              color: theme.palette.primary.main,
              '&:disabled': {
                color: theme.palette.text.disabled
              }
            }}
          >
            <NavigateBeforeIcon />
          </IconButton>
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
            Page {currentPage} of {totalPages} ({totalItems} total projects)
          </Typography>
          <IconButton
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            sx={{
              color: theme.palette.primary.main,
              '&:disabled': {
                color: theme.palette.text.disabled
              }
            }}
          >
            <NavigateNextIcon />
          </IconButton>
        </Box>
      )}
    </Container>
  );
};

export default Projects;
