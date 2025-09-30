import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ClientReviewPage from './pages/ClientReviewPage';
import OrganizerRegisterPage from './pages/OrganizerRegisterPage';
import OrganizersListPage from './pages/OrganizersListPage';
import OrganizerProfilePage from './pages/OrganizerProfilePage';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        <AppNavbar user={user} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            {/* THIS IS THE GLOW-UP: New routes for the marketplace */}
            <Route path="/organizer-register" element={<OrganizerRegisterPage />} />
            <Route path="/organizers" element={<OrganizersListPage />} />
            <Route path="/organizer/:id" element={<OrganizerProfilePage />} />

            {/* Protected route for leaving a review */}
            {user && <Route path="/review" element={<ClientReviewPage />} />}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

