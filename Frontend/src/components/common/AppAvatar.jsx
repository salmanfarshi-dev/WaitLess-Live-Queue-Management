import { Avatar } from "@mui/material";

function AppAvatar({ src, name = "User", size = "md", className = "" }) {
  const sizes = {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
  };

  const dimension = sizes[size] || sizes.md;

  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  return (
    <Avatar
      src={src || undefined}
      alt={name}
      className={className}
      sx={{
        width: dimension,
        height: dimension,
        bgcolor: "var(--wl-primary-light)",
        color: "var(--wl-primary)",
        fontFamily: "var(--wl-font-english)",
        fontWeight: "var(--wl-weight-bold)",
        fontSize: dimension * 0.38,
        border: "1px solid var(--wl-border)",
        flexShrink: 0,
      }}
    >
      {initials || "U"}
    </Avatar>
  );
}

export default AppAvatar;
