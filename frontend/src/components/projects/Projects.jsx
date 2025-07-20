import React, { useState } from 'react';
import './Projects.css';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    {
      id: 1,
      name: "Villa Moderne Rabat",
      category: "Aménagement Résidentiel",
      year: "2024",
      location: "Rabat, Maroc",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Transformation complète d'une villa de 300m² avec un design contemporain alliant luxe et fonctionnalité. Ce projet représente l'excellence de notre savoir-faire en aménagement résidentiel haut de gamme.",
      services: [
        "Conception architecturale d'intérieur",
        "Aménagement sur mesure",
        "Mobilier design contemporain",
        "Éclairage d'ambiance LED",
        "Domotique intégrée",
        "Finitions premium"
      ],
      details: {
        surface: "300 m²",
        duration: "4 mois",
        budget: "500 000 - 750 000 MAD",
        client: "Famille Benali"
      },
      challenges: "Intégration harmonieuse de technologies modernes dans un espace familial chaleureux",
      results: "Augmentation de 40% de la valeur immobilière et satisfaction client exceptionnelle"
    },
    {
      id: 2,
      name: "Appartement Luxe Casablanca",
      category: "Rénovation Complète",
      year: "2024",
      location: "Casablanca, Maroc",
      image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600566752734-eb4ae2286bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Rénovation totale d'un penthouse de 180m² avec vue panoramique sur l'océan. Création d'un espace de vie moderne et sophistiqué pour un jeune couple d'entrepreneurs.",
      services: [
        "Démolition et restructuration",
        "Design d'intérieur contemporain",
        "Cuisine ouverte sur mesure",
        "Salle de bains spa privé",
        "Terrasse aménagée",
        "Système audiovisuel intégré"
      ],
      details: {
        surface: "180 m²",
        duration: "3 mois",
        budget: "300 000 - 450 000 MAD",
        client: "Couple El Amrani"
      },
      challenges: "Optimisation de l'espace et maximisation de la luminosité naturelle",
      results: "Transformation spectaculaire créant un espace de vie unique avec vue imprenable"
    },
    {
      id: 3,
      name: "Bureau Direction Executive",
      category: "Aménagement Commercial",
      year: "2023",
      location: "Salé, Maroc",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1497366412874-3415097a27e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1554774853-b415df9eeb92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Aménagement d'un bureau de direction de 120m² reflétant l'image de marque d'une entreprise technologique innovante. Design moderne et fonctionnel favorisant la productivité.",
      services: [
        "Design bureau direction",
        "Mobilier ergonomique",
        "Salle de réunion équipée",
        "Espace détente collaborateurs",
        "Signalétique corporate",
        "Acoustique optimisée"
      ],
      details: {
        surface: "120 m²",
        duration: "2 mois",
        budget: "200 000 - 300 000 MAD",
        client: "TechnoVision SARL"
      },
      challenges: "Créer un environnement professionnel moderne tout en respectant l'identité de l'entreprise",
      results: "Amélioration de 35% de la productivité et renforcement de l'image de marque"
    },
    {
      id: 4,
      name: "Restaurant Gastronomique",
      category: "Aménagement Commercial",
      year: "2023",
      location: "Rabat, Maroc",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Création d'un restaurant gastronomique de 200m² alliant tradition marocaine et modernité. Ambiance chaleureuse et élégante pour une expérience culinaire unique.",
      services: [
        "Concept design restaurant",
        "Aménagement cuisine professionnelle",
        "Mobilier restaurant sur mesure",
        "Éclairage d'ambiance",
        "Décoration thématique",
        "Optimisation flux clients"
      ],
      details: {
        surface: "200 m²",
        duration: "3 mois",
        budget: "400 000 - 600 000 MAD",
        client: "Restaurant Dar Almounia"
      },
      challenges: "Allier authenticité marocaine et standards modernes de restauration",
      results: "Augmentation de 60% de la clientèle et reconnaissance gastronomique locale"
    },
    {
      id: 5,
      name: "Maison Familiale Témara",
      category: "Aménagement Résidentiel",
      year: "2023",
      location: "Témara, Maroc",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Aménagement complet d'une maison familiale de 250m² avec 4 chambres. Design fonctionnel et confortable adapté aux besoins d'une famille moderne avec enfants.",
      services: [
        "Aménagement famille nombreuse",
        "Chambres enfants personnalisées",
        "Salon familial modulable",
        "Cuisine familiale équipée",
        "Espaces de rangement optimisés",
        "Jardin intérieur aménagé"
      ],
      details: {
        surface: "250 m²",
        duration: "3.5 mois",
        budget: "350 000 - 500 000 MAD",
        client: "Famille Tazi"
      },
      challenges: "Créer des espaces fonctionnels pour chaque membre de la famille tout en conservant l'harmonie",
      results: "Maison familiale parfaitement adaptée avec espaces personnalisés pour chacun"
    },
    {
      id: 6,
      name: "Showroom Automobile Luxe",
      category: "Aménagement Commercial",
      year: "2024",
      location: "Casablanca, Maroc",
      image: "https://images.unsplash.com/photo-1562504208-03fe7ce97dcd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1562504208-03fe7ce97dcd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1569163491919-b5c9f3103ea5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Conception d'un showroom automobile haut de gamme de 400m² mettant en valeur les véhicules de luxe. Design épuré et éclairage professionnel pour sublimer chaque modèle.",
      services: [
        "Design showroom automobile",
        "Éclairage professionnel LED",
        "Sol technique spécialisé",
        "Espaces client VIP",
        "Signalétique premium",
        "Système de présentation rotatif"
      ],
      details: {
        surface: "400 m²",
        duration: "2.5 mois",
        budget: "600 000 - 800 000 MAD",
        client: "Prestige Motors"
      },
      challenges: "Créer un environnement sophistiqué mettant en valeur les véhicules tout en offrant un confort client optimal",
      results: "Augmentation des ventes de 45% et positionnement premium renforcé"
    }
  ];

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  const categories = ['Tous', 'Aménagement Résidentiel', 'Aménagement Commercial', 'Rénovation Complète'];
  const [activeCategory, setActiveCategory] = useState('Tous');

  const filteredProjects = activeCategory === 'Tous' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section className="projects" id="projects">
      {/* Animated Background */}
      <div className="projects-canvas">
        <div className="projects-blueprint-grid"></div>
        <div className="projects-background"></div>
        <div className="projects-background-text">PROJECTS</div>
        
        {/* Project Icons Animation */}
        <div className="project-elements">
          <div className="project-tool tool-blueprint">🏗️</div>
          <div className="project-tool tool-home">🏠</div>
          <div className="project-tool tool-office">🏢</div>
          <div className="project-tool tool-design">✏️</div>
          <div className="project-tool tool-measure">📐</div>
          <div className="project-tool tool-paint">🎨</div>
        </div>
        
        {/* Floating Particles */}
        <div className="project-particles">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={`particle particle-${i}`}></div>
          ))}
        </div>
      </div>

      <div className="projects-container">
        {/* Section Header */}
        <div className="projects-header">
          <div className="projects-badge">
            <div className="badge-dot"></div>
            <span>Nos Réalisations</span>
          </div>
          <h2 className="projects-title">
            Découvrez nos projets d'exception
          </h2>
          <p className="projects-subtitle">
            Plus de 150 projets réalisés avec passion et expertise. 
            Chaque création reflète notre engagement envers l'excellence et l'innovation.
          </p>
        </div>

        {/* Category Filter */}
        <div className="projects-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="project-card"
              onClick={() => openModal(project)}
            >
              <div className="project-image">
                <img src={project.image} alt={project.name} />
                <div className="project-overlay">
                  <div className="project-category">{project.category}</div>
                  <div className="project-view-btn">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>Voir le projet</span>
                  </div>
                </div>
              </div>
              
              <div className="project-info">
                <div className="project-meta">
                  <span className="project-year">{project.year}</span>
                  <span className="project-location">{project.location}</span>
                </div>
                <h3 className="project-name">{project.name}</h3>
                <p className="project-description">{project.description.substring(0, 120)}...</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {isModalOpen && selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="modal-header">
              <div className="modal-image">
                <img src={selectedProject.image} alt={selectedProject.name} />
                <div className="modal-category">{selectedProject.category}</div>
              </div>
              
              <div className="modal-info">
                <h2 className="modal-title">{selectedProject.name}</h2>
                <div className="modal-meta">
                  <div className="meta-item">
                    <svg viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>{selectedProject.year}</span>
                  </div>
                  <div className="meta-item">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>{selectedProject.location}</span>
                  </div>
                </div>
                <p className="modal-description">{selectedProject.description}</p>
              </div>
            </div>

            <div className="modal-body">
              {/* Gallery */}
              <div className="modal-section">
                <h3 className="section-title">Galerie Photos</h3>
                <div className="project-gallery">
                  {selectedProject.gallery.map((image, index) => (
                    <div key={index} className="gallery-item">
                      <img src={image} alt={`${selectedProject.name} ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-sections">
                {/* Services */}
                <div className="modal-section">
                  <h3 className="section-title">Services Réalisés</h3>
                  <ul className="services-list">
                    {selectedProject.services.map((service, index) => (
                      <li key={index} className="service-item">
                        <svg viewBox="0 0 24 24" fill="none">
                          <path d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Project Details */}
                <div className="modal-section">
                  <h3 className="section-title">Détails du Projet</h3>
                  <div className="details-grid">
                    <div className="detail-item">
                      <span className="detail-label">Surface</span>
                      <span className="detail-value">{selectedProject.details.surface}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Durée</span>
                      <span className="detail-value">{selectedProject.details.duration}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Budget</span>
                      <span className="detail-value">{selectedProject.details.budget}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Client</span>
                      <span className="detail-value">{selectedProject.details.client}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Challenges & Results */}
              <div className="modal-sections">
                <div className="modal-section">
                  <h3 className="section-title">Défis Relevés</h3>
                  <p className="challenge-text">{selectedProject.challenges}</p>
                </div>

                <div className="modal-section">
                  <h3 className="section-title">Résultats Obtenus</h3>
                  <p className="results-text">{selectedProject.results}</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <a href="#contact" className="modal-cta-btn" onClick={closeModal}>
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>Discuter de votre projet</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;