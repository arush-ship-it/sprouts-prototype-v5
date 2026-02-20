import React from "react";
import SidebarNav from "@/components/console/SidebarNav";

export default function Layout({ children, currentPageName }) {
  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      <SidebarNav activePage={currentPageName} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}