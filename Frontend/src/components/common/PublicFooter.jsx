import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowUpRight,
  FiHeart,
  FiArrowRight,
} from "react-icons/fi";

import AppLogo from "./AppLogo";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Find Hospitals", to: "/hospitals" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "About WaitLess", to: "/about" },
  { label: "Contact Us", to: "/contact" },
];

const supportLinks = [
  { label: "Help Center", to: "/help" },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms & Conditions", to: "/terms" },
];

const socialLinks = [
  {
    label: "Facebook",
    icon: FiFacebook,
    href: "https://facebook.com",
  },
  {
    label: "Instagram",
    icon: FiInstagram,
    href: "https://instagram.com",
  },
  {
    label: "LinkedIn",
    icon: FiLinkedin,
    href: "https://linkedin.com",
  },
  {
    label: "YouTube",
    icon: FiYoutube,
    href: "https://youtube.com",
  },
];

function PublicFooter() {
  return (
    <footer className="wl-footer">
      {/* CTA Section */}
      <div className="wl-container wl-footer-cta-wrap">
        <div className="wl-footer-cta">
          <div className="wl-footer-cta-copy">
            <span className="wl-footer-eyebrow">
              <FiHeart size={14} />A Better Way to Wait
            </span>

            <h2 className="wl-footer-cta-title">
              Healthcare should be about care,
              <br className="hidden sm:block" />
              not waiting.
            </h2>

            <p className="wl-footer-cta-description">
              Discover a smarter queue experience with WaitLess. Find healthcare
              providers and manage your waiting time with greater confidence.
            </p>
          </div>

          <Link to="/hospitals" className="wl-footer-cta-button">
            Explore Hospitals
            <FiArrowUpRight size={17} />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="wl-container wl-footer-main">
        <div className="wl-footer-grid">
          {/* Brand */}
          <div className="wl-footer-brand">
            <AppLogo size="lg" />

            <p className="wl-footer-description">
              Less waiting. More care. WaitLess helps hospitals, clinics, and
              patients experience a smarter and more organized healthcare queue.
            </p>

            <div className="wl-footer-socials">
              {socialLinks.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="wl-footer-social"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="wl-footer-column-title">Explore</h3>

            <nav className="wl-footer-links" aria-label="Explore links">
              {quickLinks.map((link) => (
                <Link key={link.to} to={link.to} className="wl-footer-link">
                  <FiArrowRight size={13} />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Support */}
          <div>
            <h3 className="wl-footer-column-title">Support</h3>

            <nav className="wl-footer-links" aria-label="Support links">
              {supportLinks.map((link) => (
                <Link key={link.to} to={link.to} className="wl-footer-link">
                  <FiArrowRight size={13} />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="wl-footer-column-title">Get in Touch</h3>

            <div className="wl-footer-contact-list">
              <div className="wl-footer-contact">
                <span className="wl-footer-contact-icon">
                  <FiMail size={16} />
                </span>
                <span>support@waitless.com</span>
              </div>

              <div className="wl-footer-contact">
                <span className="wl-footer-contact-icon">
                  <FiPhone size={16} />
                </span>
                <span>Contact information coming soon</span>
              </div>

              <div className="wl-footer-contact">
                <span className="wl-footer-contact-icon">
                  <FiMapPin size={16} />
                </span>
                <span>Bangladesh</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="wl-footer-bottom">
        <div className="wl-container wl-footer-bottom-inner">
          <p className="wl-footer-copyright">
            © {new Date().getFullYear()} WaitLess. All rights reserved.
          </p>

          <p className="wl-footer-bottom-tagline">
            Made for better healthcare experiences
            <FiHeart size={13} />
          </p>
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;
