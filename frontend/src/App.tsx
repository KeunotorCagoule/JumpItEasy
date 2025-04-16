import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import List from "./pages/parcours/List";
import Generate from "./pages/parcours/Generate";
import View from "./pages/parcours/View";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { AuthProvider } from "./context/AuthContext";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* Protected routes */}
            <Route path="/parcours" element={<List />} />
            <Route path="/parcours/generate" element={<Generate />} />
            <Route path="/parcours/:id" element={<View />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
