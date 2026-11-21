import { Divider } from "@mui/material";

function AppDivider({
  orientation = "horizontal",
  variant = "fullWidth",
  text,
  flexItem = false,
  className = "",
}) {
  return (
    <Divider
      orientation={orientation}
      variant={variant}
      flexItem={flexItem}
      className={className}
      sx={{
        borderColor: "var(--wl-border)",
        fontFamily: "var(--wl-font-english)",
        fontSize: "var(--wl-text-xs)",
        color: "var(--wl-muted)",
        ...(text && {
          "&::before, &::after": {
            borderColor: "var(--wl-border)",
          },
        }),
      }}
    >
      {text}
    </Divider>
  );
}

export default AppDivider;
