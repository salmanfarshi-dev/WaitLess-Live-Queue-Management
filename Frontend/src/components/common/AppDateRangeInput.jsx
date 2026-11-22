import { Stack } from "@mui/material";
import AppDateInput from "./AppDateInput";

function AppDateRangeInput({
  startDate = "",
  endDate = "",
  onStartDateChange,
  onEndDateChange,
  startLabel = "Start Date",
  endLabel = "End Date",
  fullWidth = false,
  disabled = false,
  className = "",
}) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      className={`w-full min-w-0 ${className}`}
    >
      <AppDateInput
        label={startLabel}
        value={startDate}
        onChange={onStartDateChange}
        max={endDate || undefined}
        fullWidth={fullWidth}
        disabled={disabled}
      />

      <AppDateInput
        label={endLabel}
        value={endDate}
        onChange={onEndDateChange}
        min={startDate || undefined}
        fullWidth={fullWidth}
        disabled={disabled}
      />
    </Stack>
  );
}

export default AppDateRangeInput;
