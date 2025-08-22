import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Chip,
  Alert,
  CircularProgress,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { api } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

const CertificatesManager = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    issueDate: "",
    expiryDate: "",
    credentialUrl: "",
    imageUrl: "",
    description: "",
    skills: "",
    featured: false,
  });

  const fetchCertificates = useCallback(async () => {
    try {
      if (!token) {
        setError("Session expired. Please log in again.");
        return;
      }
      const response = await api.get(
        `/certificates?page=${currentPage}&size=${itemsPerPage}`
      );
      const data = response.data;
      setCertificates(Array.isArray(data.items) ? data.items : []);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotalItems(data.pagination?.totalItems || 0);
      setError("");
    } catch (err) {
      setError("Failed to fetch certificates");
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, token]);

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

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

  const handleOpenDialog = (certificate = null) => {
    if (certificate) {
      setEditingCertificate(certificate);
      setFormData({
        title: certificate.title || "",
        issuer: certificate.issuer || "",
        issueDate: certificate.issueDate
          ? certificate.issueDate.split("T")[0]
          : "",
        expiryDate: certificate.expiryDate
          ? certificate.expiryDate.split("T")[0]
          : "",
        credentialUrl: certificate.credentialUrl || "",
        imageUrl: certificate.imageUrl || "",
        description: certificate.description || "",
        skills: Array.isArray(certificate.skills)
          ? certificate.skills.join(", ")
          : "",
        featured: certificate.featured || false,
      });
    } else {
      setEditingCertificate(null);
      setFormData({
        title: "",
        issuer: "",
        issueDate: "",
        expiryDate: "",
        credentialUrl: "",
        imageUrl: "",
        description: "",
        skills: "",
        featured: false,
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingCertificate(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(",").map((skill) => skill.trim());
    setFormData((prev) => ({
      ...prev,
      skills,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    try {
      if (!token) {
        setError("Session expired. Please log in again.");
        return;
      }
      let skillsArray = [];
      if (Array.isArray(formData.skills)) {
        skillsArray = formData.skills;
      } else if (typeof formData.skills === "string") {
        skillsArray = formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean);
      }
      const certificateData = {
        title: formData.title,
        issuer: formData.issuer,
        issueDate: formData.issueDate,
        expiryDate: formData.expiryDate ? formData.expiryDate : undefined,
        credentialUrl: formData.credentialUrl,
        imageUrl: formData.imageUrl,
        description: formData.description,
        skills: skillsArray,
        featured: formData.featured,
      };
      console.log("About to send API request", certificateData);
      if (editingCertificate) {
        await api.patch(
          `/certificates/${editingCertificate._id}`,
          certificateData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await api.post("/certificates", certificateData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      console.log("API request sent");
      handleCloseDialog();
      fetchCertificates();
    } catch (err) {
      console.error("API error:", err);
      setError(err.response?.data?.message || "Failed to save certificate");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this certificate?")) {
      try {
        await api.delete(`/certificates/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchCertificates();
      } catch (err) {
        setError("Failed to delete certificate");
      }
    }
  };

  const certificatesArray = Array.isArray(certificates) ? certificates : [];

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog()}
        >
          Add Certificate
        </Button>
      </Box>

      <Grid container spacing={3}>
        {certificatesArray.map((certificate) => (
          <Grid item xs={12} sm={6} md={4} key={certificate._id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={certificate.imageUrl}
                alt={certificate.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {certificate.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {certificate.issuer}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {certificate.issueDate
                    ? new Date(certificate.issueDate).toLocaleDateString()
                    : ""}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Credential: {certificate.credentialUrl}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {certificate.description}
                </Typography>
                <Box mt={1}>
                  {Array.isArray(certificate.skills) &&
                    certificate.skills.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        size="small"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                </Box>
                <Box mt={2} display="flex" justifyContent="flex-end">
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(certificate)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(certificate._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={4}
          gap={2}
        >
          <IconButton
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            color="primary"
          >
            <NavigateBeforeIcon />
          </IconButton>
          <Typography variant="body1" color="text.secondary">
            Page {currentPage} of {totalPages} ({totalItems} total certificates)
          </Typography>
          <IconButton
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            color="primary"
          >
            <NavigateNextIcon />
          </IconButton>
        </Box>
      )}

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {editingCertificate ? "Edit Certificate" : "Add Certificate"}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Issuer"
                name="issuer"
                value={formData.issuer}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Issue Date"
                name="issueDate"
                type="date"
                value={formData.issueDate}
                onChange={handleChange}
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Expiry Date"
                name="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Image URL"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                margin="normal"
                required
                multiline
                rows={3}
              />
              <TextField
                fullWidth
                label="Skills (comma-separated)"
                name="skills"
                value={formData.skills}
                onChange={handleSkillsChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Credential URL"
                name="credentialUrl"
                value={formData.credentialUrl}
                onChange={handleChange}
                margin="normal"
                required
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        featured: e.target.checked,
                      }))
                    }
                    name="featured"
                  />
                }
                label="Featured"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {editingCertificate ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default CertificatesManager;
