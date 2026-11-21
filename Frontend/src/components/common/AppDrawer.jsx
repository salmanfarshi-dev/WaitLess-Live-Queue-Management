import { Drawer, Box, IconButton, Typography } from "@mui/material";
import { FiX } from "react-icons/fi";

function AppDrawer({
  open = false,
  onClose,
  children,
  title,
  anchor = "left",
  width = 300,
  showCloseButton = true,
  className = "",
}) {
  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      className={className}
      slotProps={{
        paper: {
          sx: {
            width: {
              xs: "min(85vw, 320px)",
              sm: width,
            },
            maxWidth: "100%",
            backgroundColor: "var(--wl-surface)",
            borderColor: "var(--wl-border)",
            boxShadow: "var(--wl-shadow-xl)",
          },
        },
      }}
    >
      <Box className="flex h-full min-h-0 flex-col">
        {(title || showCloseButton) && (
          <Box className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 py-4">
            {title && (
              <Typography
                sx={{
                  minWidth: 0,
                  fontFamily: "var(--wl-font-english)",
                  fontSize: "var(--wl-text-lg)",
                  fontWeight: "var(--wl-weight-bold)",
                  color: "var(--wl-heading)",
                }}
              >
                {title}
              </Typography>
            )}

            {showCloseButton && (
              <IconButton
                onClick={onClose}
                aria-label="Close drawer"
                size="small"
                sx={{
                  marginLeft: "auto",
                  color: "var(--wl-muted)",
                }}
              >
                <FiX size={20} />
              </IconButton>
            )}
          </Box>
        )}

        <Box className="min-h-0 flex-1 overflow-y-auto">{children}</Box>
      </Box>
    </Drawer>
  );
}

export default AppDrawer;
