import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { FiChevronDown } from "react-icons/fi";

function AppAccordion({
  title,
  children,
  defaultExpanded = false,
  expanded,
  onChange,
  disabled = false,
  className = "",
}) {
  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      expanded={expanded}
      onChange={onChange}
      disabled={disabled}
      disableGutters
      className={className}
      sx={{
        width: "100%",
        border: "1px solid var(--wl-border)",
        borderRadius: "var(--wl-radius-md)",
        backgroundColor: "var(--wl-surface)",
        boxShadow: "none",
        overflow: "hidden",
        "&::before": {
          display: "none",
        },
        "&:not(:last-child)": {
          marginBottom: 1,
        },
        "&.Mui-expanded": {
          margin: 0,
          marginBottom: 1,
        },
      }}
    >
      <AccordionSummary
        expandIcon={
          <FiChevronDown size={20} style={{ color: "var(--wl-muted)" }} />
        }
        sx={{
          minHeight: 52,
          px: 2,
          "& .MuiAccordionSummary-content": {
            margin: "12px 0",
          },
        }}
      >
        <Typography
          sx={{
            fontFamily: "var(--wl-font-english)",
            fontSize: "var(--wl-text-sm)",
            fontWeight: "var(--wl-weight-semibold)",
            color: "var(--wl-heading)",
          }}
        >
          {title}
        </Typography>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          px: 2,
          pb: 2,
          pt: 0,
          borderTop: "1px solid var(--wl-border)",
          color: "var(--wl-text)",
          fontFamily: "var(--wl-font-english)",
          fontSize: "var(--wl-text-sm)",
        }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
}

export default AppAccordion;
