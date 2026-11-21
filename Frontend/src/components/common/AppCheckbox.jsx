import { Checkbox, FormControlLabel, FormHelperText } from "@mui/material";
import { FiCheck } from "react-icons/fi";

function AppCheckbox({
  label,
  checked = false,
  onChange,
  disabled = false,
  required = false,
  error = false,
  helperText = "",
  className = "",
}) {
  return (
    <div className={`min-w-0 ${className}`}>
      <FormControlLabel
        disabled={disabled}
        control={
          <Checkbox
            checked={checked}
            onChange={(event) => onChange?.(event.target.checked)}
            required={required}
            icon={
              <span
                className="h-5 w-5 rounded-md border"
                style={{ borderColor: "var(--wl-border)" }}
              />
            }
            checkedIcon={
              <span
                className="flex h-5 w-5 items-center justify-center rounded-md"
                style={{
                  backgroundColor: "var(--wl-primary)",
                  color: "#ffffff",
                }}
              >
                <FiCheck size={15} />
              </span>
            }
            sx={{
              padding: "6px",
              "&.Mui-disabled": {
                opacity: 0.5,
              },
            }}
          />
        }
        label={label}
        sx={{
          margin: 0,
          alignItems: "center",
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
            marginLeft: "30px",
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

export default AppCheckbox;
