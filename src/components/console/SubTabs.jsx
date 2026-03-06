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
        <div className="bg-[#E5E7EB] p-1 rounded-xl flex items-center gap-1 w-fit">
          {tabs.map((tab) =>
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative px-5 py-2 rounded-lg text-[13px] font-semibold transition-all duration-300 flex items-center gap-2
                ${
            activeTab === tab.key ?
            "bg-white text-gray-900 shadow-sm" :
            "text-gray-400 hover:text-gray-600"}`
            }>

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
        <div className="flex items-center gap-2">
          {/* Search Bar */}
          <div
            className={`flex items-center gap-2 bg-gray-100/70 rounded-lg px-3 py-2 transition-all duration-300 ${
            isSearchExpanded ? "w-64" : "w-10"}`
            }
            onMouseEnter={() => setIsSearchExpanded(true)}
            onMouseLeave={() => setIsSearchExpanded(false)}>

            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            {isSearchExpanded &&
            <Input
              placeholder="Search candidates..."
              className="border-0 bg-transparent h-6 px-0 text-[13px] focus-visible:ring-0 focus-visible:ring-offset-0" />

            }
          </div>

          {/* Filter Button */}
          <Button
            variant="ghost"
            size="sm"
            className="h-10 px-3 bg-gray-100/70 text-gray-600 hover:bg-gray-200 rounded-lg">

            <Filter className="w-4 h-4 mr-2" />
            <span className="text-[13px] font-medium">Filters</span>
          </Button>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 p-1 bg-gray-100/70 rounded-lg">
            {currentViews.map((view) =>
            <Button
              key={view.key}
              variant="ghost"
              size="sm"
              onClick={() => setViewMode(view.key)}
              title={view.label}
              className={`h-8 w-8 p-0 text-[12px] ${
              viewMode === view.key ?
              "bg-white shadow-sm text-gray-900" :
              "text-gray-400 hover:text-gray-600"}`
              }>

                <view.icon className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>);

}