import { Stepper, Step, StepLabel, StepContent } from "@mui/material";

function AppStepper({
  steps = [],
  activeStep = 0,
  orientation = "horizontal",
  alternativeLabel = false,
  showContent = false,
  className = "",
}) {
  return (
    <Stepper
      activeStep={activeStep}
      orientation={orientation}
      alternativeLabel={alternativeLabel}
      className={className}
      sx={{
        "& .MuiStepLabel-label": {
          fontFamily: "var(--wl-font-english)",
          fontSize: "var(--wl-text-sm)",
          color: "var(--wl-muted)",
        },
        "& .MuiStepLabel-label.Mui-active": {
          color: "var(--wl-primary)",
          fontWeight: "var(--wl-weight-bold)",
        },
        "& .MuiStepLabel-label.Mui-completed": {
          color: "var(--wl-status-completed)",
        },
        "& .MuiStepIcon-root.Mui-active": {
          color: "var(--wl-primary)",
        },
        "& .MuiStepIcon-root.Mui-completed": {
          color: "var(--wl-status-completed)",
        },
        "& .MuiStepConnector-line": {
          borderColor: "var(--wl-border)",
        },
      }}
    >
      {steps.map((step, index) => (
        <Step
          key={step.label || index}
          completed={step.completed}
          disabled={step.disabled}
        >
          <StepLabel optional={step.optional} error={step.error || false}>
            {step.label}
          </StepLabel>

          {showContent && orientation === "vertical" && (
            <StepContent>{step.content}</StepContent>
          )}
        </Step>
      ))}
    </Stepper>
  );
}

export default AppStepper;
