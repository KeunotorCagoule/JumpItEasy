import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import List from './pages/parcours/List';
import View from './pages/parcours/View';
import Documentation from './pages/Documentation';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Faq from './pages/FAQ';
import Generate from './pages/parcours/Generate';
import PrivateRoute from './components/Auth/PrivateRoute';
import PublicOnlyRoute from './components/Auth/PublicOnlyRoute';
import ScrollToTop from './components/common/ScrollToTop';
import UserCourses from './pages/parcours/UserCourses';

const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="parcours" element={<List />} />
          <Route path="documentation" element={<Documentation />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="faq" element={<Faq />} />
          
          {/* Public routes - accessible only when not logged in */}
          <Route element={<PublicOnlyRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          
          {/* Private routes - require authentication */}
          <Route element={<PrivateRoute />}>
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="parcours/generate" element={<Generate />} />
            <Route path="parcours/:id" element={<View />} />
            <Route path="/parcours/mes-parcours" element={<UserCourses />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
