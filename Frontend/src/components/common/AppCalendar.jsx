import Calendar from "react-calendar";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

function AppCalendar({
  value,
  onChange,
  minDate,
  maxDate,
  disabled = false,
  tileContent,
  className = "",
}) {
  const [internalDate, setInternalDate] = useState(new Date());

  const selectedDate = value ?? internalDate;

  const handleDateChange = (date) => {
    if (value === undefined) {
      setInternalDate(date);
    }

    onChange?.(date);
  };

  return (
    <Box
      className={`w-full min-w-0 rounded-xl border border-border bg-surface p-3 sm:p-4 ${className}`}
      sx={{
        "& .react-calendar": {
          width: "100%",
          border: "none",
          background: "transparent",
          fontFamily: "var(--wl-font-english)",
        },
        "& .react-calendar__navigation": {
          display: "flex",
          gap: 1,
          marginBottom: 2,
        },
        "& .react-calendar__navigation button": {
          minWidth: 36,
          borderRadius: "var(--wl-radius-md)",
          color: "var(--wl-heading)",
          fontWeight: "var(--wl-weight-semibold)",
          "&:enabled:hover": {
            backgroundColor: "var(--wl-primary-light)",
          },
        },
        "& .react-calendar__month-view__weekdays": {
          fontSize: "var(--wl-text-xs)",
          fontWeight: "var(--wl-weight-semibold)",
          color: "var(--wl-muted)",
          textAlign: "center",
        },
        "& .react-calendar__tile": {
          minHeight: 42,
          padding: "8px 4px",
          borderRadius: "var(--wl-radius-md)",
          color: "var(--wl-text)",
          fontSize: "var(--wl-text-sm)",
          "&:enabled:hover": {
            backgroundColor: "var(--wl-primary-light)",
          },
        },
        "& .react-calendar__tile--now": {
          backgroundColor: "var(--wl-secondary-light)",
          color: "var(--wl-secondary-dark)",
        },
        "& .react-calendar__tile--active": {
          backgroundColor: "var(--wl-primary) !important",
          color: "var(--wl-surface) !important",
        },
        "& .react-calendar__tile:disabled": {
          backgroundColor: "transparent",
          color: "var(--wl-muted)",
          opacity: 0.4,
        },
      }}
    >
      <Calendar
        value={selectedDate}
        onChange={handleDateChange}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        tileContent={tileContent}
      />
    </Box>
  );
}

export default AppCalendar;
