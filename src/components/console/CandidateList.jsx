import React, { useState } from "react";
import CandidateCardDetailed from "./CandidateCardDetailed";
import CandidateDetailsDrawer from "./CandidateDetailsDrawer";
import CandidateFitInsights from "./CandidateFitInsights";
import { Search, SlidersHorizontal, Sparkles, ChevronDown, ChevronUp, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

const reviewCandidates = [
{ id: 1, name: "Maya Johnson", title: "Lead Product Designer", company: "Stripe", degree: "Msc Computer Engineering", university: "University Of California, Berkley", location: "San Francisco, California, United States", experience: "4 years", skillsMatch: "20/23 match", attributesMatch: "5/6 match", score: 78, sequence: "Warm Outreach, Active", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
{ id: 2, name: "Marcus Rashford", title: "Job Title", company: "Company", degree: "Degree Name", university: "University", location: "San Francisco, California, United States", experience: "4 years", skillsMatch: "20/23 match", attributesMatch: "5/6 match", score: 78, sequence: "Warm Outreach, Active", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
{ id: 3, name: "Sarah Mitchell", title: "Product Designer", company: "Airbnb", degree: "Bsc Computer Engineering", university: "Stanford University", location: "New York, NY, United States", experience: "6 years", skillsMatch: "18/23 match", attributesMatch: "4/6 match", score: 82, sequence: "Cold Outreach, Active", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
{ id: 4, name: "Alex Thompson", title: "Senior UX Designer", company: "Adobe", degree: "BA in Visual Design", university: "Rhode Island School of Design", location: "Seattle, Washington, United States", experience: "7 years", skillsMatch: "21/23 match", attributesMatch: "6/6 match", score: 91, sequence: "Warm Outreach, Active", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
{ id: 5, name: "Emily Rodriguez", title: "Product Designer", company: "Figma", degree: "Msc in HCI", university: "Carnegie Mellon University", location: "San Francisco, California, United States", experience: "5 years", skillsMatch: "22/23 match", attributesMatch: "5/6 match", score: 88, sequence: "Cold Outreach, Active", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" },
{ id: 6, name: "David Park", title: "Design Lead", company: "Shopify", degree: "BA in Graphic Design", university: "Parsons School of Design", location: "Toronto, Ontario, Canada", experience: "8 years", skillsMatch: "19/23 match", attributesMatch: "5/6 match", score: 85, sequence: "Warm Outreach, Active", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face" },
{ id: 7, name: "Jessica Liu", title: "Senior Product Designer", company: "Twitter", degree: "Msc Computer Science", university: "MIT", location: "San Francisco, California, United States", experience: "6 years", skillsMatch: "20/23 match", attributesMatch: "4/6 match", score: 83, sequence: "Cold Outreach, Active", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" },
{ id: 8, name: "Michael Chen", title: "UX/UI Designer", company: "Uber", degree: "BA in Design", university: "Art Center College of Design", location: "San Francisco, California, United States", experience: "4 years", skillsMatch: "18/23 match", attributesMatch: "5/6 match", score: 79, sequence: "Warm Outreach, Active", avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face" },
{ id: 9, name: "Sophie Anderson", title: "Product Designer", company: "Notion", degree: "Msc in Design", university: "Royal College of Art", location: "London, United Kingdom", experience: "5 years", skillsMatch: "21/23 match", attributesMatch: "6/6 match", score: 90, sequence: "Cold Outreach, Active", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face" },
{ id: 10, name: "Ryan Davis", title: "Lead Designer", company: "Dropbox", degree: "BA in Interactive Design", university: "NYU", location: "New York, NY, United States", experience: "9 years", skillsMatch: "19/23 match", attributesMatch: "5/6 match", score: 86, sequence: "Warm Outreach, Active", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face" },
{ id: 11, name: "Olivia Martinez", title: "Senior Product Designer", company: "Spotify", degree: "Msc in Digital Design", university: "University of Washington", location: "Stockholm, Sweden", experience: "7 years", skillsMatch: "22/23 match", attributesMatch: "6/6 match", score: 92, sequence: "Cold Outreach, Active", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face" },
{ id: 12, name: "Lucas Brown", title: "Product Designer", company: "Pinterest", degree: "BA in Design", university: "California College of the Arts", location: "San Francisco, California, United States", experience: "4 years", skillsMatch: "17/23 match", attributesMatch: "4/6 match", score: 76, sequence: "Warm Outreach, Active", avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop&crop=face" },
{ id: 13, name: "Isabella Garcia", title: "UX Designer", company: "LinkedIn", degree: "Msc in User Experience", university: "Georgia Tech", location: "Mountain View, California, United States", experience: "5 years", skillsMatch: "20/23 match", attributesMatch: "5/6 match", score: 84, sequence: "Cold Outreach, Active", avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=100&h=100&fit=crop&crop=face" },
{ id: 14, name: "Noah Wilson", title: "Lead Product Designer", company: "Slack", degree: "BA in Communication Design", university: "Pratt Institute", location: "San Francisco, California, United States", experience: "8 years", skillsMatch: "21/23 match", attributesMatch: "6/6 match", score: 89, sequence: "Warm Outreach, Active", avatar: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=100&h=100&fit=crop&crop=face" },
{ id: 15, name: "Ava Taylor", title: "Product Designer", company: "Asana", degree: "Msc in Design Thinking", university: "Stanford University", location: "San Francisco, California, United States", experience: "6 years", skillsMatch: "19/23 match", attributesMatch: "5/6 match", score: 81, sequence: "Cold Outreach, Active", avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop&crop=face" },
{ id: 16, name: "Ethan Robinson", title: "Senior UX Designer", company: "Salesforce", degree: "BA in Visual Communication", university: "Columbia University", location: "San Francisco, California, United States", experience: "7 years", skillsMatch: "18/23 match", attributesMatch: "4/6 match", score: 80, sequence: "Warm Outreach, Active", avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100&h=100&fit=crop&crop=face" },
{ id: 17, name: "Mia White", title: "Product Designer", company: "Square", degree: "Msc in Interaction Design", university: "University of Michigan", location: "San Francisco, California, United States", experience: "5 years", skillsMatch: "20/23 match", attributesMatch: "5/6 match", score: 87, sequence: "Cold Outreach, Active", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face" },
{ id: 18, name: "James Lee", title: "Design Lead", company: "Zoom", degree: "BA in Digital Media", university: "University of Southern California", location: "San Jose, California, United States", experience: "8 years", skillsMatch: "19/23 match", attributesMatch: "5/6 match", score: 83, sequence: "Warm Outreach, Active", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" }];


const pipelineCandidates = [
{ id: 6, name: "Daniel Wright", title: "UX Lead", company: "Meta", score: 96, stage: "Offer", starred: true, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
{ id: 7, name: "Lena Kim", title: "Product Designer II", company: "Google", score: 92, stage: "Final Round", starred: true, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" },
{ id: 8, name: "Marcus Rivera", title: "Sr. Designer", company: "Apple", score: 89, stage: "Technical", starred: false, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face" },
{ id: 9, name: "Emma Collins", title: "Design Manager", company: "Netflix", score: 85, stage: "Interview", starred: false, avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face" }];


export default function CandidateList({ activeTab, viewMode = "card" }) {
  const candidates = activeTab === "review" ? reviewCandidates : pipelineCandidates;
  const [isSourcingExpanded, setIsSourcingExpanded] = useState(false);
  const [sourcingInput, setSourcingInput] = useState("");
  const [sourcingTab, setSourcingTab] = useState("ai");
  const [showInsightsScreen, setShowInsightsScreen] = useState(true);
  const [jobTitles, setJobTitles] = useState(["Product Designer", "UX Designer"]);
  const [companies, setCompanies] = useState(["Google", "Meta"]);
  const [industries, setIndustries] = useState(["Technology", "SaaS"]);
  const [skills, setSkills] = useState(["Figma", "Sketch", "Design Systems"]);
  const [degrees, setDegrees] = useState(["Bachelor in Design", "Master in HCI"]);
  const [universities, setUniversities] = useState(["Stanford", "MIT"]);

  const aiSuggestions = {
    jobTitles: ["Visual Designer", "Interaction Designer", "Design Manager", "UI Designer", "Creative Director"],
    companies: ["Apple", "Figma", "Airbnb", "Notion", "Spotify", "Stripe"],
    industries: ["FinTech", "EdTech", "HealthTech", "E-Commerce", "Media"],
    skills: ["Prototyping", "User Research", "Wireframing", "Adobe XD", "InVision", "Accessibility"],
    degrees: ["MFA in Design", "BA in Fine Arts", "BS in Computer Science", "MA in Communication Design"],
    universities: ["RISD", "Parsons", "Carnegie Mellon", "SVA", "Pratt Institute"]
  };

  const setterMap = { jobTitles: setJobTitles, companies: setCompanies, industries: setIndustries, skills: setSkills, degrees: setDegrees, universities: setUniversities };
  const stateMap = { jobTitles, companies, industries, skills, degrees, universities };

  const handleAISuggest = (stateKey) => {
    const suggestions = aiSuggestions[stateKey] || [];
    const current = stateMap[stateKey];
    const newItems = suggestions.filter((s) => !current.includes(s)).slice(0, 3);
    setterMap[stateKey]((prev) => [...prev, ...newItems]);
  };

  const handleRemoveChip = (stateKey, idx) => {
    setterMap[stateKey]((prev) => prev.filter((_, i) => i !== idx));
  };

  const [addingField, setAddingField] = useState(null); // stateKey of field being added
  const [addingInput, setAddingInput] = useState("");

  const allSuggestionPool = {
    jobTitles: ["Product Designer", "UX Designer", "Visual Designer", "Interaction Designer", "Design Manager", "UI Designer", "Creative Director", "Brand Designer", "Motion Designer", "Design Lead"],
    companies: ["Google", "Meta", "Apple", "Figma", "Airbnb", "Notion", "Spotify", "Stripe", "Uber", "Netflix", "Dropbox", "Slack"],
    industries: ["Technology", "SaaS", "FinTech", "EdTech", "HealthTech", "E-Commerce", "Media", "Gaming", "Consulting", "Retail"],
    skills: ["Figma", "Sketch", "Design Systems", "Prototyping", "User Research", "Wireframing", "Adobe XD", "InVision", "Accessibility", "Motion Design", "HTML/CSS"],
    degrees: ["Bachelor in Design", "Master in HCI", "MFA in Design", "BA in Fine Arts", "BS in Computer Science", "MA in Communication Design", "BFA in Graphic Design"],
    universities: ["Stanford", "MIT", "RISD", "Parsons", "Carnegie Mellon", "SVA", "Pratt Institute", "NYU", "UC Berkeley", "Georgia Tech"]
  };

  const getDropdownOptions = (stateKey, input) => {
    if (!input.trim()) return [];
    const current = stateMap[stateKey];
    return (allSuggestionPool[stateKey] || []).filter(
      (s) => s.toLowerCase().includes(input.toLowerCase()) && !current.includes(s)
    );
  };

  const handleAddChip = (stateKey, value) => {
    if (!value.trim()) return;
    setterMap[stateKey]((prev) => prev.includes(value) ? prev : [...prev, value]);
    setAddingField(null);
    setAddingInput("");
  };
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sourcedCandidates, setSourcedCandidates] = useState([]);
  const [selectedSourced, setSelectedSourced] = useState(new Set());

  const isPipeline = activeTab === "pipeline";

  const handleCandidateClick = (candidate) => {
    setSelectedCandidate(candidate);
    setIsDrawerOpen(true);
  };

  const handleSendSourcingPrompt = () => {
    if (!sourcingInput.trim()) return;
    // Simulate AI sourcing - sample 5 random candidates
    const sampled = reviewCandidates.sort(() => Math.random() - 0.5).slice(0, 5);
    setSourcedCandidates(sampled);
    setSelectedSourced(new Set());
    setSourcingInput("");
  };

  const toggleSourcedCandidate = (id) => {
    const updated = new Set(selectedSourced);
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setSelectedSourced(updated);
  };

  return (
    <div className="px-8 py-0">
      {/* Sourcing Card - Only show in Review tab */}
      {activeTab === "review" &&
      <div className="bg-white my-5 rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300">
          {/* Header */}
          <div className="px-5 pt-4 pb-7 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="bg-blue-50 rounded-[28px] w-7 h-7 flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              </div>
              <div>
                <h3 className="text-[13px] font-semibold text-gray-800">AI Sourcing</h3>
                <p className="text-[11px] text-gray-400">Find candidates with AI assistance</p>
              </div>
            </div>
            <button
            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
            onClick={() => {
              const next = !isSourcingExpanded;
              setIsSourcingExpanded(next);
              if (next) setShowInsightsScreen(true);
            }}>
              {isSourcingExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Inline chatbox - shown when collapsed */}
          {!isSourcingExpanded &&
        <div className="px-5 pb-4">
            <div className="relative">
              <input
              type="text"
              value={sourcingInput}
              onChange={(e) => setSourcingInput(e.target.value)}
              onKeyDown={(e) => {if (e.key === "Enter" && sourcingInput.trim()) setIsSourcingExpanded(true);}}
              placeholder="e.g. Senior product designers in San Francisco with Figma experience…"
              className="w-full text-[12px] bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 pr-10 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-200 focus:border-indigo-200 transition-colors" />
            
              <button
              onClick={() => {if (sourcingInput.trim()) setIsSourcingExpanded(true);}}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        }

          {/* Expanded workspace */}
          {isSourcingExpanded &&
        <div className="border-t border-gray-50">
            {/* Insights screen */}
            {showInsightsScreen &&
          <div className="px-5 py-4 h-[520px] overflow-y-auto">
              <CandidateFitInsights
              onViewInsights={() => {}}
              onSkip={() => setShowInsightsScreen(false)} />
            </div>
          }

            {/* Sub Tabs */}
            {!showInsightsScreen &&
          <div className="pr-5 pb-4 pl-5 flex flex-col items-center h-[520px] gap-4">
              <div className="bg-gray-100 mx-auto p-2.5 rounded-xl flex gap-0.5 w-full">
                <button
                onClick={() => setSourcingTab("ai")} className="flex-1 px-4 py-2 text-[12px] font-medium rounded-lg transition-all bg-white text-gray-900 shadow-sm">
                
                  Talk to AI
                </button>
                <button
                onClick={() => setSourcingTab("manual")}
                className={`flex-1 px-4 py-1.5 text-[12px] font-medium rounded-lg transition-all ${sourcingTab === "manual" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                  Manual Sourcing
                </button>
              </div>

              {/* Talk to AI Tab */}
              {sourcingTab === "ai" &&
            <div className="flex flex-col w-full flex-1 min-h-0">
                <div className="flex-1 overflow-y-auto pr-1 space-y-2 mb-3">
                  <div className="flex gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3 text-indigo-400" />
                    </div>
                    <div className="bg-gray-50 rounded-xl rounded-tl-none px-3.5 py-2.5 max-w-[85%]">
                      <p className="text-[12px] text-gray-600 leading-relaxed">I can help you source candidates from LinkedIn, GitHub, or your talent pool. What would you like me to do?</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 justify-end">
                    <div className="bg-blue-600 rounded-xl rounded-tr-none px-3.5 py-2.5 max-w-[75%]">
                      <p className="text-[12px] text-white leading-relaxed">Find me 10 senior product designers in San Francisco</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3 text-indigo-400" />
                    </div>
                    <div className="bg-gray-50 rounded-xl rounded-tl-none px-3.5 py-2.5 max-w-[85%]">
                      <p className="text-[12px] text-gray-600 leading-relaxed">I found 15 candidates matching your criteria. Would you like me to screen them for Figma experience and portfolio quality?</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0">
                  <Textarea
                  value={sourcingInput}
                  onChange={(e) => setSourcingInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.ctrlKey && sourcingInput.trim()) {
                      handleSendSourcingPrompt();
                    }
                  }}
                  placeholder="Type your message…" className="flex border px-3 py-6 shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-gray-50 border-gray-100 text-[12px] rounded-xl min-h-[60px] w-full resize-none pr-12 focus-visible:ring-indigo-200"

                  rows={2} />
                  <Button
                  size="icon" className="bg-blue-600 text-primary-foreground text-sm font-medium rounded-[32px] inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-blue-600 absolute right-2 bottom-2 h-9 w-9 shadow-none"

                  onClick={handleSendSourcingPrompt}>
                    <Send className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            }

              {/* Manual Sourcing Tab */}
              {sourcingTab === "manual" &&
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 w-full">
                {[
              { title: "Experience", sections: [
                { label: "Similar Job Titles", stateKey: "jobTitles", items: jobTitles, color: "bg-indigo-50 text-indigo-600" },
                { label: "Similar Companies", stateKey: "companies", items: companies, color: "bg-indigo-50 text-indigo-600" },
                { label: "Similar Industries", stateKey: "industries", items: industries, color: "bg-indigo-50 text-indigo-600" }]
              },
              { title: "Skills", sections: [
                { label: null, stateKey: "skills", items: skills, color: "bg-emerald-50 text-emerald-600" }]
              },
              { title: "Education", sections: [
                { label: "Similar Degrees", stateKey: "degrees", items: degrees, color: "bg-blue-50 text-blue-600" },
                { label: "Similar Universities", stateKey: "universities", items: universities, color: "bg-blue-50 text-blue-600" }]
              }].
              map(({ title, sections }) =>
              <div key={title} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[12px] font-semibold text-gray-700">{title}</p>
                    </div>
                    <div className="space-y-2.5">
                      {sections.map(({ label, stateKey, items, color }) =>
                  <div key={stateKey}>
                          {label && <p className="text-[11px] text-gray-400 mb-1.5">{label}</p>}
                          <div className="flex flex-wrap gap-1.5">
                            {items.map((item, idx) =>
                      <span key={idx} className={`flex items-center gap-1 text-[11px] font-medium pl-2.5 pr-1.5 py-1 rounded-lg ${color}`}>
                        {item}
                        <button onClick={() => handleRemoveChip(stateKey, idx)} className="opacity-60 hover:opacity-100 transition-opacity ml-0.5">
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </span>
                      )}
                            {addingField === stateKey ?
                      <div className="relative">
                                <input
                          autoFocus
                          value={addingInput}
                          onChange={(e) => setAddingInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleAddChip(stateKey, addingInput);
                            if (e.key === "Escape") {setAddingField(null);setAddingInput("");}
                          }}
                          placeholder="Type to search…"
                          className="text-[11px] px-2.5 py-1 rounded-lg border border-indigo-300 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-300 w-36" />
                        
                                {getDropdownOptions(stateKey, addingInput).length > 0 &&
                        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1 min-w-[160px]">
                                    {getDropdownOptions(stateKey, addingInput).map((opt) =>
                          <button
                            key={opt}
                            onMouseDown={() => handleAddChip(stateKey, opt)}
                            className="w-full text-left px-3 py-1.5 text-[11px] text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                            
                                        {opt}
                                      </button>
                          )}
                                  </div>
                        }
                              </div> :

                      <button onClick={() => {setAddingField(stateKey);setAddingInput("");}} className="text-[11px] text-gray-400 hover:text-gray-600 px-2 py-1 rounded-lg border border-dashed border-gray-200 hover:border-gray-300 transition-colors">+ Add</button>
                      }
                            <button onClick={() => handleAISuggest(stateKey)} className="flex items-center gap-1 text-[11px] text-indigo-500 hover:text-indigo-700 font-medium px-2 py-1 rounded-lg border border-dashed border-indigo-200 hover:border-indigo-300 transition-colors"><Sparkles className="w-3 h-3" /> AI Suggest</button>
                          </div>
                        </div>
                  )}
                    </div>
                  </div>
              )}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-[12px] font-semibold text-gray-700 mb-3">Other Attributes</p>
                  <button className="text-[11px] text-gray-400 hover:text-gray-600 px-3 py-1.5 rounded-lg border border-dashed border-gray-200 hover:border-gray-300 transition-colors">+ Add Custom Attribute</button>
                </div>
                <Button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 px-4 py-2 w-full bg-blue-600 hover:bg-indigo-600 text-white text-[13px] rounded-xl h-9 shadow-none">Start Sourcing</Button>
              </div>
            }
            </div>
          }
          </div>
        }
        </div>
      }

            {/* Sourced Candidates Section */}
            {sourcedCandidates.length > 0 &&
      <div className="bg-white my-5 rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 flex items-center justify-between border-b border-gray-50">
          <div>
            <h2 className="text-[13px] font-semibold text-gray-800">Sourced Candidates</h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <p className="text-[11px] text-gray-400">{sourcedCandidates.length * 100} matches found</p>
            </div>
          </div>
          <button className="text-[12px] font-medium text-indigo-500 hover:text-indigo-700 transition-colors">
            Apply All
          </button>
        </div>

        <div className="divide-y divide-gray-50">
          {sourcedCandidates.map((candidate) =>
          <div key={candidate.id} className="px-5 py-4 flex items-center gap-4 hover:bg-gray-50/60 transition-colors">
            <input
              type="checkbox"
              checked={selectedSourced.has(candidate.id)}
              onChange={() => toggleSourcedCandidate(candidate.id)}
              className="w-4 h-4 accent-indigo-500 cursor-pointer shrink-0" />
            <img
              src={candidate.avatar}
              alt={candidate.name}
              className="w-10 h-10 rounded-full object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-[13px] font-semibold text-gray-900">{candidate.name}</p>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">{candidate.score}%</span>
              </div>
              <p className="text-[11px] text-gray-500">{candidate.title} · {candidate.company}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{candidate.experience} · {candidate.skillsMatch}</p>
            </div>
            <button
              onClick={() => toggleSourcedCandidate(candidate.id)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
              selectedSourced.has(candidate.id) ?
              "bg-indigo-50 text-indigo-600" :
              "text-gray-500 border border-gray-200 hover:border-indigo-200 hover:text-indigo-500"}`
              }>
              {selectedSourced.has(candidate.id) ? "✓ Added" : "Add"}
            </button>
          </div>
          )}
        </div>

        {selectedSourced.size > 0 &&
        <div className="px-5 py-3 border-t border-gray-50 flex justify-end gap-2">
          <button
            onClick={() => setSelectedSourced(new Set())}
            className="px-3 py-1.5 text-[12px] font-medium text-gray-500 hover:text-gray-700 transition-colors">
            Clear
          </button>
          <Button className="bg-indigo-500 hover:bg-indigo-600 text-white text-[12px] h-8 rounded-lg shadow-none">
            Add {selectedSourced.size} to Prospects
          </Button>
        </div>
        }
      </div>
      }

            {/* Card/List/Table View */}
      {viewMode === "card" &&
      <div className="flex flex-col gap-3">
          {candidates.map((candidate) =>
        <CandidateCardDetailed
          key={candidate.id}
          candidate={candidate}
          isPipeline={isPipeline}
          onClick={() => handleCandidateClick(candidate)} />

        )}
        </div>
      }

      {viewMode === "list" &&
      <div className="flex flex-col gap-2">
          {candidates.map((candidate) =>
        <div key={candidate.id} className="flex items-center justify-between px-4 py-3 rounded-lg bg-white border border-gray-200 hover:shadow-sm transition-all">
              <div className="flex items-center gap-3">
                <img src={candidate.avatar} alt={candidate.name} className="w-9 h-9 rounded-full" />
                <div>
                  <p className="text-[13px] font-semibold text-gray-900">{candidate.name}</p>
                  <p className="text-[11px] text-gray-500">{candidate.title} @ {candidate.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[11px] text-gray-500">{candidate.experience}</span>
                <span className="text-[11px] text-gray-500">{candidate.skillsMatch}</span>
                <span className="px-2 py-1 text-[11px] font-bold rounded-md bg-emerald-50 text-emerald-600">{candidate.score}%</span>
              </div>
            </div>
        )}
        </div>
      }

      {viewMode === "table" &&
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Candidate</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Stage</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Experience</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Skills</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {candidates.map((candidate) =>
            <tr key={candidate.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={candidate.avatar} alt={candidate.name} className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="text-[12px] font-semibold text-gray-900">{candidate.name}</p>
                        <p className="text-[11px] text-gray-500">{candidate.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-[10px] font-semibold rounded-full bg-violet-50 text-violet-600 uppercase">{candidate.stage}</span>
                  </td>
                  <td className="px-4 py-3 text-[12px] text-gray-600">{candidate.experience}</td>
                  <td className="px-4 py-3 text-[12px] text-gray-600">{candidate.skillsMatch}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-[11px] font-bold rounded-md bg-emerald-50 text-emerald-600">{candidate.score}%</span>
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
      }

      {/* Candidate Details Drawer */}
      <CandidateDetailsDrawer
        candidate={selectedCandidate}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)} />

    </div>);

}