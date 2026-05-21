import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ContentProvider } from './context/ContentContext';
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

// FOOTER
import Footer from './components/Footer';

const Layout = () => {
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const isOurStoryPage = location.pathname === '/our-story';

  return (
    <>
      <ScrollToTop />

      {!isHomePage && !isOurStoryPage && <Navbar />}

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

        {/* 404 PAGE */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isHomePage && !isOurStoryPage && (
        <>
          <Footer />
        </>
      )}
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
