import { useState } from "react";
import {
  FiMenu,
  FiBell,
  FiChevronDown,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import AppAvatar from "./AppAvatar";

function DashboardHeader({
  title = "Dashboard",
  subtitle,
  user = {
    name: "User Name",
    role: "Administrator",
    avatar: "",
  },
  onMenuClick,
  onLogout,
  onProfileClick,
  onSettingsClick,
  notificationCount = 0,
}) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex min-h-20 items-center justify-between gap-3 border-b border-border bg-surface px-4 py-3 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-heading transition-colors hover:bg-background lg:hidden"
          aria-label="Open navigation menu"
        >
          <FiMenu size={22} />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold text-heading sm:text-xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-1 hidden truncate text-xs text-muted sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-muted transition-colors hover:bg-background hover:text-primary"
        >
          <FiBell size={20} />

          {notificationCount > 0 && (
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-status-cancelled px-1 text-[10px] font-bold text-white">
              {notificationCount > 99 ? "99+" : notificationCount}
            </span>
          )}
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen((previous) => !previous)}
            className="flex items-center gap-2 rounded-xl p-1.5 transition-colors hover:bg-background sm:gap-3"
            aria-expanded={profileOpen}
            aria-label="Open user menu"
          >
            <AppAvatar name={user.name} src={user.avatar} size={40} />

            <div className="hidden min-w-0 text-left sm:block">
              <p className="max-w-32 truncate text-sm font-semibold text-heading">
                {user.name}
              </p>

              <p className="max-w-32 truncate text-xs text-muted">
                {user.role}
              </p>
            </div>

            <FiChevronDown
              className={`hidden text-muted transition-transform sm:block ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full z-50 mt-3 w-52 overflow-hidden rounded-xl border border-border bg-surface p-2 shadow-lg">
              <button
                type="button"
                onClick={() => {
                  setProfileOpen(false);
                  onProfileClick?.();
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text transition-colors hover:bg-background"
              >
                <FiUser size={17} />
                My Profile
              </button>

              <button
                type="button"
                onClick={() => {
                  setProfileOpen(false);
                  onSettingsClick?.();
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text transition-colors hover:bg-background"
              >
                <FiSettings size={17} />
                Settings
              </button>

              {onLogout && (
                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    onLogout();
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-status-cancelled transition-colors hover:bg-background"
                >
                  <FiLogOut size={17} />
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
