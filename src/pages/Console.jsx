import React, { useState } from "react";
import JobHeader from "@/components/console/JobHeader";
import SubTabs from "@/components/console/SubTabs";
import CandidateList from "@/components/console/CandidateList";
import PipelineView from "@/components/console/PipelineView";

export default function Console() {
  const [activeTab, setActiveTab] = useState("review");
  const [viewMode, setViewMode] = useState(activeTab === "pipeline" ? "pipeline" : "card");

  // Update view mode when tab changes
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    // Set default view for each tab
    setViewMode(newTab === "pipeline" ? "pipeline" : "card");
  };

  return (
    <div className="flex-1 min-h-screen bg-[#FAFAFA] overflow-auto">
      <JobHeader />
      <SubTabs 
        activeTab={activeTab} 
        setActiveTab={handleTabChange}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      {activeTab === "review" ? (
        <CandidateList activeTab={activeTab} viewMode={viewMode} />
      ) : (
        viewMode === "pipeline" ? (
          <PipelineView />
        ) : (
          <CandidateList activeTab={activeTab} viewMode={viewMode} />
        )
      )}
    </div>
  );
}