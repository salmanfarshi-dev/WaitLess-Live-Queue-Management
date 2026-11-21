import { Breadcrumbs, Link as MuiLink, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

function AppBreadcrumbs({ items = [], className = "" }) {
  if (!items.length) return null;

  return (
    <div className={`min-w-0 ${className}`}>
      <Breadcrumbs
        separator={<FiChevronRight size={15} />}
        aria-label="breadcrumb"
        sx={{
          "& .MuiBreadcrumbs-ol": {
            flexWrap: "wrap",
          },
          "& .MuiBreadcrumbs-separator": {
            mx: 0.5,
            color: "var(--wl-muted)",
          },
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          if (isLast || !item.to) {
            return (
              <Typography
                key={`${item.label}-${index}`}
                component="span"
                sx={{
                  fontFamily: "var(--wl-font-english)",
                  fontSize: "var(--wl-text-sm)",
                  fontWeight: "var(--wl-weight-semibold)",
                  color: "var(--wl-heading)",
                }}
              >
                {item.label}
              </Typography>
            );
          }

          return (
            <MuiLink
              key={`${item.label}-${index}`}
              component={RouterLink}
              to={item.to}
              underline="hover"
              sx={{
                fontFamily: "var(--wl-font-english)",
                fontSize: "var(--wl-text-sm)",
                fontWeight: "var(--wl-weight-medium)",
                color: "var(--wl-muted)",
                "&:hover": {
                  color: "var(--wl-primary)",
                },
              }}
            >
              {item.label}
            </MuiLink>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}

export default AppBreadcrumbs;
