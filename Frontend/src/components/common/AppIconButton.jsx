import { IconButton, Tooltip } from "@mui/material";

function AppIconButton({
  icon,
  label,
  onClick,
  color = "default",
  variant = "standard",
  size = "medium",
  disabled = false,
  loading = false,
  className = "",
}) {
  const isDisabled = disabled || loading;

  return (
    <Tooltip title={label || ""} arrow>
      <span className="inline-flex">
        <IconButton
          aria-label={label || "Action"}
          onClick={onClick}
          color={color}
          size={size}
          disabled={isDisabled}
          className={className}
          sx={{
            borderRadius: "var(--wl-radius-md)",
            transition: "var(--wl-transition-fast)",
            ...(variant === "outlined" && {
              border: "1px solid var(--wl-border)",
            }),
            ...(variant === "soft" && {
              backgroundColor: "var(--wl-primary-light)",
              color: "var(--wl-primary)",
              "&:hover": {
                backgroundColor: "var(--wl-primary)",
                color: "var(--wl-surface)",
              },
            }),
          }}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
}

export default AppIconButton;
