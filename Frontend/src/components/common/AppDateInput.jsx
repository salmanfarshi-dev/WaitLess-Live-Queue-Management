import { TextField } from "@mui/material";

function AppDateInput({
  label = "Select Date",
  name,
  value = "",
  onChange,
  min,
  max,
  size = "medium",
  fullWidth = false,
  disabled = false,
  required = false,
  error = false,
  helperText = "",
  className = "",
}) {
  return (
    <TextField
      type="date"
      label={label}
      name={name}
      value={value}
      onChange={(event) => onChange?.(event.target.value, event)}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      required={required}
      error={error}
      helperText={helperText}
      className={className}
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        min,
        max,
      }}
      sx={{
        minWidth: 0,
        "& .MuiOutlinedInput-root": {
          borderRadius: "var(--wl-radius-md)",
          backgroundColor: "var(--wl-surface)",
          fontFamily: "var(--wl-font-english)",
          fontSize: "var(--wl-text-sm)",
          "& fieldset": {
            borderColor: "var(--wl-border)",
          },
          "&:hover fieldset": {
            borderColor: "var(--wl-primary)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "var(--wl-primary)",
            borderWidth: 1,
          },
        },
        "& .MuiInputLabel-root": {
          fontFamily: "var(--wl-font-english)",
          color: "var(--wl-muted)",
        },
        "& .MuiFormHelperText-root": {
          marginLeft: 0,
          fontSize: "var(--wl-text-xs)",
        },
      }}
    />
  );
}

export default AppDateInput;
