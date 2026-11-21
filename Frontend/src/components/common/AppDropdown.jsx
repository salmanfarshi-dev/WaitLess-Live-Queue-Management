import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";

function AppDropdown({
  trigger,
  items = [],
  onSelect,
  anchorOrigin = {
    vertical: "bottom",
    horizontal: "right",
  },
  transformOrigin = {
    vertical: "top",
    horizontal: "right",
  },
  disabled = false,
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

  const handleSelect = (item) => {
    if (item.disabled || item.divider) return;

    onSelect?.(item.value, item);
    item.onClick?.();
    handleClose();
  };

  return (
    <>
      <span
        onClick={handleOpen}
        className={disabled ? "pointer-events-none opacity-50" : "inline-flex"}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
      </span>

      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        slotProps={{
          paper: {
            sx: {
              minWidth: 180,
              maxWidth: 280,
              mt: 1,
              border: "1px solid var(--wl-border)",
              borderRadius: "var(--wl-radius-md)",
              backgroundColor: "var(--wl-surface)",
              boxShadow: "var(--wl-shadow-lg)",
            },
          },
        }}
      >
        {items.map((item, index) => {
          if (item.divider) {
            return (
              <div
                key={`divider-${index}`}
                className="my-1 border-t border-border"
              />
            );
          }

          return (
            <MenuItem
              key={item.value ?? index}
              disabled={item.disabled}
              onClick={() => handleSelect(item)}
              sx={{
                minHeight: 42,
                px: 2,
                py: 1,
                fontFamily: "var(--wl-font-english)",
                fontSize: "var(--wl-text-sm)",
                color: item.danger
                  ? "var(--wl-status-cancelled)"
                  : "var(--wl-text)",
                "&:hover": {
                  backgroundColor: item.danger
                    ? "var(--wl-status-cancelled-bg)"
                    : "var(--wl-primary-light)",
                },
              }}
            >
              {item.icon && (
                <ListItemIcon
                  sx={{
                    minWidth: 34,
                    color: item.danger
                      ? "var(--wl-status-cancelled)"
                      : "var(--wl-muted)",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
              )}

              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: "var(--wl-text-sm)",
                  fontWeight: "var(--wl-weight-medium)",
                }}
              />
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}

export default AppDropdown;
