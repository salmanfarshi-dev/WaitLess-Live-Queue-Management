import {
  FiGrid,
  FiUsers,
  FiUser,
  FiActivity,
  FiCalendar,
  FiClipboard,
  FiCreditCard,
  FiBarChart2,
  FiSettings,
  FiHome,
  FiDollarSign,
} from "react-icons/fi";

export const dashboardNavigation = {
  super_admin: [
    { label: "Overview", to: "/super-admin/dashboard", icon: FiGrid },
    { label: "Hospitals", to: "/super-admin/hospitals", icon: FiHome },
    { label: "Users", to: "/super-admin/users", icon: FiUsers },
    {
      label: "Subscriptions",
      to: "/super-admin/subscriptions",
      icon: FiCreditCard,
    },
    { label: "Payments", to: "/super-admin/payments", icon: FiDollarSign },
    { label: "Reports", to: "/super-admin/reports", icon: FiBarChart2 },
    { label: "Settings", to: "/super-admin/settings", icon: FiSettings },
  ],

  hospital_admin: [
    { label: "Overview", to: "/hospital/dashboard", icon: FiGrid },
    { label: "Doctors", to: "/hospital/doctors", icon: FiUsers },
    { label: "Staff", to: "/hospital/staff", icon: FiUser },
    { label: "Patients", to: "/hospital/patients", icon: FiUsers },
    { label: "Queue Management", to: "/hospital/queues", icon: FiActivity },
    { label: "Schedule", to: "/hospital/schedule", icon: FiCalendar },
    { label: "Reports", to: "/hospital/reports", icon: FiBarChart2 },
    { label: "Subscription", to: "/hospital/subscription", icon: FiCreditCard },
    { label: "Settings", to: "/hospital/settings", icon: FiSettings },
  ],

  receptionist: [
    { label: "Overview", to: "/hospital/dashboard", icon: FiGrid },
    { label: "Patients", to: "/hospital/patients", icon: FiUsers },
    { label: "Queue Management", to: "/hospital/queues", icon: FiActivity },
    { label: "Token Management", to: "/hospital/tokens", icon: FiClipboard },
    { label: "Schedule", to: "/hospital/schedule", icon: FiCalendar },
  ],

  doctor: [
    { label: "Overview", to: "/doctor/dashboard", icon: FiGrid },
    { label: "My Queue", to: "/doctor/queue", icon: FiActivity },
    { label: "My Patients", to: "/doctor/patients", icon: FiUsers },
    { label: "My Schedule", to: "/doctor/schedule", icon: FiCalendar },
    { label: "My Profile", to: "/doctor/profile", icon: FiUser },
    { label: "Settings", to: "/doctor/settings", icon: FiSettings },
  ],
};

export const dashboardRoleLabels = {
  super_admin: "Super Admin",
  hospital_admin: "Hospital Admin",
  receptionist: "Receptionist",
  doctor: "Doctor",
};
