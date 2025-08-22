import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Alert,
  useTheme
} from '@mui/material';
// ...existing code...
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import { api } from '../services/api';
import { StaggeredContainer, StaggeredItem } from './AnimatedContainer';

// ...existing code...

const Contact = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await api.post('/contact', formData);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper
        elevation={6}
        sx={{
          p: { xs: 2, md: 5 },
          borderRadius: 5,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #23263a 0%, #181c24 100%)'
            : 'linear-gradient(135deg, #f4f7fa 0%, #e0e7ef 100%)',
          color: theme.palette.text.primary,
          boxShadow: '0 8px 32px 0 rgba(60, 72, 88, 0.12)',
        }}
      >
        <Box sx={{ mb: 5 }}>
          <Paper elevation={4} sx={{ p: 3, borderRadius: 4, background: 'linear-gradient(90deg, #23263a 0%, #1976d2 100%)', color: '#fff', mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Get in Touch
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', opacity: 0.95 }}>
              I welcome opportunities for collaboration, mentorship, and new challenges. Feel free to reach out to discuss projects, ideas, or career opportunities.
            </Typography>
          </Paper>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Your message has been sent successfully!
          </Alert>
        )}

        <StaggeredContainer delay={0.2} stagger={0.3}>
          <Grid container spacing={6} alignItems="stretch">
            <Grid item xs={12} md={6}>
              <StaggeredItem sx={{ height: '100%' }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  background: theme.palette.background.paper,
                  boxShadow: '0 2px 8px 0 rgba(60, 72, 88, 0.08)',
                  height: '100%',
                }}
              >
                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
                        InputProps={{
                          style: {
                            background: theme.palette.background.paper,
                            color: theme.palette.text.primary,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
                        InputProps={{
                          style: {
                            background: theme.palette.background.paper,
                            color: theme.palette.text.primary,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
                        InputProps={{
                          style: {
                            background: theme.palette.background.paper,
                            color: theme.palette.text.primary,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Message"
                        name="message"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
                        InputProps={{
                          style: {
                            background: theme.palette.background.paper,
                            color: theme.palette.text.primary,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={loading}
                        sx={{
                          width: '100%',
                          py: 1.5,
                          fontWeight: 700,
                          fontSize: '1.1rem',
                          background: 'linear-gradient(90deg, #1976d2 0%, #00bcd4 100%)',
                        }}
                      >
                        {loading ? 'Sending...' : 'Send Message'}
                      </Button>
                    </Grid>
                  </Grid>
                              </Box>
            </Paper>
          </StaggeredItem>
        </Grid>

        <Grid item xs={12} md={6}>
          <StaggeredItem sx={{ height: '100%' }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  background: theme.palette.background.paper,
                  boxShadow: '0 2px 8px 0 rgba(60, 72, 88, 0.08)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: 700 }}>
                  Connect with me
                </Typography>
                <Typography
                  variant="body1"
                  color={theme.palette.text.secondary}
                  paragraph
                  align="center"
                  sx={{ mb: 3 }}
                >
                  Feel free to reach out through any of these platforms. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Button
                    variant="outlined"
                    startIcon={<GitHubIcon />}
                    href="https://github.com/Alchemist70"
                    target="_blank"
                    sx={{ borderRadius: 8, fontWeight: 600, color: theme.palette.primary.main, borderColor: theme.palette.primary.main, '&:hover': { background: theme.palette.action.hover } }}
                  >
                    GitHub
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<LinkedInIcon />}
                    href="https://linkedin.com/in/abbas-abdulhadi"
                    target="_blank"
                    sx={{ borderRadius: 8, fontWeight: 600, color: theme.palette.secondary.main, borderColor: theme.palette.secondary.main, '&:hover': { background: theme.palette.action.hover } }}
                  >
                    LinkedIn
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<TwitterIcon />}
                    href="https://twitter.com/alchemist_70"
                    target="_blank"
                    sx={{ borderRadius: 8, fontWeight: 600, color: '#1da1f2', borderColor: '#1da1f2', '&:hover': { background: theme.palette.action.hover } }}
                  >
                    Twitter
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<EmailIcon />}
                    href="mailto:abdulhadiakanni@gmail.com"
                    sx={{ borderRadius: 8, fontWeight: 600, color: theme.palette.info.main, borderColor: theme.palette.info.main, '&:hover': { background: theme.palette.action.hover } }}
                  >
                    Email
                  </Button>
                </Box>
              </Paper>
            </StaggeredItem>
          </Grid>
        </Grid>
      </StaggeredContainer>
      </Paper>
    </Container>
  );
};

export default Contact;
