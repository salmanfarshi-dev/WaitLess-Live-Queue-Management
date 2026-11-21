function AppCard({
  children,
  title,
  description,
  action,
  padding = "md",
  hoverable = false,
  className = "",
}) {
  const paddingStyles = {
    none: "p-0",
    sm: "p-3 sm:p-4",
    md: "p-4 sm:p-5",
    lg: "p-5 sm:p-6",
  };

  return (
    <section
      className={`wl-card w-full min-w-0 ${
        paddingStyles[padding] || paddingStyles.md
      } ${
        hoverable ? "hover:-translate-y-0.5 hover:shadow-card" : ""
      } ${className}`}
    >
      {(title || description || action) && (
        <div className="mb-4 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            {title && (
              <h3 className="text-base font-bold text-heading sm:text-lg">
                {title}
              </h3>
            )}

            {description && (
              <p className="mt-1 text-sm leading-6 text-muted">{description}</p>
            )}
          </div>

          {action && <div className="flex shrink-0 items-center">{action}</div>}
        </div>
      )}

      {children}
    </section>
  );
}

export default AppCard;
