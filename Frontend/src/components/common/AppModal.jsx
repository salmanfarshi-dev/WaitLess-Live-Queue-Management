import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { FiX } from "react-icons/fi";

function AppModal({
  open = false,
  onClose,
  title,
  description,
  children,
  actions,
  maxWidth = "sm",
  fullWidth = true,
  showCloseButton = true,
  disableBackdropClose = false,
  className = "",
}) {
  const handleClose = (_, reason) => {
    if (
      disableBackdropClose &&
      (reason === "backdropClick" || reason === "escapeKeyDown")
    ) {
      return;
    }

    onClose?.();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      className={className}
      scroll="paper"
      slotProps={{
        paper: {
          sx: {
            width: "100%",
            borderRadius: "var(--wl-radius-xl)",
            backgroundColor: "var(--wl-surface)",
            boxShadow: "var(--wl-shadow-xl)",
            backgroundImage: "none",
            overflow: "hidden",
          },
        },
      }}
    >
      {(title || showCloseButton) && (
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 2,
            p: 3,
            pb: 2,
          }}
        >
          <div className="min-w-0">
            {title && (
              <h2 className="break-words text-lg font-bold text-heading sm:text-xl">
                {title}
              </h2>
            )}

            {description && (
              <p className="mt-1 text-sm leading-6 text-muted">{description}</p>
            )}
          </div>

          {showCloseButton && (
            <IconButton
              onClick={onClose}
              aria-label="Close modal"
              size="small"
              sx={{
                flexShrink: 0,
                color: "var(--wl-muted)",
              }}
            >
              <FiX size={20} />
            </IconButton>
          )}
        </DialogTitle>
      )}

      <DialogContent
        dividers
        sx={{
          p: 3,
          borderColor: "var(--wl-border)",
          color: "var(--wl-text)",
        }}
      >
        {children}
      </DialogContent>

      {actions && (
        <DialogActions
          sx={{
            p: 3,
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
}

export default AppModal;
