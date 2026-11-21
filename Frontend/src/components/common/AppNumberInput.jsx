import { TextField } from "@mui/material";

function AppNumberInput({
  label,
  name,
  value = "",
  onChange,
  placeholder = "",
  min,
  max,
  step = 1,
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
      type="number"
      label={label}
      name={name}
      value={value}
      onChange={(event) => onChange?.(event.target.value, event)}
      placeholder={placeholder}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      required={required}
      error={error}
      helperText={helperText}
      className={className}
      variant="outlined"
      slotProps={{
        htmlInput: {
          min,
          max,
          step,
        },
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

export default AppNumberInput;
