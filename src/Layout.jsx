import React from "react";
import SidebarNav from "@/components/console/SidebarNav";

export default function Layout({ children, currentPageName }) {
  // Pages that should show sidebar
  const sidebarPages = ["Console", "Talent", "Agents", "Inbox", "JobDetails"];
  const showSidebar = sidebarPages.includes(currentPageName);

  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      {showSidebar && <SidebarNav activePage={currentPageName} />}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}