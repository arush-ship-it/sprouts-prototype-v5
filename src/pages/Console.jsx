import React, { useState } from "react";
import JobHeader from "@/components/console/JobHeader";
import SubTabs from "@/components/console/SubTabs";
import CandidateList from "@/components/console/CandidateList";

export default function Console() {
  const [activeTab, setActiveTab] = useState("review");

  return (
    <div className="flex-1 min-h-screen bg-[#FAFAFA] overflow-auto">
      <JobHeader />
      <SubTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <CandidateList activeTab={activeTab} />
    </div>
  );
}