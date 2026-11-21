import { TextField, InputAdornment, IconButton } from "@mui/material";
import { FiSearch, FiX } from "react-icons/fi";

function AppSearchInput({
  value = "",
  onChange,
  placeholder = "Search...",
  size = "medium",
  fullWidth = false,
  onClear,
  className = "",
}) {
  const handleClear = () => {
    onChange?.("");
    onClear?.();
  };

  return (
    <TextField
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
      placeholder={placeholder}
      size={size}
      fullWidth={fullWidth}
      className={className}
      variant="outlined"
      inputProps={{
        "aria-label": placeholder,
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <FiSearch size={19} style={{ color: "var(--wl-muted)" }} />
          </InputAdornment>
        ),
        endAdornment: value ? (
          <InputAdornment position="end">
            <IconButton
              size="small"
              onClick={handleClear}
              aria-label="Clear search"
              edge="end"
            >
              <FiX size={17} />
            </IconButton>
          </InputAdornment>
        ) : null,
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
        "& .MuiInputBase-input::placeholder": {
          color: "var(--wl-muted)",
          opacity: 1,
        },
      }}
    />
  );
}

export default AppSearchInput;
