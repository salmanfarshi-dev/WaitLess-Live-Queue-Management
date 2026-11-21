import { useEffect } from "react";
import { Snackbar, Alert, IconButton } from "@mui/material";
import {
  FiCheckCircle,
  FiAlertCircle,
  FiAlertTriangle,
  FiInfo,
  FiX,
} from "react-icons/fi";

const toastConfig = {
  success: {
    icon: <FiCheckCircle />,
    color: "var(--wl-status-completed)",
    background: "var(--wl-secondary-light)",
  },
  error: {
    icon: <FiAlertCircle />,
    color: "var(--wl-status-cancelled)",
    background: "var(--wl-status-cancelled-bg)",
  },
  warning: {
    icon: <FiAlertTriangle />,
    color: "var(--wl-status-called)",
    background: "var(--wl-primary-light)",
  },
  info: {
    icon: <FiInfo />,
    color: "var(--wl-primary)",
    background: "var(--wl-primary-light)",
  },
};

function AppToast({
  open = false,
  onClose,
  message = "",
  severity = "success",
  autoHideDuration = 4000,
  position = "bottom",
}) {
  const config = toastConfig[severity] || toastConfig.info;

  useEffect(() => {
    if (!open || autoHideDuration <= 0) return;

    const timeoutId = setTimeout(() => {
      onClose?.();
    }, autoHideDuration);

    return () => clearTimeout(timeoutId);
  }, [open, autoHideDuration, onClose]);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        vertical: position,
        horizontal: "right",
      }}
      sx={{
        width: {
          xs: "calc(100% - 32px)",
          sm: "auto",
        },
        maxWidth: 420,
        zIndex: "var(--wl-z-toast)",
      }}
    >
      <Alert
        severity={severity}
        icon={config.icon}
        action={
          <IconButton
            aria-label="Close notification"
            size="small"
            onClick={onClose}
            sx={{
              color: config.color,
            }}
          >
            <FiX size={18} />
          </IconButton>
        }
        sx={{
          width: "100%",
          alignItems: "center",
          borderRadius: "var(--wl-radius-md)",
          backgroundColor: config.background,
          color: "var(--wl-text)",
          border: "1px solid var(--wl-border)",
          boxShadow: "var(--wl-shadow-lg)",
          fontFamily: "var(--wl-font-english)",
          "& .MuiAlert-icon": {
            color: config.color,
          },
          "& .MuiAlert-message": {
            fontSize: "var(--wl-text-sm)",
            fontWeight: "var(--wl-weight-medium)",
            overflowWrap: "anywhere",
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default AppToast;
