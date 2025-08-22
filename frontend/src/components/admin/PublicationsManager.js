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

const PublicationsManager = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPublication, setEditingPublication] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    journal: "",
    publicationDate: "",
    doi: "",
    abstract: "",
    keywords: "",
    pdfUrl: "",
    featured: false,
  });

  const fetchPublications = useCallback(async () => {
    try {
      if (!token) {
        setError("Session expired. Please log in again.");
        return;
      }
      const response = await api.get(
        `/publications?page=${currentPage}&size=${itemsPerPage}`
      );
      const data = response.data;
      setPublications(Array.isArray(data.items) ? data.items : []);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotalItems(data.pagination?.totalItems || 0);
      setError("");
    } catch (err) {
      setError("Failed to fetch publications");
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, token]);

  useEffect(() => {
    fetchPublications();
  }, [fetchPublications]);

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

  const handleOpenDialog = (publication = null) => {
    if (publication) {
      setEditingPublication(publication);
      setFormData({
        title: publication.title || "",
        journal: publication.journal || "",
        publicationDate: publication.publicationDate
          ? publication.publicationDate.split("T")[0]
          : "",
        doi: publication.doi || "",
        abstract: publication.abstract || "",
        keywords: Array.isArray(publication.keywords)
          ? publication.keywords.join(", ")
          : "",
        pdfUrl: publication.pdfUrl || "",
        featured: publication.featured || false,
      });
    } else {
      setEditingPublication(null);
      setFormData({
        title: "",
        journal: "",
        publicationDate: "",
        doi: "",
        abstract: "",
        keywords: "",
        pdfUrl: "",
        featured: false,
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingPublication(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setFormData((prev) => ({
      ...prev,
      keywords: tags.join(", "),
    }));
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    try {
      if (!token) {
        setError("Session expired. Please log in again.");
        return;
      }
      let keywordsArray = [];
      if (Array.isArray(formData.keywords)) {
        keywordsArray = formData.keywords;
      } else if (typeof formData.keywords === "string") {
        keywordsArray = formData.keywords
          .split(",")
          .map((keyword) => keyword.trim())
          .filter(Boolean);
      }
      const publicationData = {
        title: formData.title,
        journal: formData.journal,
        publicationDate: formData.publicationDate,
        doi: formData.doi,
        abstract: formData.abstract,
        keywords: keywordsArray,
        featured: formData.featured,
      };
      if (isValidUrl(formData.pdfUrl)) {
        publicationData.pdfUrl = formData.pdfUrl;
      }
      console.log("About to send API request", publicationData);
      if (editingPublication) {
        await api.patch(
          `/publications/${editingPublication._id}`,
          publicationData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await api.post("/publications", publicationData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      console.log("API request sent");
      handleCloseDialog();
      fetchPublications();
    } catch (err) {
      console.error("API error:", err);
      setError(err.response?.data?.message || "Failed to save publication");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this publication?")) {
      try {
        await api.delete(`/publications/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchPublications();
      } catch (err) {
        setError("Failed to delete publication");
      }
    }
  };

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

  const publicationsArray = Array.isArray(publications) ? publications : [];

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
          Add Publication
        </Button>
      </Box>

      <Grid container spacing={3}>
        {publicationsArray.map((publication) => (
          <Grid item xs={12} sm={6} md={4} key={publication._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {publication.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {publication.journal}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {publication.publicationDate
                    ? new Date(publication.publicationDate).toLocaleDateString()
                    : ""}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  DOI: {publication.doi}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Keywords:{" "}
                  {Array.isArray(publication.keywords)
                    ? publication.keywords.join(", ")
                    : ""}
                </Typography>
                <Typography variant="body2" paragraph>
                  {publication.abstract}
                </Typography>
                <Box mt={1}>
                  {Array.isArray(publication.keywords) &&
                    publication.keywords.map((keyword, index) => (
                      <Chip
                        key={index}
                        label={keyword}
                        size="small"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                </Box>
                <Box mt={2} display="flex" justifyContent="flex-end">
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(publication)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(publication._id)}
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
            Page {currentPage} of {totalPages} ({totalItems} total publications)
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
            {editingPublication ? "Edit Publication" : "Add Publication"}
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
                label="Journal"
                name="journal"
                value={formData.journal}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Publication Date"
                name="publicationDate"
                type="date"
                value={formData.publicationDate}
                onChange={handleChange}
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Abstract"
                name="abstract"
                value={formData.abstract}
                onChange={handleChange}
                margin="normal"
                required
                multiline
                rows={4}
              />
              <TextField
                fullWidth
                label="DOI"
                name="doi"
                value={formData.doi}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Keywords (comma-separated)"
                name="keywords"
                value={formData.keywords}
                onChange={handleTagsChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="PDF URL"
                name="pdfUrl"
                value={formData.pdfUrl}
                onChange={handleChange}
                margin="normal"
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
              {editingPublication ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default PublicationsManager;
