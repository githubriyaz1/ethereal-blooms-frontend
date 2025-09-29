import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
// Updated import paths to match your file names
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ClientReviewPage from './pages/ClientReviewPage';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // This is a listener that checks if the user is logged in or out
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Pass the user info to the navbar */}
        <AppNavbar user={user} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {/* This is a protected route. It only exists if a user is logged in. */}
            {user && <Route path="/review" element={<ClientReviewPage />} />}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
