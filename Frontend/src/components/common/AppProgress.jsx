import { LinearProgress, Box, Typography } from "@mui/material";

function AppProgress({
  value = 0,
  variant = "determinate",
  color = "primary",
  height = 8,
  showLabel = false,
  label,
  className = "",
}) {
  const progressValue = Math.min(100, Math.max(0, Number(value) || 0));

  return (
    <Box className={`w-full min-w-0 ${className}`}>
      {(label || showLabel) && (
        <Box className="mb-2 flex items-center justify-between gap-3">
          {label && (
            <Typography
              sx={{
                fontFamily: "var(--wl-font-english)",
                fontSize: "var(--wl-text-sm)",
                fontWeight: "var(--wl-weight-medium)",
                color: "var(--wl-text)",
              }}
            >
              {label}
            </Typography>
          )}

          {showLabel && (
            <Typography
              sx={{
                fontFamily: "var(--wl-font-english)",
                fontSize: "var(--wl-text-xs)",
                fontWeight: "var(--wl-weight-semibold)",
                color: "var(--wl-muted)",
              }}
            >
              {progressValue}%
            </Typography>
          )}
        </Box>
      )}

      <LinearProgress
        variant={variant}
        value={progressValue}
        color={color}
        sx={{
          height,
          borderRadius: "var(--wl-radius-pill)",
          backgroundColor: "var(--wl-primary-light)",
          "& .MuiLinearProgress-bar": {
            borderRadius: "var(--wl-radius-pill)",
            backgroundColor: "var(--wl-primary)",
          },
        }}
      />
    </Box>
  );
}

export default AppProgress;
