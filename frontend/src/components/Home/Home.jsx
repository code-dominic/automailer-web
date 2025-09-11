import React, { useState } from 'react';
import { Mail, Send, Users, BarChart3, Shield, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const Home = () => {
  const [activeNav, setActiveNav] = useState('home');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <NavBar />

      {/* Hero Section */}
      <section className="py-5 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Send Bulk Emails That 
                <span className="text-warning"> Actually Convert</span>
              </h1>
              <p className="lead mb-4">
                Reach thousands of customers instantly with our powerful bulk email platform. 
                Create, send, and track professional email campaigns with ease.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3">
                <button className="btn btn-warning btn-lg px-4 py-3 fw-semibold">
                  <Send className="me-2" size={20} />
                  Start Free Trial
                </button>
                <button className="btn btn-outline-light btn-lg px-4 py-3">
                  Watch Demo
                </button>
              </div>
              <div className="mt-4">
                <small className="opacity-75">✓ No credit card required • ✓ 14-day free trial</small>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <div className="bg-white bg-opacity-10 rounded-4 p-4 backdrop-blur">
                <Mail size={120} className="text-warning mb-3" />
                <h5 className="text-white">Trusted by 50,000+ businesses</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Why Choose AutoMailer?</h2>
            <p className="lead text-muted">Everything you need to run successful email campaigns</p>
          </div>
          
          <div className="row g-4">
            {[
              {
                icon: <Send size={40} />,
                title: "Bulk Email Sending",
                description: "Send thousands of emails instantly with our high-speed delivery infrastructure"
              },
              {
                icon: <BarChart3 size={40} />,
                title: "Advanced Analytics",
                description: "Track opens, clicks, bounces and conversions with detailed real-time reports"
              },
              {
                icon: <Users size={40} />,
                title: "Contact Management",
                description: "Organize your contacts with smart segmentation and automated list building"
              },
              {
                icon: <Shield size={40} />,
                title: "High Deliverability",
                description: "Ensure your emails reach the inbox with our reputation management system"
              },
              {
                icon: <Clock size={40} />,
                title: "Scheduled Campaigns",
                description: "Plan and automate your email campaigns for optimal engagement times"
              },
              {
                icon: <CheckCircle size={40} />,
                title: "Easy Templates",
                description: "Choose from hundreds of professional templates or create your own"
              }
            ].map((feature, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
                  <div className="card-body text-center p-4">
                    <div className="text-primary mb-3">
                      {feature.icon}
                    </div>
                    <h5 className="card-title fw-bold">{feature.title}</h5>
                    <p className="card-text text-muted">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row text-center">
            {[
              { number: "50K+", label: "Active Users" },
              { number: "100M+", label: "Emails Delivered" },
              { number: "98.5%", label: "Delivery Rate" },
              { number: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <div key={index} className="col-6 col-md-3 mb-4">
                <h3 className="display-6 fw-bold text-primary mb-0">{stat.number}</h3>
                <p className="text-muted fw-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container text-center">
          <h2 className="display-5 fw-bold mb-3">Ready to Scale Your Email Marketing?</h2>
          <p className="lead mb-4">Join thousands of businesses already growing with AutoMailer</p>
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-warning btn-lg px-5 py-3 fw-semibold">
              Get Started Free
            </button>
            <button className="btn btn-outline-light btn-lg px-5 py-3">
              View Pricing
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="d-flex align-items-center mb-3">
                <Mail className="me-2 text-primary" size={28} />
                <span className="fw-bold fs-5">AutoMailer</span>
              </div>
              <p className="text-muted">
                The most powerful bulk email platform for businesses of all sizes. 
                Send better emails, get better results.
              </p>
            </div>
            <div className="col-lg-2 col-md-3 mb-4">
              <h6 className="fw-bold mb-3">Product</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-muted text-decoration-none">Features</a></li>
                <li><a href="#" className="text-muted text-decoration-none">Pricing</a></li>
                <li><a href="#" className="text-muted text-decoration-none">Templates</a></li>
                <li><a href="#" className="text-muted text-decoration-none">API</a></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-3 mb-4">
              <h6 className="fw-bold mb-3">Company</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-muted text-decoration-none">About</a></li>
                <li><a href="#" className="text-muted text-decoration-none">Contact</a></li>
                <li><a href="#" className="text-muted text-decoration-none">Careers</a></li>
                <li><a href="#" className="text-muted text-decoration-none">Blog</a></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-3 mb-4">
              <h6 className="fw-bold mb-3">Support</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-muted text-decoration-none">Help Center</a></li>
                <li><a href="#" className="text-muted text-decoration-none">Documentation</a></li>
                <li><a href="#" className="text-muted text-decoration-none">Status</a></li>
                <li><a href="#" className="text-muted text-decoration-none">Security</a></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-3 mb-4">
              <h6 className="fw-bold mb-3">Legal</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-muted text-decoration-none">Privacy</a></li>
                <li><a href="#" className="text-muted text-decoration-none">Terms</a></li>
                <li><a href="#" className="text-muted text-decoration-none">GDPR</a></li>
                <li><a href="#" className="text-muted text-decoration-none">DPA</a></li>
              </ul>
            </div>
          </div>
          <hr className="my-4 border-secondary" />
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="text-muted mb-0">&copy; 2025 AutoMailer. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="text-muted mb-0">Made with ❤️ for email marketers</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Bootstrap CSS - Added via CDN */}
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      
      {/* Custom Styles */}
      <style jsx>{`
        .hover-shadow:hover {
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
        .transition-all {
          transition: all 0.3s ease;
        }
        .min-vh-75 {
          min-height: 75vh;
        }
        .backdrop-blur {
          backdrop-filter: blur(10px);
        }
        .bg-gradient-to-r {
          background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
        }
        .text-accent {
          color: #64748b !important;
        }
        .btn-accent {
          background-color: #475569;
          border-color: #475569;
          color: white;
        }
        .btn-accent:hover {
          background-color: #334155;
          border-color: #334155;
          color: white;
        }
      `}</style>

      {/* Bootstrap JS - Added via CDN */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
    </div>
  );
};

export default Home;