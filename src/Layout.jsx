import React from "react";
import SidebarNav from "@/components/console/SidebarNav";
import TopNav from "@/components/TopNav";

export default function Layout({ children, currentPageName }) {
  // Pages that should show sidebar
  const sidebarPages = ["Console", "Talent", "Agents", "Inbox", "JobDetails"];
  const showSidebar = sidebarPages.includes(currentPageName);

  const showTopNav = currentPageName !== "Settings";

  return (
    <div className="bg-[##F2F3F5] flex min-h-screen">
      {showTopNav && <TopNav currentPageName={currentPageName} />}
      {showSidebar && <SidebarNav activePage={currentPageName} />}
      <main
        className={`flex-1 overflow-auto ${showTopNav ? "pt-12" : ""} ${showSidebar ? "ml-[221px]" : ""}`}>

        {children}
      </main>
    </div>);

}