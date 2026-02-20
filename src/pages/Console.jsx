import React, { useState } from "react";
import JobHeader from "@/components/console/JobHeader";
import SubTabs from "@/components/console/SubTabs";
import CandidateList from "@/components/console/CandidateList";
import PipelineView from "@/components/console/PipelineView";

export default function Console() {
  const [activeTab, setActiveTab] = useState("review");

  return (
    <div className="flex-1 min-h-screen bg-[#FAFAFA] overflow-auto">
      <JobHeader />
      <SubTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "review" ? (
        <CandidateList activeTab={activeTab} />
      ) : (
        <PipelineView />
      )}
    </div>
  );
}