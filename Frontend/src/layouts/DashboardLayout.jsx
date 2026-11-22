
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import DashboardSidebar from "../components/common/DashboardSidebar";
import DashboardHeader from "../components/common/DashboardHeader";

function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userData = useSelector((state) => state.auth.user);

  const roleLabels = {
    super_admin: "Super Admin",
    hospital_admin: "Hospital Admin",
    receptionist: "Receptionist",
    doctor: "Doctor",
  };

  const user = {
    name:
      userData?.name ||
      userData?.fullName ||
      userData?.email ||
      "User",
    role: roleLabels[userData?.role] || "User",
    roleKey: userData?.role || "",
    avatar: userData?.avatar || userData?.profileImage || "",
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DashboardSidebar
          role={user.roleKey}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((previous) => !previous)}
        />
      </div>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/40"
          />

          <div className="relative h-full w-72 max-w-[85vw]">
            <DashboardSidebar
              role={user.roleKey}
              onToggle={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Dashboard Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader
          user={{
            name: user.name,
            role: user.role,
            avatar: user.avatar,
          }}
          onMenuClick={() => setMobileMenuOpen(true)}
          notificationCount={0}
        />

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
