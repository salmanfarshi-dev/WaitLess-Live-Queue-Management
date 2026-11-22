import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import AppLogo from "./AppLogo";
import AppButton from "./AppButton";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Hospitals", to: "/hospitals" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

function PublicNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface">
      <div className="wl-container flex min-h-16 items-center justify-between gap-4 py-3">
        <AppLogo />

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${
                  isActive ? "text-primary" : "text-muted hover:text-primary"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/login"
            className="text-sm font-semibold text-text transition-colors hover:text-primary"
          >
            Login
          </Link>

          <AppButton onPress={() => window.location.assign("/register")}>
            Get Started
          </AppButton>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((previous) => !previous)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-heading transition-colors hover:bg-background lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-surface px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-primary-light text-primary"
                      : "text-text hover:bg-background"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
            <Link
              to="/login"
              onClick={closeMenu}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-text"
            >
              Login
            </Link>

            <AppButton
              fullWidth
              onPress={() => {
                closeMenu();
                window.location.assign("/register");
              }}
            >
              Get Started
            </AppButton>
          </div>
        </div>
      )}
    </header>
  );
}

export default PublicNavbar;
