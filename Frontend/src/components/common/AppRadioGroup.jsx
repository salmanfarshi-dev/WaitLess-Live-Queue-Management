import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormHelperText,
} from "@mui/material";

function AppRadioGroup({
  label,
  name,
  value = "",
  onChange,
  options = [],
  direction = "vertical",
  disabled = false,
  required = false,
  error = false,
  helperText = "",
  className = "",
}) {
  return (
    <FormControl
      component="fieldset"
      error={error}
      disabled={disabled}
      required={required}
      className={className}
      sx={{ minWidth: 0, width: "100%" }}
    >
      {label && (
        <FormLabel
          component="legend"
          sx={{
            mb: 1,
            color: "var(--wl-heading)",
            fontFamily: "var(--wl-font-english)",
            fontSize: "var(--wl-text-sm)",
            fontWeight: "var(--wl-weight-semibold)",
            "&.Mui-focused": {
              color: "var(--wl-heading)",
            },
          }}
        >
          {label}
        </FormLabel>
      )}

      <RadioGroup
        name={name}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        row={direction === "horizontal"}
        sx={{
          gap: direction === "horizontal" ? 1 : 0,
        }}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            control={
              <Radio
                size="small"
                sx={{
                  color: "var(--wl-muted)",
                  "&.Mui-checked": {
                    color: "var(--wl-primary)",
                  },
                }}
              />
            }
            label={option.label}
            sx={{
              mr: direction === "horizontal" ? 2 : 0,
              "& .MuiFormControlLabel-label": {
                fontFamily: "var(--wl-font-english)",
                fontSize: "var(--wl-text-sm)",
                color: "var(--wl-text)",
              },
            }}
          />
        ))}
      </RadioGroup>

      {helperText && (
        <FormHelperText sx={{ ml: 0 }}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}

export default AppRadioGroup;
