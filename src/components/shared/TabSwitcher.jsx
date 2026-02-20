import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { LayoutDashboard, FolderOpen, PlusCircle, Terminal } from "lucide-react";

const tabs = [
  { label: "Dashboard", icon: LayoutDashboard, page: "Dashboard" },
  { label: "Talent Pool", icon: FolderOpen, page: "TalentPool" },
  { label: "Create Job", icon: PlusCircle, page: "CreateJob" },
  { label: "Console", icon: Terminal, page: "Console" },
];

export default function TabSwitcher({ activePage }) {
  return (
    <div className="flex items-center justify-end gap-1 p-1.5 rounded-xl border border-gray-200 shadow-sm">
      {tabs.map((tab) => (
        <Link
          key={tab.page}
          to={createPageUrl(tab.page)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-all
            ${
              activePage === tab.page
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
            }`}
        >
          <tab.icon className="w-4 h-4" />
          {tab.label}
        </Link>
      ))}
    </div>
  );
}