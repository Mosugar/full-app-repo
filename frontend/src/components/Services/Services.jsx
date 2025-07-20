import React, { useState, useEffect } from 'react';
import './Services.css';

const Services = () => {
  const [activeService, setActiveService] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const services = [
    {
      id: 1,
      title: "Aménagements intérieurs",
      subtitle: "Espaces sur mesure",
      description: "Conception et réalisation d'espaces intérieurs sur mesure qui reflètent votre personnalité et optimisent chaque mètre carré.",
      icon: "🏠",
      features: ["Plans 3D", "Optimisation", "Décoration", "Suivi"],
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "#e7e702"
    },
    {
      id: 2,
      title: "Rénovation complète",
      subtitle: "Transformation totale",
      description: "Métamorphose complète de vos espaces avec une approche globale, de la conception à la réalisation finale.",
      icon: "🔨",
      features: ["Démolition", "Gros œuvre", "Finitions", "Coordination"],
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "#00d4aa"
    },
    {
      id: 3,
      title: "Design & Conception",
      subtitle: "Vision créative",
      description: "Étude complète avec plans techniques, rendus 3D photoréalistes et conseils d'experts pour matérialiser vos rêves.",
      icon: "✨",
      features: ["Rendus 3D", "Plans techniques", "Conseils", "Faisabilité"],
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "#ff6b6b"
    },
    {
      id: 4,
      title: "Mobilier sur mesure",
      subtitle: "Créations uniques",
      description: "Fabrication artisanale de mobilier unique, parfaitement adapté à vos espaces et besoins spécifiques.",
      icon: "🪑",
      features: ["Design unique", "Fabrication", "Matériaux nobles", "Installation"],
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "#a78bfa"
    },
    {
      id: 5,
      title: "Finitions premium",
      subtitle: "Excellence du détail",
      description: "Attention méticuleuse aux détails avec des finitions haut de gamme qui subliment votre projet.",
      icon: "💎",
      features: ["Matériaux premium", "Finitions", "Éclairage", "Détails"],
      image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "#fbbf24"
    },
    {
      id: 6,
      title: "Gestion de projet",
      subtitle: "Coordination experte",
      description: "Pilotage complet de votre projet avec respect des délais, budget maîtrisé et qualité irréprochable.",
      icon: "📋",
      features: ["Planning", "Budget", "Qualité", "Coordination"],
      image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "#06d6a0"
    }
  ];

  // Auto rotation
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, services.length]);

  return (
    <section className="services" id="services">
      {/* Modern Gradient Background */}
      <div className="services-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="mesh-gradient"></div>
      </div>

      <div className="services-container">
        {/* Header */}
        <div className="services-header">
          <div className="header-badge">
            <span className="badge-text">Nos Expertises</span>
            <div className="badge-glow"></div>
          </div>
          <h2 className="section-title">
            Services d'exception pour
            <span className="title-highlight"> projets uniques</span>
          </h2>
          <p className="section-subtitle">
            Transformez vos espaces avec notre expertise technique et créative
          </p>
        </div>

        {/* Modern Services Layout */}
        <div 
          className="services-showcase"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Service Navigation */}
          <div className="service-nav">
            {services.map((service, index) => (
              <button
                key={service.id}
                className={`nav-item ${activeService === index ? 'active' : ''}`}
                onClick={() => setActiveService(index)}
                style={{ '--accent-color': service.color }}
              >
                <div className="nav-icon">
                  <span>{service.icon}</span>
                </div>
                <div className="nav-content">
                  <h3 className="nav-title">{service.title}</h3>
                  <p className="nav-subtitle">{service.subtitle}</p>
                </div>
                <div className="nav-indicator"></div>
              </button>
            ))}
          </div>

          {/* Active Service Display */}
          <div className="service-display">
            <div className="display-image">
              <img 
                src={services[activeService].image} 
                alt={services[activeService].title}
                key={activeService}
              />
              <div className="image-overlay"></div>
              <div className="floating-icon">
                <span>{services[activeService].icon}</span>
              </div>
            </div>
            
            <div className="display-content">
              <div className="content-header">
                <h3 className="service-title">
                  {services[activeService].title}
                </h3>
                <p className="service-description">
                  {services[activeService].description}
                </p>
              </div>

              <div className="service-features">
                {services[activeService].features.map((feature, index) => (
                  <div key={index} className="feature-tag">
                    <div className="tag-dot"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                className="service-cta"
                style={{ '--accent-color': services[activeService].color }}
              >
                <span>Découvrir ce service</span>
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="progress-indicator">
            {services.map((_, index) => (
              <div
                key={index}
                className={`progress-dot ${activeService === index ? 'active' : ''}`}
                style={{ '--accent-color': services[index].color }}
                onClick={() => setActiveService(index)}
              ></div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bottom-cta">
          <div className="cta-content">
            <h3 className="cta-title">Prêt à concrétiser votre projet ?</h3>
            <p className="cta-text">Discutons de vos besoins et créons ensemble l'espace de vos rêves</p>
          </div>
          <div className="cta-buttons">
            <a href="#contact" className="cta-btn primary">
              <span>Consultation gratuite</span>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </a>
            <a href="https://wa.me/212617869001" className="cta-btn secondary" target="_blank" rel="noopener noreferrer">
              <span>WhatsApp</span>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;