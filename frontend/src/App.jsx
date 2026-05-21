import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';
import Navbar from './components/Navbar';

// PAGES
import Home from './pages/Home';
import Training from './pages/internships';
import Products from './pages/Products';
import CareerHub from './pages/CareerHub';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import SoftwareSolutions from './pages/SoftwareSolutions';
import CoursesPage from './pages/CoursesPage';
import StudentProjects from './pages/StudentProjects';
import Collaborations from './pages/Collaborations';
import OurStory from './pages/OurStory';
import Privacy from './pages/Privacy';

// USER AUTH
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';

// ADMIN
import AdminLogin from './pages/Admin/AdminLogin';
import Dashboard from './pages/Admin/Dashboard';
import CMSPanel from './pages/Admin/CMSPanel';

// FOOTER & WHATSAPP
import Footer from './components/Footer';
import WhatsAppBtn from './components/common/WhatsAppBtn';

// CMS CONTEXT
import { ContentProvider } from './context/ContentContext';

const Layout = () => {
  const location = useLocation();

  const isHomePage    = location.pathname === '/';
  const isAdminPage   = location.pathname.startsWith('/admin');
  const isOurStoryPage = location.pathname === '/our-story';

  return (
    <>
      <ScrollToTop />

      {/* Navbar: hide on Home, Admin & Our Story pages */}
      {!isHomePage && !isAdminPage && !isOurStoryPage && <Navbar />}

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/"                  element={<Home />} />
        <Route path="/services/software" element={<SoftwareSolutions />} />
        <Route path="/services/courses"  element={<CoursesPage />} />
        <Route path="/training"          element={<Training />} />
        <Route path="/products"          element={<Products />} />
        <Route path="/career-hub"        element={<CareerHub />} />
        <Route path="/contact"           element={<Contact />} />
        <Route path="/student-projects"  element={<StudentProjects />} />
        <Route path="/collaboration"     element={<Collaborations />} />
        <Route path="/our-story"         element={<OurStory />} />
        <Route path="/privacy"           element={<Privacy />} />

        {/* USER AUTH ROUTES */}
        <Route path="/login"             element={<Login />} />
        <Route path="/register"          element={<Register />} />
        <Route path="/user-dashboard"    element={<UserDashboard />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin/login"       element={<AdminLogin />} />
        <Route path="/admin/dashboard"   element={<Dashboard />} />
        <Route path="/admin-dashboard"   element={<Dashboard />} />
        <Route path="/admin/cms"         element={<CMSPanel />} />

        {/* 404 */}
        <Route path="*"                  element={<NotFound />} />
      </Routes>

      {/* Footer & WhatsApp: hide on Home (has its own), Admin & Our Story pages */}
      {!isHomePage && !isAdminPage && !isOurStoryPage && <Footer />}
      {!isHomePage && !isAdminPage && <WhatsAppBtn />}
    </>
  );
};

const App = () => (
  <ContentProvider>
    <Router>
      <Layout />
    </Router>
  </ContentProvider>
);

export default App;
