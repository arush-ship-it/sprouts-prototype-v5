import React from "react";
import CandidateCardDetailed from "./CandidateCardDetailed";
import { Search, SlidersHorizontal } from "lucide-react";

const reviewCandidates = [
  {
    id: 1,
    name: "Maya Johnson",
    title: "Lead Product Designer",
    company: "Stripe",
    degree: "Msc Computer Engineering",
    university: "University Of California, Berkley",
    location: "San Francisco, California, United States",
    experience: "4 years",
    skillsMatch: "20/23 match",
    attributesMatch: "5/6 match",
    score: 78,
    sequence: "Warm Outreach, Active",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Marcus Rashford",
    title: "Job Title",
    company: "Company",
    degree: "Degree Name",
    university: "University",
    location: "San Francisco, California, United States",
    experience: "4 years",
    skillsMatch: "20/23 match",
    attributesMatch: "5/6 match",
    score: 78,
    sequence: "Warm Outreach, Active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Sarah Mitchell",
    title: "Product Designer",
    company: "Airbnb",
    degree: "Bsc Computer Engineering",
    university: "Stanford University",
    location: "New York, NY, United States",
    experience: "6 years",
    skillsMatch: "18/23 match",
    attributesMatch: "4/6 match",
    score: 82,
    sequence: "Cold Outreach, Active",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
];

const pipelineCandidates = [
  {
    id: 6,
    name: "Daniel Wright",
    title: "UX Lead",
    company: "Meta",
    score: 96,
    stage: "Offer",
    starred: true,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 7,
    name: "Lena Kim",
    title: "Product Designer II",
    company: "Google",
    score: 92,
    stage: "Final Round",
    starred: true,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 8,
    name: "Marcus Rivera",
    title: "Sr. Designer",
    company: "Apple",
    score: 89,
    stage: "Technical",
    starred: false,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 9,
    name: "Emma Collins",
    title: "Design Manager",
    company: "Netflix",
    score: 85,
    stage: "Interview",
    starred: false,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
  },
];

export default function CandidateList({ activeTab }) {
  const candidates =
    activeTab === "review" ? reviewCandidates : pipelineCandidates;

  return (
    <div className="px-8 pt-5 pb-8">
      {/* Search / Filter bar */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
          <input
            type="text"
            placeholder="Search candidates..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-100 text-[13px] text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-100 text-[13px] font-medium text-gray-500 hover:bg-gray-100 transition-colors">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filters
        </button>
      </div>

      {/* List */}
      <div className="flex flex-col gap-3">
        {candidates.map((candidate) => (
          <CandidateCardDetailed key={candidate.id} candidate={candidate} />
        ))}
      </div>
    </div>
  );
}