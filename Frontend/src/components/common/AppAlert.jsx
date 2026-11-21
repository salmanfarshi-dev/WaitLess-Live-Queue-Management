import { Alert, AlertTitle } from "@mui/material";

function AppAlert({
  severity = "info",
  title,
  children,
  variant = "standard",
  onClose,
  icon,
  className = "",
}) {
  return (
    <Alert
      severity={severity}
      variant={variant}
      onClose={onClose}
      icon={icon}
      className={className}
      sx={{
        width: "100%",
        minWidth: 0,
        alignItems: "flex-start",
        borderRadius: "var(--wl-radius-md)",
        fontFamily: "var(--wl-font-english)",
        fontSize: "var(--wl-text-sm)",
        "& .MuiAlert-message": {
          minWidth: 0,
          overflowWrap: "anywhere",
        },
        "& .MuiAlertTitle-root": {
          fontFamily: "var(--wl-font-english)",
          fontSize: "var(--wl-text-sm)",
          fontWeight: "var(--wl-weight-bold)",
          marginBottom: "4px",
        },
      }}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </Alert>
  );
}

export default AppAlert;
