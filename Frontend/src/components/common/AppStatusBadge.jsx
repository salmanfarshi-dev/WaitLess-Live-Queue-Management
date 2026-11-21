import { Chip } from "@mui/material";

const statusConfig = {
  waiting: {
    label: "Waiting",
    color: "var(--wl-status-waiting)",
    background: "var(--wl-status-waiting-bg)",
  },
  called: {
    label: "Called",
    color: "var(--wl-status-called)",
    background: "var(--wl-status-called-bg)",
  },
  serving: {
    label: "Serving",
    color: "var(--wl-status-serving)",
    background: "var(--wl-status-serving-bg)",
  },
  completed: {
    label: "Completed",
    color: "var(--wl-status-completed)",
    background: "var(--wl-status-completed-bg)",
  },
  skipped: {
    label: "Skipped",
    color: "var(--wl-status-skipped)",
    background: "var(--wl-status-skipped-bg)",
  },
  cancelled: {
    label: "Cancelled",
    color: "var(--wl-status-cancelled)",
    background: "var(--wl-status-cancelled-bg)",
  },
  "no-show": {
    label: "No Show",
    color: "var(--wl-status-no-show)",
    background: "var(--wl-status-no-show-bg)",
  },
  active: {
    label: "Active",
    color: "var(--wl-status-completed)",
    background: "var(--wl-status-completed-bg)",
  },
  inactive: {
    label: "Inactive",
    color: "var(--wl-status-no-show)",
    background: "var(--wl-status-no-show-bg)",
  },
};

function AppStatusBadge({
  status = "waiting",
  label,
  size = "small",
  className = "",
}) {
  const normalizedStatus = String(status).toLowerCase().trim();

  const config = statusConfig[normalizedStatus] || {
    label: status,
    color: "var(--wl-muted)",
    background: "var(--wl-status-default-bg)",
  };

  const chipSize = size === "medium" ? "medium" : "small";

  return (
    <Chip
      label={label || config.label || status}
      size={chipSize}
      className={className}
      sx={{
        maxWidth: "100%",
        height: chipSize === "small" ? 26 : 32,
        borderRadius: "var(--wl-radius-pill)",
        backgroundColor: config.background,
        color: config.color,
        fontFamily: "var(--wl-font-english)",
        fontSize: "var(--wl-text-xs)",
        fontWeight: "var(--wl-weight-semibold)",
        border: "1px solid transparent",
        transition: "var(--wl-transition-fast)",
        "& .MuiChip-label": {
          px: 1.25,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
      }}
    />
  );
}

export default AppStatusBadge;
