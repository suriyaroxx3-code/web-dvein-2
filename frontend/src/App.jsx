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

// ADMIN AUTH (NEW ADDITION) - Path pathukonga
import AdminLogin from './pages/Admin/AdminLogin';
import Dashboard from './pages/Admin/Dashboard';

// FOOTER & WHATSAPP
import Footer from './components/Footer';
import WhatsAppBtn from './components/common/WhatsAppBtn';

// Dummy Courses Page
const Courses = () => <div className="h-screen flex items-center justify-center text-3xl font-bold text-gray-600">Courses Coming Soon!</div>;

const Layout = () => {
  const location = useLocation();

  // Navbar & Footer should NOT appear on Admin Pages or Our Story Page
  const isHomePage = location.pathname === '/';
  const isAdminPage = location.pathname.startsWith('/admin');
  const isOurStoryPage = location.pathname === '/our-story';

  return (
    <>
      <ScrollToTop />

      {/* Navbar Hide on Home, Admin & Our Story Pages */}
      {!isHomePage && !isAdminPage && !isOurStoryPage && <Navbar />}

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/services/software" element={<SoftwareSolutions />} />
        <Route path="/services/courses" element={<CoursesPage />} />
        <Route path="/training" element={<Training />} />
        <Route path="/products" element={<Products />} />
        <Route path="/career-hub" element={<CareerHub />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/student-projects" element={<StudentProjects />} />
        <Route path="/collaboration" element={<Collaborations />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/privacy" element={<Privacy />} />

        {/* USER AUTH ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />

        {/* ADMIN ROUTES (NEW) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<Dashboard />} />

        {/* 404 PAGE */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer Hide on Home, Admin & Our Story Pages */}
      {!isHomePage && !isAdminPage && !isOurStoryPage && (
        <>
          <Footer />
          <WhatsAppBtn />
        </>
      )}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
