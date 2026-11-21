import { TextField, MenuItem } from "@mui/material";

function AppSelectInput({
  value = "",
  onChange,
  options = [],
  label,
  placeholder = "Select an option",
  size = "medium",
  fullWidth = false,
  disabled = false,
  className = "",
}) {
  return (
    <TextField
      select
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
      label={label}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      className={className}
      variant="outlined"
      SelectProps={{
        displayEmpty: true,
        renderValue: (selected) => {
          if (selected === "") {
            return (
              <span style={{ color: "var(--wl-muted)" }}>{placeholder}</span>
            );
          }

          return (
            options.find((option) => option.value === selected)?.label ??
            selected
          );
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
        "& .MuiSelect-select": {
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      }}
    >
      <MenuItem value="" disabled>
        {placeholder}
      </MenuItem>

      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default AppSelectInput;
