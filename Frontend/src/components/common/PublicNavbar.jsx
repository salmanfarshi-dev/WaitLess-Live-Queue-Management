import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { FiArrowUpRight, FiMenu, FiX, FiChevronRight } from "react-icons/fi";

import AppLogo from "./AppLogo";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Hospitals", to: "/hospitals" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

function PublicNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const goToRegister = () => {
    closeMenu();
    navigate("/register");
  };

  return (
    <header className="wl-public-header">
      <div className="wl-announcement">
        <span>YOUR TIME MATTERS</span>
        <span className="mx-2">·</span>
        Smarter queues. Better healthcare experiences.
      </div>

      <div className={`wl-navbar ${scrolled ? "is-scrolled" : ""}`}>
        <div className="wl-navbar-inner">
          {/* Brand */}
          <Link to="/" className="wl-brand" aria-label="WaitLess Home">
            <AppLogo size="lg" />
            <span className="wl-brand-copy">
              <span className="wl-brand-tagline">Less Waiting. More Care.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="wl-nav-links" aria-label="Main navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `wl-nav-link ${isActive ? "active" : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="wl-nav-actions wl-navbar-desktop-actions">
            <Link to="/login" className="wl-signin">
              Sign In
            </Link>

            <button type="button" onClick={goToRegister} className="wl-cta">
              Get Started
              <FiArrowUpRight size={16} />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            className="wl-mobile-toggle"
            onClick={() => setMenuOpen((previous) => !previous)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="wl-mobile-panel"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <nav className="wl-mobile-links">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === "/"}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `wl-mobile-link ${isActive ? "active" : ""}`
                      }
                    >
                      {link.label}
                      <FiChevronRight size={17} />
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <div className="wl-mobile-actions">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex min-h-12 items-center justify-center rounded-full border border-border text-sm font-bold text-heading"
                >
                  Sign In
                </Link>

                <button type="button" onClick={goToRegister} className="wl-cta">
                  Get Started
                  <FiArrowUpRight size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export default PublicNavbar;
