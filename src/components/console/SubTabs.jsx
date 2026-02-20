import React from "react";

export default function SubTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { key: "review", label: "In Review", count: 12 },
    { key: "pipeline", label: "In Pipeline", count: 34 },
  ];

  return (
    <div className="px-8 pt-6">
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
    </div>
  );
}