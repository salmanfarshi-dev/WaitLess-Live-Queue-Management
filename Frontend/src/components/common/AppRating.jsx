import { Rating, Box, Typography } from "@mui/material";

function AppRating({
  value = 0,
  onChange,
  precision = 0.5,
  max = 5,
  readOnly = false,
  size = "medium",
  showValue = false,
  label,
  className = "",
}) {
  return (
    <Box
      className={`inline-flex min-w-0 flex-wrap items-center gap-2 ${className}`}
    >
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

      <Rating
        value={Number(value) || 0}
        onChange={(_, newValue) => onChange?.(newValue)}
        precision={precision}
        max={max}
        readOnly={readOnly}
        size={size}
        sx={{
          color: "var(--wl-status-called)",
          "& .MuiRating-iconEmpty": {
            color: "var(--wl-border)",
          },
        }}
      />

      {showValue && (
        <Typography
          sx={{
            fontFamily: "var(--wl-font-english)",
            fontSize: "var(--wl-text-sm)",
            fontWeight: "var(--wl-weight-semibold)",
            color: "var(--wl-heading)",
          }}
        >
          {(Number(value) || 0).toFixed(1)}
        </Typography>
      )}
    </Box>
  );
}

export default AppRating;
