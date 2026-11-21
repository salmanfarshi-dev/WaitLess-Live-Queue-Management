import { Link } from "react-router-dom";

function AppLogo({ size = "md", showText = true, to = "/", className = "" }) {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  return (
    <Link
      to={to}
      className={`inline-flex max-w-full items-center gap-2.5 ${className}`}
      aria-label="WaitLess Home"
    >
      <img
        src="/favicon.png"
        alt="WaitLess"
        className={`${sizes[size] || sizes.md} shrink-0 object-contain`}
      />

      {showText && (
        <span className="truncate text-xl font-extrabold tracking-tight text-heading">
          WaitLess
        </span>
      )}
    </Link>
  );
}

export default AppLogo;
