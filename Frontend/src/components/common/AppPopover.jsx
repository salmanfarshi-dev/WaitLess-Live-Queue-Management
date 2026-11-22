import { Popover, Box } from "@mui/material";
import { useState } from "react";

function AppPopover({
  trigger,
  children,
  placement = "bottom",
  width = 280,
  disabled = false,
  className = "",
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const isOpen = Boolean(anchorEl);

  const handleOpen = (event) => {
    if (disabled) return;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const placementMap = {
    top: {
      vertical: "top",
      horizontal: "center",
    },
    bottom: {
      vertical: "bottom",
      horizontal: "center",
    },
    left: {
      vertical: "center",
      horizontal: "left",
    },
    right: {
      vertical: "center",
      horizontal: "right",
    },
  };

  const anchorOrigin = placementMap[placement] || placementMap.bottom;

  const transformOrigin = {
    vertical:
      placement === "top"
        ? "bottom"
        : placement === "bottom"
          ? "top"
          : "center",
    horizontal:
      placement === "left"
        ? "right"
        : placement === "right"
          ? "left"
          : "center",
  };

  return (
    <>
      <span
        onClick={handleOpen}
        className={`inline-flex ${disabled ? "pointer-events-none opacity-50" : ""}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
      </span>

      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        slotProps={{
          paper: {
            sx: {
              width,
              maxWidth: "calc(100vw - 32px)",
              mt: placement === "bottom" ? 1 : 0,
              border: "1px solid var(--wl-border)",
              borderRadius: "var(--wl-radius-md)",
              backgroundColor: "var(--wl-surface)",
              boxShadow: "var(--wl-shadow-lg)",
              overflow: "hidden",
            },
          },
        }}
      >
        <Box className={`p-4 ${className}`}>{children}</Box>
      </Popover>
    </>
  );
}

export default AppPopover;
