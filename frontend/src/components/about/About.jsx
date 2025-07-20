import React, { useState } from 'react';
import './About.css';

const About = () => {
  const [activeTeamMember, setActiveTeamMember] = useState(0);

  const stats = [
    { icon: "🏗️", number: "250+", label: "Projets réalisés", description: "Espaces transformés avec excellence" },
    { icon: "⭐", number: "8+", label: "Années d'expérience", description: "Au service de l'aménagement intérieur" },
    { icon: "❤️", number: "98%", label: "Clients satisfaits", description: "Témoignent de notre qualité" }
  ];

  const team = [
    {
      name: "Taoufiq Laarif",
      role: "Fondateur & Directeur Général",
      description: "Visionnaire et expert en aménagement intérieur depuis 2016. Taoufiq guide notre vision créative avec passion et excellence.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      specialty: "Direction & Vision"
    },
    {
      name: "Amina El Fassi",
      role: "Architecte d'Intérieur Senior",
      description: "Experte en design résidentiel haut de gamme, elle transforme vos espaces en véritables œuvres d'art.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      specialty: "Design Résidentiel"
    },
    {
      name: "Youssef Bennani",
      role: "Chef de Projet Senior",
      description: "Expert en gestion de projets complexes, il coordonne parfaitement créativité et réalisation technique.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      specialty: "Gestion de Projets"
    },
    {
      name: "Salma Idrissi",
      role: "Designer Espaces Commerciaux",
      description: "Créatrice d'ambiances commerciales captivantes qui optimisent l'expérience client.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      specialty: "Espaces Commerciaux"
    },
    {
      name: "Omar Khalil",
      role: "Responsable Technique",
      description: "Ingénieur passionné par l'innovation, il intègre les dernières technologies dans nos réalisations.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      specialty: "Innovation Technique"
    },
    {
      name: "Fatima Zahra Alami",
      role: "Consultante Couleurs & Matières",
      description: "Experte en harmonie chromatique, elle donne vie à nos concepts par ses choix raffinés.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      specialty: "Couleurs & Matières"
    },
    {
      name: "Mehdi Benali",
      role: "Spécialiste Mobilier Sur Mesure",
      description: "Artisan du mobilier contemporain, il conçoit des pièces uniques adaptées à vos espaces.",
      image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      specialty: "Mobilier Sur Mesure"
    },
    {
      name: "Aicha Tantaoui",
      role: "Coordonnatrice Client",
      description: "Interface privilégiée avec nos clients, elle assure un suivi personnalisé de qualité.",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      specialty: "Relation Client"
    },
    {
      name: "Hassan Ouali",
      role: "Expert Éclairage & Domotique",
      description: "Spécialiste de l'éclairage intelligent et des systèmes domotiques avancés.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      specialty: "Éclairage & Domotique"
    },
    {
      name: "Khadija Berrada",
      role: "Architecte Junior",
      description: "Jeune talent créatif qui apporte une vision fraîche et innovante à nos projets.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      specialty: "Design Contemporain"
    },
    {
      name: "Rachid Elmani",
      role: "Responsable Finitions",
      description: "Expert en finitions haut de gamme, il apporte la touche finale qui fait la différence.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      specialty: "Finitions Premium"
    },
    {
      name: "Nadia Senhaji",
      role: "Designer 3D & Visualisation",
      description: "Artiste numérique qui donne vie à nos concepts avec des visualisations photoréalistes.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      specialty: "Visualisation 3D"
    }
  ];

  return (
    <section className="about" id="about">
      <div className="about-bg">
        <div className="bg-pattern"></div>
        <div className="floating-dots">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`dot dot-${i}`}></div>
          ))}
        </div>
      </div>

      <div className="about-container">
        {/* Hero Section */}
        <div className="about-hero">
          <div className="hero-badge">
            <span>À propos de nous</span>
          </div>
          <h2 className="hero-title">
            Créateurs d'espaces <span className="highlight">d'exception</span> depuis 2016
          </h2>
          <p className="hero-description">
            Basés à Salé, nous transformons vos idées en réalités grâce à notre expertise 
            en aménagement intérieur et notre passion pour l'excellence.
          </p>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stats-container">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-desc">{stat.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location Section */}
        <div className="location-section">
          <div className="location-header">
            <h3 className="location-title">Notre Bureau</h3>
            <p className="location-subtitle">Venez nous rencontrer dans nos locaux modernes à Salé</p>
          </div>
          
          <div className="location-content">
            <div className="location-info">
              <div className="location-card">
                <div className="location-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="location-details">
                  <h4 className="address-title">Adresse</h4>
                  <p className="address-text">Salé, Rabat-Salé-Kénitra<br/>Maroc 🇲🇦</p>
                </div>
              </div>
              
              <div className="location-card">
                <div className="location-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="location-details">
                  <h4 className="address-title">Horaires</h4>
                  <p className="address-text">Lun-Ven: 9h00 - 18h00<br/>Sam: 9h00 - 13h00</p>
                </div>
              </div>
              
              <div className="location-card">
                <div className="location-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="location-details">
                  <h4 className="address-title">Contact</h4>
                  <p className="address-text">+212 6 17 86 90 01<br/>contact@tlglobal.ma</p>
                </div>
              </div>
              
              <a 
                href="https://www.google.com/maps/dir//Salé,+Morocco" 
                target="_blank" 
                rel="noopener noreferrer"
                className="directions-btn"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M3 11l19-9-9 19-2-8-8-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Obtenir l'itinéraire
              </a>
            </div>
            
            <div className="map-container">
              <div className="map-wrapper">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53248.37457749283!2d-6.8361!3d34.0531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76b871f50c5c1%3A0x7ac946ed7408637b!2sSalé%2C%20Morocco!5e0!3m2!1sen!2sus!4v1642000000000!5m2!1sen!2sus"
                  width="100%"
                  height="400"
                  style={{ border: 0, borderRadius: '20px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="TL GLOBAL Location - Salé, Morocco"
                ></iframe>
                <div className="map-overlay">
                  <div className="map-badge">
                    <div className="badge-icon">📍</div>
                    <div className="badge-content">
                      <span className="badge-title">TL GLOBAL</span>
                      <span className="badge-location">Salé, Maroc</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="team-section">
          <div className="team-header">
            <h3 className="team-title">Notre Équipe d'Experts</h3>
            <p className="team-subtitle">12 professionnels passionnés unis par l'excellence</p>
          </div>

          <div className="team-content">
            {/* Team Grid */}
            <div className="team-grid">
              {team.map((member, index) => (
                <div 
                  key={index} 
                  className={`team-member ${activeTeamMember === index ? 'active' : ''}`}
                  onClick={() => setActiveTeamMember(index)}
                >
                  <div className="member-photo">
                    <img src={member.image} alt={member.name} />
                    <div className="member-overlay">
                      <span className="member-specialty">{member.specialty}</span>
                    </div>
                  </div>
                  <div className="member-details">
                    <h4 className="member-name">{member.name}</h4>
                    <p className="member-title">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Featured Member */}
            <div className="featured-section">
              <div className="featured-photo">
                <img src={team[activeTeamMember].image} alt={team[activeTeamMember].name} />
              </div>
              <div className="featured-info">
                <div className="featured-badge">
                  {team[activeTeamMember].specialty}
                </div>
                <h3 className="featured-name">{team[activeTeamMember].name}</h3>
                <h4 className="featured-role">{team[activeTeamMember].role}</h4>
                <p className="featured-desc">{team[activeTeamMember].description}</p>
                <a href="https://wa.me/212617869001" className="contact-link" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                  </svg>
                  Contacter sur WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;