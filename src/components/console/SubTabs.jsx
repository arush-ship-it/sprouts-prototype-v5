import React from "react";
import { LayoutGrid, List, Table, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SubTabs({ activeTab, setActiveTab, viewMode, setViewMode }) {
  const tabs = [
    { key: "review", label: "In Review", count: 12 },
    { key: "pipeline", label: "In Pipeline", count: 34 },
  ];

  const reviewViews = [
    { key: "card", label: "Card", icon: LayoutGrid },
    { key: "list", label: "List", icon: List },
  ];

  const pipelineViews = [
    { key: "card", label: "Card", icon: LayoutGrid },
    { key: "table", label: "Table", icon: Table },
    { key: "pipeline", label: "Pipeline", icon: Workflow },
  ];

  const currentViews = activeTab === "review" ? reviewViews : pipelineViews;

  return (
    <div className="px-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 p-1 bg-gray-100/70 rounded-xl w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative px-5 py-2 rounded-lg text-[13px] font-semibold transition-all duration-300 flex items-center gap-2
                ${
                  activeTab === tab.key
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
            >
              {tab.label}
              <span
                className={`text-[11px] font-bold px-1.5 py-0.5 rounded-md transition-colors ${
                  activeTab === tab.key
                    ? "bg-indigo-50 text-indigo-600"
                    : "bg-gray-200/60 text-gray-400"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 p-1 bg-gray-100/70 rounded-lg">
          {currentViews.map((view) => (
            <Button
              key={view.key}
              variant="ghost"
              size="sm"
              onClick={() => setViewMode(view.key)}
              className={`h-8 px-3 text-[12px] ${
                viewMode === view.key
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <view.icon className="w-3.5 h-3.5 mr-1.5" />
              {view.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}