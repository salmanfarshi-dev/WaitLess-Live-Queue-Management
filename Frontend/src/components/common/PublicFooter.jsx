
import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";
import AppLogo from "./AppLogo";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Hospitals", to: "/hospitals" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const supportLinks = [
  { label: "Help Center", to: "/help" },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms & Conditions", to: "/terms" },
];

const socialLinks = [
  { label: "Facebook", icon: FiFacebook, href: "https://facebook.com" },
  { label: "Instagram", icon: FiInstagram, href: "https://instagram.com" },
  { label: "LinkedIn", icon: FiLinkedin, href: "https://linkedin.com" },
  { label: "YouTube", icon: FiYoutube, href: "https://youtube.com" },
];

function PublicFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="wl-container py-12 sm:py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="min-w-0">
            <AppLogo />

            <p className="mt-4 max-w-sm text-sm leading-7 text-muted">
              WaitLess makes healthcare queue management simpler.
              Spend less time waiting and more time where it matters.
            </p>

            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-heading">
              Quick Links
            </h3>

            <ul className="mt-5 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-heading">
              Support
            </h3>

            <ul className="mt-5 flex flex-col gap-3">
              {supportLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-heading">
              Contact Us
            </h3>

            <div className="mt-5 flex flex-col gap-4">
              <div className="flex items-start gap-3 text-sm text-muted">
                <FiMail className="mt-1 shrink-0 text-primary" />
                <span>support@waitless.com</span>
              </div>

              <div className="flex items-start gap-3 text-sm text-muted">
                <FiPhone className="mt-1 shrink-0 text-primary" />
                <span>Contact information coming soon</span>
              </div>

              <div className="flex items-start gap-3 text-sm text-muted">
                <FiMapPin className="mt-1 shrink-0 text-primary" />
                <span>Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} WaitLess. All rights reserved.
          </p>

          <p className="text-xs font-semibold text-primary">
            Your Time Matters.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;
