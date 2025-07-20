import React from 'react';
import './Hero.css';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="home">
      {/* Dynamic Background */}
      <div className="hero-background">
        <img 
          src="https://res.cloudinary.com/dylpck2et/image/upload/v1752879892/TL_GLOBAL_lxew7e.jpg" 
          alt="TL GLOBAL - Aménagement intérieur de luxe"
          className="hero-image"
        />
        <div className="hero-bg-gradient"></div>
        <div className="hero-floating-elements">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className={`hero-floating-dot hero-dot-${i}`}
            ></div>
          ))}
        </div>
      </div>

      <div className="hero-content">
        <div className="hero-container">
          <div className="hero-text">
            <h1 className="hero-title">
              Créateur d'espaces d'exception
            </h1>
            
            <p className="hero-subtitle">
              Aménagements intérieurs • Rénovation • Design sur mesure
            </p>

            <div className="hero-actions">
              <button 
                className="btn btn-primary"
                onClick={() => scrollToSection('contact')}
              >
                Démarrer mon projet
              </button>
              
              <button 
                className="btn btn-secondary"
                onClick={() => scrollToSection('projects')}
              >
                Découvrir nos réalisations
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <button 
          className="scroll-button"
          onClick={() => scrollToSection('services')}
          aria-label="Faire défiler vers le bas"
        >
          <svg className="scroll-arrow" viewBox="0 0 24 24" fill="none">
            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero;