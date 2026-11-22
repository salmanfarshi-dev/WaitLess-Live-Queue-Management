
import { NavLink } from "react-router-dom";
import { FiLogOut, FiChevronLeft } from "react-icons/fi";

import AppLogo from "./AppLogo";
import {
  dashboardNavigation,
  dashboardRoleLabels,
} from "../../utils/dashboardNavigation";

function DashboardSidebar({
  role = "hospital_admin",
  collapsed = false,
  onToggle,
  onLogout,
}) {
  const navigationItems = dashboardNavigation[role] || [];

  return (
    <aside
      className={`sticky top-0 flex h-screen shrink-0 flex-col border-r border-border bg-surface transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex h-20 items-center justify-between gap-2 border-b border-border px-4">
        <AppLogo
          size="md"
          showText={!collapsed}
          to={
            role === "super_admin"
              ? "/super-admin/dashboard"
              : role === "doctor"
                ? "/doctor/dashboard"
                : "/hospital/dashboard"
          }
        />

        {onToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="hidden h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-background hover:text-primary lg:flex"
            aria-label="Toggle sidebar"
          >
            <FiChevronLeft
              className={`transition-transform ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>

      {!collapsed && (
        <div className="border-b border-border px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Workspace
          </p>
          <p className="mt-1 text-sm font-bold text-heading">
            {dashboardRoleLabels[role] || "Dashboard"}
          </p>
        </div>
      )}

      <nav className="flex-1 space-y-2 overflow-y-auto p-3">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={
                item.to.endsWith("/dashboard") ||
                item.to.endsWith("/overview")
              }
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-primary-light text-primary"
                    : "text-muted hover:bg-background hover:text-heading"
                }`
              }
            >
              <Icon className="h-5 w-5 shrink-0" />

              {!collapsed && (
                <span className="truncate">{item.label}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        {onLogout && (
          <button
            type="button"
            onClick={onLogout}
            title={collapsed ? "Logout" : undefined}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-muted transition-colors hover:bg-background hover:text-status-cancelled"
          >
            <FiLogOut className="h-5 w-5 shrink-0" />

            {!collapsed && <span>Logout</span>}
          </button>
        )}
      </div>
    </aside>
  );
}

export default DashboardSidebar;
