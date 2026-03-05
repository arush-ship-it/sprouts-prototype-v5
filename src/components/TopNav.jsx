import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  LayoutDashboard,
  FolderOpen,
  PlusCircle,
  Terminal,
  Bell,
  Settings,
  User,
} from "lucide-react";

const navLinks = [
  { label: "Dashboard", icon: LayoutDashboard, page: "Dashboard" },
  { label: "Talent Pool", icon: FolderOpen, page: "TalentPool" },
  { label: "Create Job", icon: PlusCircle, page: "CreateJob" },
  { label: "Console", icon: Terminal, page: "Console" },
];

export default function TopNav({ currentPageName }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-12 bg-white border-b border-gray-200 flex items-center px-4 gap-1">
      {/* Brand */}
      <Link
        to={createPageUrl("Dashboard")}
        className="text-[13px] font-semibold text-gray-900 tracking-tight mr-4 hover:text-indigo-600 transition-colors shrink-0"
      >
        Sprouts AI
      </Link>

      {/* Nav Links */}
      <nav className="flex items-center gap-0.5 flex-1">
        {navLinks.map((link) => {
          const isActive = currentPageName === link.page;
          return (
            <Link
              key={link.page}
              to={createPageUrl(link.page)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-all duration-150
                ${isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
            >
              <link.icon className={`w-3.5 h-3.5 ${isActive ? "text-gray-700" : "text-gray-400"}`} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Right side: actions + user */}
      <div className="flex items-center gap-1 ml-auto shrink-0">
        {/* Bell */}
        <button className="relative p-2 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>

        {/* Settings */}
        <Link
          to={createPageUrl("Settings")}
          className="p-2 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <Settings className="w-4 h-4" />
        </Link>

        {/* User */}
        <div className="flex items-center gap-2 pl-2 ml-1 border-l border-gray-200">
          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-gray-500" />
          </div>
          <span className="text-[13px] font-medium text-gray-700">John Doe</span>
        </div>
      </div>
    </header>
  );
}