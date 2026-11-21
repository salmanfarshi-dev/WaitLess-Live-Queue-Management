import { TextField } from "@mui/material";

function AppTextArea({
  label,
  name,
  value = "",
  onChange,
  placeholder = "",
  rows = 4,
  minRows,
  maxRows,
  fullWidth = false,
  disabled = false,
  required = false,
  error = false,
  helperText = "",
  resize = "vertical",
  className = "",
}) {
  return (
    <TextField
      multiline
      label={label}
      name={name}
      value={value}
      onChange={(event) => onChange?.(event.target.value, event)}
      placeholder={placeholder}
      rows={minRows || rows}
      minRows={minRows}
      maxRows={maxRows}
      fullWidth={fullWidth}
      disabled={disabled}
      required={required}
      error={error}
      helperText={helperText}
      className={className}
      variant="outlined"
      sx={{
        minWidth: 0,
        "& .MuiOutlinedInput-root": {
          alignItems: "flex-start",
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
        "& .MuiInputBase-inputMultiline": {
          resize,
          overflow: "auto",
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

export default AppTextArea;
