
import { Tabs, Tab, Box } from "@mui/material";

function AppTabs({
  value,
  onChange,
  tabs = [],
  variant = "scrollable",
  centered = false,
  scrollButtons = "auto",
  className = "",
}) {
  return (
    <Box
      className={`w-full min-w-0 ${className}`}
      sx={{
        borderBottom: "1px solid var(--wl-border)",
      }}
    >
      <Tabs
        value={value}
        onChange={(_, newValue) => onChange?.(newValue)}
        variant={variant}
        centered={centered}
        scrollButtons={scrollButtons}
        allowScrollButtonsMobile
        sx={{
          minHeight: 44,
          "& .MuiTab-root": {
            minHeight: 44,
            minWidth: "auto",
            px: 2,
            fontFamily: "var(--wl-font-english)",
            fontSize: "var(--wl-text-sm)",
            fontWeight: "var(--wl-weight-semibold)",
            textTransform: "none",
            color: "var(--wl-muted)",
          },
          "& .Mui-selected": {
            color: "var(--wl-primary)",
          },
          "& .MuiTabs-indicator": {
            height: 3,
            borderRadius: "var(--wl-radius-pill)",
            backgroundColor: "var(--wl-primary)",
          },
        }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            label={tab.label}
            disabled={tab.disabled || false}
            icon={tab.icon}
            iconPosition="start"
          />
        ))}
      </Tabs>
    </Box>
  );
}

export default AppTabs;
