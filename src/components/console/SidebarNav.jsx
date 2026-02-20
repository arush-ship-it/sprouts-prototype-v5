import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Users,
  Activity,
  SlidersHorizontal,
  Inbox,
  FileText,
  LayoutDashboard,
  FolderOpen,
  PlusCircle,
  Terminal,
} from "lucide-react";

const mainLinks = [
  { label: "Talent", icon: Users, active: false, page: "Talent" },
  { label: "Activity", icon: Activity, active: false, page: "Activity" },
  { label: "Evaluation Criteria", icon: SlidersHorizontal, active: false, page: "Evaluation" },
  { label: "Inbox", icon: Inbox, active: false, page: "Inbox" },
  { label: "Job Details", icon: FileText, active: false, page: "JobDetails" },
];

const bottomLinks = [
  { label: "Dashboard", icon: LayoutDashboard, page: "Dashboard" },
  { label: "Talent Pool", icon: FolderOpen, page: "TalentPool" },
  { label: "Create Job", icon: PlusCircle, page: "CreateJob" },
  { label: "Console", icon: Terminal, page: "Console" },
];

export default function SidebarNav({ activePage = "Console" }) {
  return (
    <aside className="w-[260px] min-h-screen bg-[#0F1117] flex flex-col justify-between py-6 px-4 shrink-0">
      {/* Top: Brand + Main Links */}
      <div>
        <div className="flex items-center gap-2.5 px-3 mb-10">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <Terminal className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-semibold text-[15px] tracking-tight">
            RecruitAI
          </span>
        </div>

        <nav className="flex flex-col gap-1">
          {mainLinks.map((link) => (
            <Link
              key={link.label}
              to={createPageUrl(link.page)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-all duration-200 group
                ${
                  activePage === link.page
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.05]"
                }`}
            >
              <link.icon
                className={`w-[18px] h-[18px] transition-colors ${
                  activePage === link.page
                    ? "text-indigo-400"
                    : "text-gray-500 group-hover:text-gray-300"
                }`}
              />
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom: Icon-only nav */}
      <div className="border-t border-white/[0.06] pt-5 mt-6">
        <div className="flex items-center justify-around">
          {bottomLinks.map((link) => (
            <Link
              key={link.label}
              to={createPageUrl(link.page)}
              className={`relative flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-200 group
                ${
                  activePage === link.page
                    ? "text-indigo-400"
                    : "text-gray-500 hover:text-gray-300"
                }`}
            >
              {activePage === link.page && (
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-400" />
              )}
              <link.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium tracking-wide">
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}