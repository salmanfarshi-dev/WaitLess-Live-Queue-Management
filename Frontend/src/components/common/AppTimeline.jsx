import { Box, Typography } from "@mui/material";
import { FiCircle, FiCheckCircle } from "react-icons/fi";

function AppTimeline({ items = [], className = "", showConnector = true }) {
  return (
    <Box className={`flex w-full flex-col ${className}`}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const completed = item.completed || false;

        return (
          <Box key={item.id || index} className="flex min-w-0 gap-3">
            <Box className="flex shrink-0 flex-col items-center">
              <Box
                className="flex h-8 w-8 items-center justify-center rounded-full"
                sx={{
                  backgroundColor: completed
                    ? "var(--wl-status-completed-bg)"
                    : "var(--wl-primary-light)",
                  color: completed
                    ? "var(--wl-status-completed)"
                    : "var(--wl-primary)",
                }}
              >
                {item.icon ||
                  (completed ? (
                    <FiCheckCircle size={17} />
                  ) : (
                    <FiCircle size={17} />
                  ))}
              </Box>

              {!isLast && showConnector && (
                <Box
                  sx={{
                    width: "2px",
                    minHeight: 40,
                    flex: 1,
                    backgroundColor: "var(--wl-border)",
                  }}
                />
              )}
            </Box>

            <Box className="min-w-0 flex-1 pb-6">
              <Typography
                sx={{
                  fontFamily: "var(--wl-font-english)",
                  fontSize: "var(--wl-text-sm)",
                  fontWeight: "var(--wl-weight-semibold)",
                  color: "var(--wl-heading)",
                }}
              >
                {item.title}
              </Typography>

              {item.description && (
                <Typography
                  sx={{
                    mt: 0.5,
                    fontFamily: "var(--wl-font-english)",
                    fontSize: "var(--wl-text-xs)",
                    lineHeight: 1.6,
                    color: "var(--wl-muted)",
                  }}
                >
                  {item.description}
                </Typography>
              )}

              {item.time && (
                <Typography
                  sx={{
                    mt: 0.5,
                    fontFamily: "var(--wl-font-english)",
                    fontSize: "var(--wl-text-xs)",
                    color: "var(--wl-muted)",
                  }}
                >
                  {item.time}
                </Typography>
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default AppTimeline;
