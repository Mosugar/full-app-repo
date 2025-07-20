import React, { useState, useEffect } from 'react';
import './contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('Form data to be sent to API:', formData);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        projectType: '',
        budget: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const contactMethods = [
    {
      id: 'email',
      title: 'Email us',
      value: 'contact@tlglobal.ma',
      description: 'Réponse sous 24h',
      action: 'mailto:contact@tlglobal.ma'
    },
    {
      id: 'phone',
      title: 'Call us',
      value: '+212 6 17 86 90 01',
      description: 'Lun-Ven 9h-18h',
      action: 'tel:+212617869001'
    },
    {
      id: 'location',
      title: 'Our location',
      value: 'Salé, Maroc',
      description: 'Rendez-vous sur demande',
      action: null
    }
  ];

  return (
    <section className="contact" id="contact">
      <div className="contact-background">
        <div className="bg-gradient"></div>
        <div className="bg-pattern"></div>
        <div className="floating-elements">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className={`floating-dot dot-${i}`}
              style={{
                '--mouse-x': `${mousePosition.x}%`,
                '--mouse-y': `${mousePosition.y}%`
              }}
            ></div>
          ))}
        </div>
        <div className="background-text">CONTACT</div>
      </div>

      <div className="contact-container">
        <div className="contact-left">
          <div className="contact-badge">
            <div className="badge-dot"></div>
            <span>Contact</span>
          </div>
          
          <h1 className="contact-title">
            Get in touch
          </h1>
          
          <p className="contact-subtitle">
            Avez-vous des questions ou prêt à transformer votre espace avec notre expertise en aménagement ?
          </p>

          <div className="contact-methods">
            {contactMethods.map((method) => (
              <div key={method.id} className="contact-method">
                <div className="method-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="method-content">
                  <h3 className="method-title">{method.title}</h3>
                  {method.action ? (
                    <a 
                      href={method.action}
                      className="method-value"
                      target={method.action.startsWith('http') ? '_blank' : '_self'}
                      rel={method.action.startsWith('http') ? 'noopener noreferrer' : ''}
                    >
                      {method.value}
                    </a>
                  ) : (
                    <span className="method-value">{method.value}</span>
                  )}
                  <p className="method-description">{method.description}</p>
                </div>
                <div className="method-arrow">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-right">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('firstName')}
                onBlur={() => setFocusedField(null)}
                placeholder="Prénom"
                className={`form-input ${focusedField === 'firstName' ? 'focused' : ''} ${formData.firstName ? 'filled' : ''}`}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('lastName')}
                onBlur={() => setFocusedField(null)}
                placeholder="Nom"
                className={`form-input ${focusedField === 'lastName' ? 'focused' : ''} ${formData.lastName ? 'filled' : ''}`}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="Email"
                className={`form-input ${focusedField === 'email' ? 'focused' : ''} ${formData.email ? 'filled' : ''}`}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                placeholder="Téléphone"
                className={`form-input ${focusedField === 'phone' ? 'focused' : ''} ${formData.phone ? 'filled' : ''}`}
                required
              />
            </div>

            <div className="form-group">
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('projectType')}
                onBlur={() => setFocusedField(null)}
                className={`form-select ${focusedField === 'projectType' ? 'focused' : ''} ${formData.projectType ? 'filled' : ''}`}
                required
              >
                <option value="">Type de projet</option>
                <option value="amenagement-complet">Aménagement intérieur complet</option>
                <option value="renovation-partielle">Rénovation partielle</option>
                <option value="design-conception">Design et conception</option>
                <option value="mobilier-mesure">Mobilier sur mesure</option>
                <option value="consultation">Consultation uniquement</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div className="form-group">
              <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('budget')}
                onBlur={() => setFocusedField(null)}
                className={`form-select ${focusedField === 'budget' ? 'focused' : ''} ${formData.budget ? 'filled' : ''}`}
              >
                <option value="">Budget estimé</option>
                <option value="budget-50k">Moins de 50 000 MAD</option>
                <option value="budget-100k">50 000 - 100 000 MAD</option>
                <option value="budget-200k">100 000 - 200 000 MAD</option>
                <option value="budget-500k">200 000 - 500 000 MAD</option>
                <option value="budget-500k+">Plus de 500 000 MAD</option>
                <option value="budget-discuter">À discuter</option>
              </select>
            </div>

            <div className="form-group full-width">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                placeholder="Décrivez votre projet, vos besoins, vos inspirations..."
                rows="5"
                className={`form-textarea ${focusedField === 'message' ? 'focused' : ''} ${formData.message ? 'filled' : ''}`}
                required
              />
            </div>

            <button 
              type="submit" 
              className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              <span className="button-text">
                {isSubmitting ? 'Envoi en cours...' : 'Submit'}
              </span>
              {!isSubmitting && (
                <svg className="button-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {isSubmitting && (
                <div className="loading-spinner"></div>
              )}
            </button>

            {submitStatus && (
              <div className={`submit-status ${submitStatus}`}>
                <div className="status-icon">
                  {submitStatus === 'success' ? (
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                      <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  )}
                </div>
                <div className="status-text">
                  {submitStatus === 'success' 
                    ? 'Merci ! Votre demande a été envoyée avec succès.'
                    : 'Erreur lors de l\'envoi. Veuillez réessayer.'
                  }
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;