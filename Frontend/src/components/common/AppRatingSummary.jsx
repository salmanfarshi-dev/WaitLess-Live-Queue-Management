import { Box, Typography, LinearProgress } from "@mui/material";
import { FiStar } from "react-icons/fi";

function AppRatingSummary({
  average = 0,
  totalReviews = 0,
  breakdown = [],
  className = "",
}) {
  return (
    <Box className={`w-full min-w-0 ${className}`}>
      <Box className="flex flex-wrap items-center gap-4">
        <Box>
          <Box className="flex items-center gap-2">
            <Typography
              sx={{
                fontFamily: "var(--wl-font-english)",
                fontSize: "var(--wl-text-3xl)",
                fontWeight: "var(--wl-weight-bold)",
                color: "var(--wl-heading)",
              }}
            >
              {Number(average).toFixed(1)}
            </Typography>

            <FiStar size={22} style={{ color: "var(--wl-status-called)" }} />
          </Box>

          <Typography
            sx={{
              fontSize: "var(--wl-text-xs)",
              color: "var(--wl-muted)",
            }}
          >
            Average Rating
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{
              fontFamily: "var(--wl-font-english)",
              fontSize: "var(--wl-text-xl)",
              fontWeight: "var(--wl-weight-bold)",
              color: "var(--wl-heading)",
            }}
          >
            {totalReviews.toLocaleString()}
          </Typography>

          <Typography
            sx={{
              fontSize: "var(--wl-text-xs)",
              color: "var(--wl-muted)",
            }}
          >
            Total Reviews
          </Typography>
        </Box>
      </Box>

      {breakdown.length > 0 && (
        <Box className="mt-5 flex flex-col gap-3">
          {breakdown.map((item) => (
            <Box key={item.rating} className="flex items-center gap-3">
              <Typography
                sx={{
                  minWidth: 35,
                  fontSize: "var(--wl-text-xs)",
                  fontWeight: "var(--wl-weight-semibold)",
                  color: "var(--wl-text)",
                }}
              >
                {item.rating} <FiStar className="inline" size={12} />
              </Typography>

              <LinearProgress
                variant="determinate"
                value={Math.min(100, Math.max(0, item.percentage || 0))}
                sx={{
                  flex: 1,
                  height: 8,
                  borderRadius: "var(--wl-radius-pill)",
                  backgroundColor: "var(--wl-border)",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "var(--wl-status-called)",
                    borderRadius: "var(--wl-radius-pill)",
                  },
                }}
              />

              <Typography
                sx={{
                  minWidth: 35,
                  textAlign: "right",
                  fontSize: "var(--wl-text-xs)",
                  color: "var(--wl-muted)",
                }}
              >
                {item.count}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default AppRatingSummary;
