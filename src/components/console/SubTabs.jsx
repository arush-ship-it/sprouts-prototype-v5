import React, { useState } from "react";
import { LayoutGrid, List, Table, Workflow, Filter, Search, Users, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SubTabs({ activeTab, setActiveTab, viewMode, setViewMode, onCreateNew }) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const tabs = [
  { key: "review", label: "Prospects", count: 12, icon: Users },
  { key: "pipeline", label: "Pipeline", count: 34, icon: GitBranch }];


  const reviewViews = [
  { key: "card", label: "Card", icon: LayoutGrid },
  { key: "list", label: "List", icon: List }];


  const pipelineViews = [
  { key: "card", label: "Card", icon: LayoutGrid },
  { key: "table", label: "Table", icon: Table },
  { key: "pipeline", label: "Pipeline", icon: Workflow }];


  const currentViews = activeTab === "review" ? reviewViews : pipelineViews;

  return (
    <div className="px-8 py-0">
      <div className="flex items-center justify-between py-3">
        {/* Tab Bar */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-full">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)} className="bg-white text-gray-900 px-3 py-3 text-xs font-medium rounded-[10px] flex items-center gap-2 transition-all duration-200 shadow-sm">



                
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
                <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full transition-colors ${
                isActive ? "bg-blue-50 text-blue-600" : "bg-gray-200 text-gray-400"}`
                }>
                  {tab.count}
                </span>
              </button>);

          })}
        </div>

        {/* Filter, Search & View Mode */}
        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div
            className="bg-gray-100 px-3 py-1.5 rounded-lg flex items-center gap-2 overflow-hidden transition-all duration-300 ease-in-out"
            style={{ width: isSearchExpanded ? "200px" : "36px" }}
            onMouseEnter={() => setIsSearchExpanded(true)}
            onMouseLeave={() => setIsSearchExpanded(false)}>
            <Search className="text-gray-500 w-3.5 h-3.5 shrink-0" />
            <input
              placeholder="Search candidates..."
              className="bg-transparent border-none outline-none text-[13px] text-gray-700 placeholder-gray-400 w-full transition-opacity duration-300"
              style={{ opacity: isSearchExpanded ? 1 : 0 }} />
          </div>

          {/* Filter Button */}
          <button className="flex items-center gap-1.5 text-[12px] font-medium text-gray-500 hover:text-gray-700 transition-colors">
            <Filter className="w-3.5 h-3.5" />
            Filters
          </button>

          {/* View Mode Toggle */}
          <div className="bg-gray-100 p-1 rounded-lg flex items-center gap-0.5">
            {currentViews.map((view) =>
            <button
              key={view.key}
              onClick={() => setViewMode(view.key)}
              title={view.label}
              className={`p-1.5 rounded-md transition-colors ${
              viewMode === view.key ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"}`
              }>
                <view.icon className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>);

}