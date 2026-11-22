
import { Outlet } from "react-router-dom";

import PublicNavbar from "../components/common/PublicNavbar";
import PublicFooter from "../components/common/PublicFooter";

function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text">
      <PublicNavbar />

      <main className="min-w-0 flex-1">
        <Outlet />
      </main>

      <PublicFooter />
    </div>
  );
}

export default PublicLayout;
