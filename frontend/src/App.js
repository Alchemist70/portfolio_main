import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./components/admin/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Publications from "./components/Publications";
import Blog from "./components/Blog";
import BlogPostDetail from "./components/BlogPostDetail";
import Contact from "./components/Contact";
import About from "./components/About";

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="admin/login" element={<Login />} />
            <Route path="projects" element={<Projects />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="publications" element={<Publications />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slugOrId" element={<BlogPostDetail />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            <Route
              path="admin"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
