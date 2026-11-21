import { Tooltip } from "@mui/material";

function AppTooltip({
  children,
  title,
  placement = "top",
  arrow = true,
  enterDelay = 500,
  leaveDelay = 0,
  disabled = false,
  className = "",
}) {
  if (disabled || !title) {
    return children;
  }

  return (
    <Tooltip
      title={title}
      placement={placement}
      arrow={arrow}
      enterDelay={enterDelay}
      leaveDelay={leaveDelay}
      slotProps={{
        tooltip: {
          sx: {
            maxWidth: 240,
            px: 1.5,
            py: 1,
            borderRadius: "var(--wl-radius-sm)",
            backgroundColor: "var(--wl-navy)",
            color: "var(--wl-surface)",
            fontFamily: "var(--wl-font-english)",
            fontSize: "var(--wl-text-xs)",
            fontWeight: "var(--wl-weight-medium)",
          },
        },
        arrow: {
          sx: {
            color: "var(--wl-navy)",
          },
        },
      }}
    >
      <span className={`inline-flex ${className}`}>{children}</span>
    </Tooltip>
  );
}

export default AppTooltip;
