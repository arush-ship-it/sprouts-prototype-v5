import React, { useState } from "react";
import { LayoutGrid, List, Table, Workflow, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SubTabs({ activeTab, setActiveTab, viewMode, setViewMode, onCreateNew }) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const tabs = [
  { key: "review", label: "Prospects", count: 12 },
  { key: "pipeline", label: "Pipeline", count: 34 }];


  const reviewViews = [
  { key: "card", label: "Card", icon: LayoutGrid },
  { key: "list", label: "List", icon: List }];


  const pipelineViews = [
  { key: "card", label: "Card", icon: LayoutGrid },
  { key: "table", label: "Table", icon: Table },
  { key: "pipeline", label: "Pipeline", icon: Workflow }];


  const currentViews = activeTab === "review" ? reviewViews : pipelineViews;

  return (
    <div className="px-8 py-2">
      <div className="flex items-center justify-between">
        <div className="bg-gray-200 p-1 rounded-[28px] flex items-center gap-1 w-fit">
          {tabs.map((tab) =>
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)} className={`px-4 py-2 text-xs font-medium rounded-3xl relative transition-all duration-300 flex items-center gap-2 ${activeTab === tab.key ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>





            

              {tab.label}
              <span
              className={`text-[11px] font-bold px-1.5 py-0.5 rounded-md transition-colors ${
              activeTab === tab.key ?
              "bg-indigo-50 text-indigo-600" :
              "bg-gray-200/60 text-gray-400"}`
              }>

                {tab.count}
              </span>
            </button>
          )}
        </div>

        {/* Filter, Search & View Mode */}
        <div className="flex items-center gap-8">
          {/* Search Bar */}
          <div
            className="bg-gray-200 px-3 py-2 rounded-lg flex items-center gap-2 overflow-hidden transition-all duration-300 ease-in-out"
            style={{ width: isSearchExpanded ? "200px" : "40px" }}
            onMouseEnter={() => setIsSearchExpanded(true)}
            onMouseLeave={() => setIsSearchExpanded(false)}>
            
            <Search className="text-gray-600 w-4 h-4 shrink-0" />
            <input
              placeholder="Search candidates..."
              className="bg-transparent border-none outline-none text-[13px] text-gray-700 placeholder-gray-400 w-full transition-opacity duration-300"
              style={{ opacity: isSearchExpanded ? 1 : 0 }} />
            
          </div>

          {/* Filter Button */}
          <Button
            variant="ghost"
            size="sm" className="bg-[hsl(var(--background))] text-gray-700 px-2 text-xs font-medium rounded-xl inline-flex items-center justify-center gap-0 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-accent-foreground h-8 hover:bg-gray-200">


            <Filter className="w-4 h-4 mr-2" />
            <span className="text-[13px] text-xs font-medium">Filters</span>
          </Button>

          {/* View Mode Toggle */}
          <div className="bg-gray-200 p-1 rounded-full flex items-center gap-1">
            {currentViews.map((view) =>
            <Button
              key={view.key}
              variant="ghost"
              size="sm"
              onClick={() => setViewMode(view.key)}
              title={view.label} className={`p-0 font-medium rounded-full inline-flex items-center justify-center h-8 w-8 transition-colors ${viewMode === view.key ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}>




              

                <view.icon className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>);

}