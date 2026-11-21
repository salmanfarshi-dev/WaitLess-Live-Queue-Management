
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";

import { FiAlertTriangle } from "react-icons/fi";

function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone. Do you want to continue?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  loading = false,
  danger = false,
}) {
  const handleClose = () => {
    if (!loading) {
      onClose?.();
    }
  };

  const handleConfirm = () => {
    if (!loading) {
      onConfirm?.();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      slotProps={{
        paper: {
          sx: {
            borderRadius: "var(--wl-radius-lg)",
            padding: { xs: 1, sm: 2 },
            margin: { xs: 2, sm: 3 },
            width: "100%",
            backgroundColor: "var(--wl-surface)",
            color: "var(--wl-text)",
            boxShadow: "var(--wl-shadow-xl)",
          },
        },
      }}
    >
      <DialogTitle
        id="confirm-dialog-title"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          fontFamily: "var(--wl-font-english)",
          fontWeight: "var(--wl-weight-bold)",
          fontSize: {
            xs: "var(--wl-text-base)",
            sm: "var(--wl-text-xl)",
          },
          color: "var(--wl-heading)",
        }}
      >
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{
            backgroundColor: danger
              ? "var(--wl-status-cancelled-bg)"
              : "var(--wl-primary-light)",
          }}
        >
          <FiAlertTriangle
            className="h-5 w-5"
            style={{
              color: danger
                ? "var(--wl-status-cancelled)"
                : "var(--wl-primary)",
            }}
          />
        </span>

        {title}
      </DialogTitle>

      <DialogContent>
        <DialogContentText
          id="confirm-dialog-description"
          sx={{
            fontFamily: "var(--wl-font-english)",
            fontSize: "var(--wl-text-sm)",
            lineHeight: 1.7,
            color: "var(--wl-muted)",
          }}
        >
          {description}
        </DialogContentText>
      </DialogContent>

      <DialogActions
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column-reverse",
            sm: "row",
          },
          gap: 1,
          padding: {
            xs: "12px 16px",
            sm: "12px 24px",
          },
          "& > button": {
            width: {
              xs: "100%",
              sm: "auto",
            },
            minHeight: 42,
            margin: "0 !important",
            borderRadius: "var(--wl-radius-md)",
            fontFamily: "var(--wl-font-english)",
            fontWeight: "var(--wl-weight-semibold)",
          },
        }}
      >
        <Button
          variant="outlined"
          color="inherit"
          onClick={handleClose}
          disabled={loading}
          sx={{
            borderColor: "var(--wl-border)",
            color: "var(--wl-text)",
            "&:hover": {
              borderColor: "var(--wl-muted)",
              backgroundColor: "var(--wl-background)",
            },
          }}
        >
          {cancelLabel}
        </Button>

        <Button
          variant="contained"
          color={danger ? "error" : "primary"}
          onClick={handleConfirm}
          disabled={loading}
          startIcon={
            loading ? (
              <CircularProgress size={16} color="inherit" />
            ) : null
          }
          sx={{
            boxShadow: "none",
            "&:hover": {
              boxShadow: "var(--wl-shadow-sm)",
            },
          }}
        >
          {loading ? "Please wait..." : confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
