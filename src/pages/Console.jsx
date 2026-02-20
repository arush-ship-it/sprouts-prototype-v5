import React, { useState } from "react";
import JobHeader from "@/components/console/JobHeader";
import SubTabs from "@/components/console/SubTabs";
import CandidateList from "@/components/console/CandidateList";
import PipelineView from "@/components/console/PipelineView";
import PipelineBuilderModal from "@/components/console/PipelineBuilderModal";
import { Button } from "@/components/ui/button";
import { Workflow } from "lucide-react";

export default function Console() {
  const [activeTab, setActiveTab] = useState("review");
  const [viewMode, setViewMode] = useState(activeTab === "pipeline" ? "pipeline" : "card");
  const [isPipelineBuilderOpen, setIsPipelineBuilderOpen] = useState(false);

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
      
      {/* Pipeline Builder Button - Only show in Pipeline tab */}
      {activeTab === "pipeline" && (
        <div className="px-8 pt-5 pb-3">
          <Button
            onClick={() => setIsPipelineBuilderOpen(true)}
            className="w-full h-12 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
          >
            <Workflow className="w-4 h-4 mr-2" />
            Build Pipeline
          </Button>
        </div>
      )}

      {activeTab === "review" ? (
        <CandidateList activeTab={activeTab} viewMode={viewMode} />
      ) : (
        viewMode === "pipeline" ? (
          <PipelineView />
        ) : (
          <CandidateList activeTab={activeTab} viewMode={viewMode} />
        )
      )}

      <PipelineBuilderModal
        isOpen={isPipelineBuilderOpen}
        onClose={() => setIsPipelineBuilderOpen(false)}
      />
    </div>
  );
}