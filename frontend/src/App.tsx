import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import List from './pages/parcours/List';
import Generate from './pages/parcours/Generate';
import View from './pages/parcours/View';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/parcours" element={<List />} />
            <Route path="/parcours/generate" element={<Generate />} />
            <Route path="/parcours/:id" element={<View />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
