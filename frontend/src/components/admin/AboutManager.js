import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Chip,
  Stack,
  CircularProgress,
  Alert,
  Avatar,
} from "@mui/material";
import { api } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

const AboutManager = () => {
  const { token } = useAuth();
  const [form, setForm] = useState({
    name: "",
    bio: "",
    values: "",
    skills: "",
    photoUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoUrlInput, setPhotoUrlInput] = useState("");
  const [aboutPhotoUrlInput, setAboutPhotoUrlInput] = useState("");

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await api.get("/about");
        if (res.data) {
          setForm({
            name: res.data.name || "",
            bio: res.data.bio || "",
            values: res.data.values || "",
            skills: (res.data.skills || []).join(", "),
            photoUrl: res.data.photoUrl || "",
          });
        }
      } catch (err) {
        setError("Failed to load about info");
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handlePhotoUpload = async () => {
    if (!photoFile) return;
    const data = new FormData();
    data.append("photo", photoFile);
    try {
      const res = await api.post("/about/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setForm((prev) => ({ ...prev, photoUrl: res.data.url }));
      setPhotoFile(null);
    } catch (err) {
      setError("Failed to upload photo");
    }
  };

  const handleAboutPhotoUrlSubmit = async () => {
    if (aboutPhotoUrlInput) {
      setForm((prev) => ({ ...prev, photoUrl: aboutPhotoUrlInput }));
      setAboutPhotoUrlInput("");
      // Immediately save the new photoUrl to the backend
      try {
        const payload = {
          ...form,
          photoUrl: aboutPhotoUrlInput,
          skills: form.skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        };
        await api.post("/about", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccess(true);
      } catch (err) {
        setError("Failed to save about info");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const payload = {
        ...form,
        skills: form.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };
      await api.post("/about", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess(true);
    } catch (err) {
      setError("Failed to save about info");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" py={8}>
        <CircularProgress />
      </Box>
    );

  return (
    <Paper
      elevation={6}
      sx={{
        p: { xs: 2, md: 4 },
        maxWidth: 700,
        mx: "auto",
        mt: 4,
        borderRadius: 4,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Edit About Page
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          About info saved!
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Bio"
            name="bio"
            value={form.bio}
            onChange={handleChange}
            required
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            label="Values"
            name="values"
            value={form.values}
            onChange={handleChange}
            required
            fullWidth
            multiline
            rows={2}
          />
          <TextField
            label="Skills (comma-separated)"
            name="skills"
            value={form.skills}
            onChange={handleChange}
            fullWidth
          />
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Profile Photo
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                src={form.photoUrl || "/profile-photo.jpg"}
                sx={{ width: 80, height: 80 }}
              />
              <Button variant="outlined" component="label">
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handlePhotoChange}
                />
              </Button>
              {photoFile && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePhotoUpload}
                >
                  Save Photo
                </Button>
              )}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  size="small"
                  variant="outlined"
                  placeholder="Paste image URL"
                  value={aboutPhotoUrlInput}
                  onChange={(e) => setAboutPhotoUrlInput(e.target.value)}
                  sx={{
                    background: "#fff",
                    borderRadius: 2,
                    mr: 1,
                    minWidth: 200,
                  }}
                  InputProps={{ style: { color: "#1976d2" } }}
                />
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    borderRadius: 8,
                    fontWeight: 700,
                    background:
                      "linear-gradient(90deg, #1976d2 0%, #00bcd4 100%)",
                  }}
                  onClick={handleAboutPhotoUrlSubmit}
                >
                  Use URL
                </Button>
              </Box>
            </Stack>
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Skills Preview:
            </Typography>
            {form.skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
              .map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  color="secondary"
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={saving}
            sx={{ fontWeight: 700, borderRadius: 8 }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default AboutManager;
