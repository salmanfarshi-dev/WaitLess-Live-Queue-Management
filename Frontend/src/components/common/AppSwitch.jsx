import { Switch, FormControlLabel, FormHelperText } from "@mui/material";

function AppSwitch({
  label,
  checked = false,
  onChange,
  disabled = false,
  required = false,
  error = false,
  helperText = "",
  labelPlacement = "end",
  className = "",
}) {
  return (
    <div className={`min-w-0 ${className}`}>
      <FormControlLabel
        disabled={disabled}
        label={label}
        labelPlacement={labelPlacement}
        control={
          <Switch
            checked={checked}
            onChange={(event) => onChange?.(event.target.checked)}
            required={required}
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "var(--wl-primary)",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "var(--wl-primary)",
                opacity: 1,
              },
              "& .MuiSwitch-track": {
                backgroundColor: "var(--wl-muted)",
                opacity: 0.4,
              },
            }}
          />
        }
        sx={{
          margin: 0,
          "& .MuiFormControlLabel-label": {
            fontFamily: "var(--wl-font-english)",
            fontSize: "var(--wl-text-sm)",
            color: error ? "var(--wl-status-cancelled)" : "var(--wl-text)",
          },
        }}
      />

      {helperText && (
        <FormHelperText
          error={error}
          sx={{
            marginLeft: labelPlacement === "start" ? 0 : "12px",
            marginTop: 0,
            fontSize: "var(--wl-text-xs)",
          }}
        >
          {helperText}
        </FormHelperText>
      )}
    </div>
  );
}

export default AppSwitch;
