import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Paper,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import AnimatedContainer, { StaggeredContainer, StaggeredItem } from "./AnimatedContainer";

const MotionCard = motion(Card);

const Blog = ({ featured = false }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get(
          `/blog?page=${currentPage}&size=${itemsPerPage}${
            featured ? "&featured=true" : ""
          }`
        );
        const data = response.data;
        setPosts(Array.isArray(data.items) ? data.items : []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalItems(data.pagination?.totalItems || 0);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch blog posts");
        setLoading(false);
      }
    };
    fetchPosts();
  }, [featured, currentPage]);

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
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4, md: 6 } }}>
      <AnimatedContainer delay={0.2}>
        <Box sx={{ mb: { xs: 2, sm: 4, md: 5 } }}>
          <Paper
            elevation={4}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 4,
              background: "linear-gradient(90deg, #1976d2 0%, #00bcd4 100%)",
              color: "#fff",
              mb: { xs: 2, sm: 4 },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 1,
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
              }}
            >
              Blog
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: "1rem", sm: "1.1rem" }, opacity: 0.95 }}
            >
              Dive into my blog for insights, technical writing, and thought
              leadership on software development, emerging technologies, and
              personal growth in tech.
            </Typography>
          </Paper>
        </Box>
      </AnimatedContainer>

      <AnimatedContainer delay={0.3}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 800,
            letterSpacing: 1,
            color: theme.palette.primary.main,
            mb: 6,
          }}
        ></Typography>
      </AnimatedContainer>

      <StaggeredContainer delay={0.4} stagger={0.15}>
        <Grid container spacing={{ xs: 2, sm: 4, md: 5 }}>
          {posts.map((post, index) => (
            <Grid item key={post._id} xs={12} sm={6} md={4}>
              <StaggeredItem>
                <MotionCard
                  whileHover={{
                    scale: 1.04,
                    boxShadow:
                      theme.palette.mode === "dark"
                        ? "0 8px 32px 0 rgba(33,150,243,0.28)"
                        : "0 8px 32px 0 rgba(33,150,243,0.18)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  elevation={8}
                  sx={{
                    borderRadius: 5,
                    background:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(135deg, #23263a 0%, #181c24 100%)"
                        : "linear-gradient(135deg, #f4f7fa 0%, #e0e7ef 100%)",
                    color: theme.palette.text.primary,
                    boxShadow:
                      theme.palette.mode === "dark"
                        ? "0 4px 24px 0 rgba(0,0,0,0.28)"
                        : "0 4px 24px 0 rgba(60, 72, 88, 0.10)",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: { xs: 320, sm: 380, md: 420 },
                  }}
                >
                  {post.imageUrl && (
                    <Box
                      component="img"
                      src={post.imageUrl}
                      alt={post.title}
                      sx={{
                        width: "100%",
                        height: { xs: 120, sm: 150, md: 180 },
                        objectFit: "cover",
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                      }}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h3"
                      sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                    >
                      {post.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mb: 2, color: theme.palette.text.secondary }}
                    >
                      {post.excerpt}
                    </Typography>
                    <Box sx={{ mt: 2, mb: 1 }}>
                      {Array.isArray(post.tags) &&
                        post.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{
                              mr: 1,
                              mb: 1,
                              fontWeight: 600,
                              background:
                                theme.palette.mode === "dark"
                                  ? "#23263a"
                                  : "#e0e7ef",
                              color: theme.palette.primary.main,
                            }}
                          />
                        ))}
                    </Box>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
                    <Button
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ borderRadius: 8, fontWeight: 600 }}
                      onClick={() => navigate(`/blog/${post.slug || post._id}`)}
                    >
                      Read More
                    </Button>
                  </CardActions>
                </MotionCard>
              </StaggeredItem>
            </Grid>
          ))}
        </Grid>
      </StaggeredContainer>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <AnimatedContainer delay={0.6}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={6}
            gap={2}
          >
            <IconButton
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              sx={{
                color: theme.palette.primary.main,
                "&:disabled": {
                  color: theme.palette.text.disabled,
                },
              }}
            >
              <NavigateBeforeIcon />
            </IconButton>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.text.secondary }}
            >
              Page {currentPage} of {totalPages} ({totalItems} total posts)
            </Typography>
            <IconButton
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              sx={{
                color: theme.palette.primary.main,
                "&:disabled": {
                  color: theme.palette.text.disabled,
                },
              }}
            >
              <NavigateNextIcon />
            </IconButton>
          </Box>
        </AnimatedContainer>
      )}
    </Container>
  );
};

export default Blog;
