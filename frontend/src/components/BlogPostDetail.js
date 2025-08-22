import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams, Link as RouterLink } from "react-router-dom";
import { api } from "../services/api";
import {
  Box,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  Paper,
  Button,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../contexts/AuthContext";

const BlogPostDetail = () => {
  const { slugOrId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [userCount, setUserCount] = useState(0);

  const { user, token } = useAuth();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        let res = await api.get(`/blog/${slugOrId}`);
        setPost(res.data);
        setLikes(res.data.likes || 0);
        setLiked(
          res.data.likedBy &&
            res.data.likedBy.includes(localStorage.getItem("userId") || "guest")
        );
        // Fetch comments using the post's _id
        const commentsRes = await api.get(`/blog/${res.data._id}/comments`);
        setComments(commentsRes.data);
        // Record a unique reader and get the count
        const userId = localStorage.getItem("userId") || "guest";
        const readRes = await api.post(`/blog/${res.data._id}/read`, {
          userId,
        });
        setUserCount(readRes.data.readBy);
      } catch (err) {
        setError("Blog post not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [slugOrId]);

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      localStorage.setItem(
        "userId",
        "user-" + Math.random().toString(36).substr(2, 9)
      );
    }
  }, []);

  const handleLike = async () => {
    const userId = localStorage.getItem("userId") || "guest";
    try {
      const res = await api.post(`/blog/${post._id}/like`, { userId });
      setLikes(res.data.likes);
      setLiked(res.data.liked);
    } catch {}
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;
    try {
      await api.post(`/blog/${post._id}/comment`, {
        name: commentName,
        text: commentText,
      });
      const refreshed = await api.get(`/blog/${post._id}/comments`);
      setComments(refreshed.data);
      setCommentName("");
      setCommentText("");
    } catch {}
  };

  const handleDeleteComment = async (commentId) => {
    if (!token) return;
    try {
      await api.delete(`/blog/${post._id}/comment/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const refreshed = await api.get(`/blog/${post._id}/comments`);
      setComments(refreshed.data);
    } catch {}
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" py={8}>
        <CircularProgress />
      </Box>
    );
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!post) return <Alert severity="info">No blog post found.</Alert>;

  return (
    <Paper
      elevation={8}
      sx={{
        p: { xs: 2, sm: 3, md: 6 },
        maxWidth: { xs: "100%", sm: 600, md: 900 },
        width: "100%",
        mx: "auto",
        mt: { xs: 2, md: 6 },
        borderRadius: { xs: 0, sm: 4, md: 6 },
        background: "linear-gradient(120deg, #23263a 0%, #00bcd4 100%)",
        color: "#fff",
        boxShadow: "0 8px 32px 0 rgba(60, 72, 88, 0.18)",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 900,
          mb: 2,
          letterSpacing: 1,
          color: "#fff",
          textShadow: "0 2px 16px rgba(0,0,0,0.18)",
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          lineHeight: 1.1,
          wordBreak: "break-word",
        }}
      >
        {post.title}
      </Typography>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        gap={2}
        mb={2}
      >
        <Chip
          label={post.category}
          color="secondary"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "0.9rem", sm: "1rem" },
            background: "#fff",
            color: "#1976d2",
          }}
        />
        <Typography
          variant="body1"
          sx={{
            color: "#e0e0e0",
            fontWeight: 500,
            fontSize: { xs: "0.95rem", sm: "1.05rem" },
          }}
        >
          {post.date ? new Date(post.date).toLocaleDateString() : ""} •{" "}
          {post.readTime}
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <ThumbUpIcon
            sx={{ color: liked ? "#00bcd4" : "#fff", cursor: "pointer" }}
            onClick={handleLike}
          />
          <Typography variant="body2" sx={{ color: "#fff", fontWeight: 700 }}>
            {likes}
          </Typography>
          <ChatBubbleOutlineIcon sx={{ color: "#fff", ml: 2 }} />
          <Typography variant="body2" sx={{ color: "#fff", fontWeight: 700 }}>
            {comments.length}
          </Typography>
        </Box>
        <Box ml={{ xs: 0, sm: "auto" }}>
          <Typography variant="body2" sx={{ color: "#fff", fontWeight: 700 }}>
            Read By: {userCount}
          </Typography>
        </Box>
      </Box>
      {post.imageUrl && (
        <Box
          component="img"
          src={post.imageUrl}
          alt={post.title}
          sx={{
            width: "100%",
            maxHeight: { xs: 180, sm: 300, md: 400 },
            objectFit: "cover",
            borderRadius: 4,
            mb: 4,
            boxShadow: 3,
          }}
        />
      )}
      <Box
        sx={{
          color: "#e0e0e0",
          fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
          mb: 4,
          lineHeight: 1.8,
          fontFamily: "Roboto, Arial, sans-serif",
          wordBreak: "break-word",
        }}
      >
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </Box>
      <Typography
        variant="h4"
        sx={{ color: "#fff", fontWeight: 700, mt: 6, mb: 2 }}
      >
        Comments
      </Typography>
      <Box mb={4}>
        {comments.length === 0 && (
          <Typography sx={{ color: "#e0e0e0" }}>
            No comments yet. Be the first to comment!
          </Typography>
        )}
        {comments.map((c, i) => (
          <Paper
            key={i}
            sx={{
              p: 2,
              mb: 2,
              background: "rgba(255,255,255,0.10)",
              color: "#23263a",
              position: "relative",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 700, color: "#23263a" }}
            >
              {c.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#23263a", fontSize: "1.08rem", fontWeight: 500 }}
            >
              {c.text}
            </Typography>
            <Typography variant="caption" sx={{ color: "#e0e0e0" }}>
              {new Date(c.date).toLocaleString()}
            </Typography>
            {user && user.role === "admin" && (
              <DeleteIcon
                onClick={() => handleDeleteComment(c._id)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  color: "#d32f2f",
                  cursor: "pointer",
                }}
                titleAccess="Delete comment"
              />
            )}
          </Paper>
        ))}
        <Box
          component="form"
          onSubmit={handleAddComment}
          mt={2}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            label="Your Name"
            placeholder="Name"
            value={commentName}
            onChange={(e) => setCommentName(e.target.value)}
            required
            sx={{ background: "#fff", borderRadius: 2 }}
            InputProps={{ style: { color: "#1976d2" } }}
          />
          <TextField
            label="Your Comment"
            placeholder="Write your comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
            multiline
            rows={3}
            sx={{ background: "#fff", borderRadius: 2 }}
            InputProps={{ style: { color: "#1976d2" } }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              borderRadius: 8,
              fontWeight: 700,
              background: "linear-gradient(90deg, #1976d2 0%, #00bcd4 100%)",
            }}
          >
            Add Comment
          </Button>
        </Box>
      </Box>
      <Button
        component={RouterLink}
        to="/blog"
        variant="contained"
        sx={{
          borderRadius: 8,
          fontWeight: 700,
          background: "linear-gradient(90deg, #1976d2 0%, #00bcd4 100%)",
          mt: 2,
        }}
      >
        Back to Blog
      </Button>
    </Paper>
  );
};

export default BlogPostDetail;
