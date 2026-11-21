import { FiArrowLeft } from "react-icons/fi";

function AppPageHeader({
  title,
  description,
  action,
  backButton = false,
  onBack,
  className = "",
}) {
  return (
    <div
      className={`flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <div className="flex min-w-0 items-start gap-3">
        {backButton && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Go back"
            className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted wl-transition hover:bg-primary-light hover:text-primary"
          >
            <FiArrowLeft size={18} />
          </button>
        )}

        <div className="min-w-0">
          <h1 className="break-words text-xl font-bold text-heading sm:text-2xl">
            {title}
          </h1>

          {description && (
            <p className="mt-1 text-sm leading-6 text-muted">{description}</p>
          )}
        </div>
      </div>

      {action && (
        <div className="flex w-full shrink-0 items-center sm:w-auto">
          {action}
        </div>
      )}
    </div>
  );
}

export default AppPageHeader;
