import { TextField, InputAdornment, IconButton } from "@mui/material";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";

function AppTextInput({
  label,
  name,
  value = "",
  onChange,
  placeholder = "",
  type = "text",
  size = "medium",
  fullWidth = false,
  disabled = false,
  required = false,
  error = false,
  helperText = "",
  startIcon,
  endIcon,
  multiline = false,
  rows = 4,
  className = "",
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={(event) => onChange?.(event.target.value, event)}
      placeholder={placeholder}
      type={inputType}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      required={required}
      error={error}
      helperText={helperText}
      multiline={multiline}
      rows={multiline ? rows : undefined}
      className={className}
      variant="outlined"
      InputProps={{
        startAdornment: startIcon ? (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ) : undefined,

        endAdornment: isPassword ? (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              size="small"
              onClick={() => setShowPassword((previous) => !previous)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </IconButton>
          </InputAdornment>
        ) : endIcon ? (
          <InputAdornment position="end">{endIcon}</InputAdornment>
        ) : undefined,
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

export default AppTextInput;
