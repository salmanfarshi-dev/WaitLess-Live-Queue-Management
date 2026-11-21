function AppStatCard({
  title,
  value = "0",
  description,
  icon: Icon,
  color = "primary",
  trend,
  trendType = "up",
  className = "",
}) {
  const colorStyles = {
    primary: {
      background: "var(--wl-primary-light)",
      color: "var(--wl-primary)",
    },
    secondary: {
      background: "var(--wl-secondary-light)",
      color: "var(--wl-secondary)",
    },
    success: {
      background: "var(--wl-status-completed-bg)",
      color: "var(--wl-status-completed)",
    },
    warning: {
      background: "var(--wl-status-called-bg)",
      color: "var(--wl-status-called)",
    },
    danger: {
      background: "var(--wl-status-cancelled-bg)",
      color: "var(--wl-status-cancelled)",
    },
  };

  const selectedColor = colorStyles[color] || colorStyles.primary;

  return (
    <div
      className={`wl-card flex min-w-0 flex-col gap-4 p-4 sm:p-5 ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="break-words text-sm font-medium text-muted">{title}</p>

          <h3 className="mt-2 break-words text-2xl font-extrabold text-heading sm:text-3xl">
            {value}
          </h3>
        </div>

        {Icon && (
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
            style={{
              backgroundColor: selectedColor.background,
              color: selectedColor.color,
            }}
          >
            <Icon size={22} />
          </div>
        )}
      </div>

      {(description || trend) && (
        <div className="flex flex-wrap items-center gap-2">
          {trend && (
            <span
              className="text-xs font-bold"
              style={{
                color:
                  trendType === "down"
                    ? "var(--wl-status-cancelled)"
                    : trendType === "neutral"
                      ? "var(--wl-muted)"
                      : "var(--wl-status-completed)",
              }}
            >
              {trend}
            </span>
          )}

          {description && (
            <span className="text-xs text-muted">{description}</span>
          )}
        </div>
      )}
    </div>
  );
}

export default AppStatCard;
