
import { Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text">
      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default PublicLayout;
