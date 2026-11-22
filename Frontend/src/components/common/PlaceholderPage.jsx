function PlaceholderPage({
  title = "Coming Soon",
  description = "This page is under development.",
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold text-heading">{title}</h1>

      <p className="mt-3 max-w-md text-sm text-muted">{description}</p>
    </div>
  );
}

export default PlaceholderPage;
