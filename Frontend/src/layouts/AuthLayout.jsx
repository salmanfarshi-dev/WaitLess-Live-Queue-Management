
import { Outlet, Link } from "react-router-dom";
import AppLogo from "../components/common/AppLogo";

function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-surface px-4 py-4">
        <div className="wl-container">
          <AppLogo />
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>

      <footer className="border-t border-border bg-surface px-4 py-5 text-center">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} WaitLess. All rights reserved.
        </p>

        <Link
          to="/"
          className="mt-2 inline-block text-xs font-semibold text-primary hover:underline"
        >
          Back to Home
        </Link>
      </footer>
    </div>
  );
}

export default AuthLayout;
