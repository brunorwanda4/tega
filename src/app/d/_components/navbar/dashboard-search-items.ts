export interface dashboardSearchItemType {
  label: string;
  href: string;
  description?: string;
  category: string;
}

// In your landing-nav-all-pages.ts (or wherever allPages is defined)

export const dashboardSearchItems = [
  {
    label: "Dashboard",
    href: "/d",
    description: "Main dashboard overview",
    category: "Dashboard",
  },
  {
    label: "Clients",
    href: "/d/clients",
    description: "Manage your clients",
    category: "Dashboard",
  },
  {
    label: "Client Tracking",
    href: "/d/client-tracking",
    description: "Track client activity and progress",
    category: "Dashboard",
  },
  {
    label: "Drivers",
    href: "/d/drivers",
    description: "Manage drivers",
    category: "Dashboard",
  },
  {
    label: "Payments",
    href: "/d/payments",
    description: "View and manage payments",
    category: "Dashboard",
  },
  {
    label: "Communications",
    href: "/d/communications",
    description: "Messages and communications",
    category: "Dashboard",
  },
];
