import React, { useState } from 'react';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="App">
      {/* Navigation Header */}
      <header className="navbar">
        <div className="navbar-container">
          <div className="logo">UI Wireframe</div>
          <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <a href="#home" className="nav-link">Home</a>
            <a href="#features" className="nav-link">Features</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>
          <button 
            className="menu-toggle" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Our Platform</h1>
          <p className="hero-subtitle">
            Build amazing experiences with our modern UI components
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <div className="main-layout">
        <aside className="sidebar">
          <h3 className="sidebar-title">Quick Links</h3>
          <ul className="sidebar-menu">
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#analytics">Analytics</a></li>
            <li><a href="#reports">Reports</a></li>
            <li><a href="#settings">Settings</a></li>
            <li><a href="#help">Help & Support</a></li>
          </ul>
        </aside>

        <main className="content">
          {/* Features Section */}
          <section className="features" id="features">
            <h2 className="section-title">Key Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🚀</div>
                <h3>Fast Performance</h3>
                <p>Lightning-fast loading times and smooth interactions</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎨</div>
                <h3>Modern Design</h3>
                <p>Beautiful, responsive design that works everywhere</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Secure</h3>
                <p>Enterprise-grade security to protect your data</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3>Mobile Ready</h3>
                <p>Fully responsive across all devices and screen sizes</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⚙️</div>
                <h3>Customizable</h3>
                <p>Flexible configuration options to fit your needs</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🌐</div>
                <h3>Global</h3>
                <p>Multi-language support for worldwide accessibility</p>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="about" id="about">
            <h2 className="section-title">About Us</h2>
            <div className="about-content">
              <div className="about-text">
                <p>
                  We are dedicated to creating exceptional user experiences through 
                  innovative design and cutting-edge technology. Our platform provides 
                  the tools you need to succeed in today's digital landscape.
                </p>
                <p>
                  With years of experience and a commitment to excellence, we deliver 
                  solutions that drive results and exceed expectations.
                </p>
              </div>
              <div className="about-stats">
                <div className="stat">
                  <div className="stat-number">10K+</div>
                  <div className="stat-label">Active Users</div>
                </div>
                <div className="stat">
                  <div className="stat-number">99%</div>
                  <div className="stat-label">Satisfaction Rate</div>
                </div>
                <div className="stat">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Support</div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="contact" id="contact">
            <h2 className="section-title">Get In Touch</h2>
            <form className="contact-form">
              <div className="form-group">
                <input type="text" placeholder="Your Name" className="form-input" />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" className="form-input" />
              </div>
              <div className="form-group">
                <textarea 
                  placeholder="Your Message" 
                  className="form-input form-textarea"
                  rows="5"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#press">Press</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#docs">Documentation</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#support">Support</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#cookies">Cookie Policy</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <ul>
              <li><a href="#twitter">Twitter</a></li>
              <li><a href="#linkedin">LinkedIn</a></li>
              <li><a href="#github">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 UI Wireframe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
