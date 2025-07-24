import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import Home from './components/home/Home';
import About from './components/about/About';
import ServicesHome from './components/services/ServicesHome';
import Team from './components/team/Team';
import Pricing from './components/pricing/Pricing';
import Blog from './components/blog/Blog';
import Contact from './components/contact/Contact';
import Checkup from './components/Checkup';
import './App.css';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<ServicesHome />} />
        <Route path="/team" element={<Team />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/journal" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkup" element={<Checkup />} />
      </Routes>
      <Footer />
    </>
  );
}