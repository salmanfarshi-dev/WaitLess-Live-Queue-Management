import { Box, Typography, IconButton } from "@mui/material";
import { FiBell, FiCheck, FiX, FiInfo, FiAlertCircle } from "react-icons/fi";

const notificationIcons = {
  success: FiCheck,
  info: FiInfo,
  warning: FiAlertCircle,
  error: FiAlertCircle,
  default: FiBell,
};

const notificationColors = {
  success: {
    color: "var(--wl-status-completed)",
    background: "var(--wl-status-completed-bg)",
  },
  info: {
    color: "var(--wl-primary)",
    background: "var(--wl-primary-light)",
  },
  warning: {
    color: "var(--wl-status-called)",
    background: "var(--wl-status-called-bg)",
  },
  error: {
    color: "var(--wl-status-cancelled)",
    background: "var(--wl-status-cancelled-bg)",
  },
  default: {
    color: "var(--wl-muted)",
    background: "var(--wl-background)",
  },
};

function AppNotification({
  title,
  message,
  time,
  type = "default",
  read = false,
  onClick,
  onMarkRead,
  onRemove,
  className = "",
}) {
  const Icon = notificationIcons[type] || notificationIcons.default;
  const colors = notificationColors[type] || notificationColors.default;

  return (
    <Box
      onClick={onClick}
      className={`flex min-w-0 gap-3 border-b border-border p-4 transition-colors ${
        onClick ? "cursor-pointer hover:bg-background" : ""
      } ${className}`}
      sx={{
        backgroundColor: read ? "var(--wl-surface)" : "var(--wl-primary-light)",
      }}
    >
      <Box
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
        sx={{
          backgroundColor: colors.background,
          color: colors.color,
        }}
      >
        <Icon size={19} />
      </Box>

      <Box className="min-w-0 flex-1">
        <Typography
          sx={{
            fontFamily: "var(--wl-font-english)",
            fontSize: "var(--wl-text-sm)",
            fontWeight: "var(--wl-weight-semibold)",
            color: "var(--wl-heading)",
            overflowWrap: "anywhere",
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            fontFamily: "var(--wl-font-english)",
            fontSize: "var(--wl-text-xs)",
            lineHeight: 1.6,
            color: "var(--wl-muted)",
            overflowWrap: "anywhere",
          }}
        >
          {message}
        </Typography>

        {time && (
          <Typography
            sx={{
              mt: 1,
              fontSize: "var(--wl-text-xs)",
              color: "var(--wl-muted)",
            }}
          >
            {time}
          </Typography>
        )}
      </Box>

      <Box className="flex shrink-0 items-start gap-1">
        {!read && onMarkRead && (
          <IconButton
            size="small"
            aria-label="Mark as read"
            onClick={(event) => {
              event.stopPropagation();
              onMarkRead();
            }}
          >
            <FiCheck size={16} />
          </IconButton>
        )}

        {onRemove && (
          <IconButton
            size="small"
            aria-label="Remove notification"
            onClick={(event) => {
              event.stopPropagation();
              onRemove();
            }}
          >
            <FiX size={16} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

export default AppNotification;
