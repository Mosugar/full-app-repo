import React from 'react';
import './App.css';
import Header from './components/Header/Header.jsx';
import Hero from './components/Hero/Hero.jsx';
import Services from './components/Services/Services.jsx';
import About from './components/about/About.jsx';
import Projects from './components/projects/Projects.jsx';
import Contact from './components/contact/Contact.jsx';
import Footer from './components/Footer/Footer.jsx';


function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      
      {/* Gradient Transition */}
      <div className="section-transition"></div>
      
      <Services />
      <About />
      <Projects />
      
   
      <Contact />
      <Footer />
    </div>
  );
}

export default App;