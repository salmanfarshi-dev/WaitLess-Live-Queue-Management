import { Stack } from "@mui/material";
import AppTimeInput from "./AppTimeInput";

function AppTimeRangeInput({
  startTime = "",
  endTime = "",
  onStartTimeChange,
  onEndTimeChange,
  startLabel = "Start Time",
  endLabel = "End Time",
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
      <AppTimeInput
        label={startLabel}
        value={startTime}
        onChange={onStartTimeChange}
        max={endTime || undefined}
        fullWidth={fullWidth}
        disabled={disabled}
      />

      <AppTimeInput
        label={endLabel}
        value={endTime}
        onChange={onEndTimeChange}
        min={startTime || undefined}
        fullWidth={fullWidth}
        disabled={disabled}
      />
    </Stack>
  );
}

export default AppTimeRangeInput;
