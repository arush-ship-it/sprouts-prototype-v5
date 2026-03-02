import React, { useState } from "react";
import CandidateCardDetailed from "./CandidateCardDetailed";
import CandidateDetailsDrawer from "./CandidateDetailsDrawer";
import { Search, SlidersHorizontal, Sparkles, ChevronDown, ChevronUp, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

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
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
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
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
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
  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
},
{
  id: 4,
  name: "Alex Thompson",
  title: "Senior UX Designer",
  company: "Adobe",
  degree: "BA in Visual Design",
  university: "Rhode Island School of Design",
  location: "Seattle, Washington, United States",
  experience: "7 years",
  skillsMatch: "21/23 match",
  attributesMatch: "6/6 match",
  score: 91,
  sequence: "Warm Outreach, Active",
  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
},
{
  id: 5,
  name: "Emily Rodriguez",
  title: "Product Designer",
  company: "Figma",
  degree: "Msc in HCI",
  university: "Carnegie Mellon University",
  location: "San Francisco, California, United States",
  experience: "5 years",
  skillsMatch: "22/23 match",
  attributesMatch: "5/6 match",
  score: 88,
  sequence: "Cold Outreach, Active",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
},
{
  id: 6,
  name: "David Park",
  title: "Design Lead",
  company: "Shopify",
  degree: "BA in Graphic Design",
  university: "Parsons School of Design",
  location: "Toronto, Ontario, Canada",
  experience: "8 years",
  skillsMatch: "19/23 match",
  attributesMatch: "5/6 match",
  score: 85,
  sequence: "Warm Outreach, Active",
  avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face"
},
{
  id: 7,
  name: "Jessica Liu",
  title: "Senior Product Designer",
  company: "Twitter",
  degree: "Msc Computer Science",
  university: "MIT",
  location: "San Francisco, California, United States",
  experience: "6 years",
  skillsMatch: "20/23 match",
  attributesMatch: "4/6 match",
  score: 83,
  sequence: "Cold Outreach, Active",
  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
},
{
  id: 8,
  name: "Michael Chen",
  title: "UX/UI Designer",
  company: "Uber",
  degree: "BA in Design",
  university: "Art Center College of Design",
  location: "San Francisco, California, United States",
  experience: "4 years",
  skillsMatch: "18/23 match",
  attributesMatch: "5/6 match",
  score: 79,
  sequence: "Warm Outreach, Active",
  avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face"
},
{
  id: 9,
  name: "Sophie Anderson",
  title: "Product Designer",
  company: "Notion",
  degree: "Msc in Design",
  university: "Royal College of Art",
  location: "London, United Kingdom",
  experience: "5 years",
  skillsMatch: "21/23 match",
  attributesMatch: "6/6 match",
  score: 90,
  sequence: "Cold Outreach, Active",
  avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
},
{
  id: 10,
  name: "Ryan Davis",
  title: "Lead Designer",
  company: "Dropbox",
  degree: "BA in Interactive Design",
  university: "NYU",
  location: "New York, NY, United States",
  experience: "9 years",
  skillsMatch: "19/23 match",
  attributesMatch: "5/6 match",
  score: 86,
  sequence: "Warm Outreach, Active",
  avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face"
},
{
  id: 11,
  name: "Olivia Martinez",
  title: "Senior Product Designer",
  company: "Spotify",
  degree: "Msc in Digital Design",
  university: "University of Washington",
  location: "Stockholm, Sweden",
  experience: "7 years",
  skillsMatch: "22/23 match",
  attributesMatch: "6/6 match",
  score: 92,
  sequence: "Cold Outreach, Active",
  avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face"
},
{
  id: 12,
  name: "Lucas Brown",
  title: "Product Designer",
  company: "Pinterest",
  degree: "BA in Design",
  university: "California College of the Arts",
  location: "San Francisco, California, United States",
  experience: "4 years",
  skillsMatch: "17/23 match",
  attributesMatch: "4/6 match",
  score: 76,
  sequence: "Warm Outreach, Active",
  avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop&crop=face"
},
{
  id: 13,
  name: "Isabella Garcia",
  title: "UX Designer",
  company: "LinkedIn",
  degree: "Msc in User Experience",
  university: "Georgia Tech",
  location: "Mountain View, California, United States",
  experience: "5 years",
  skillsMatch: "20/23 match",
  attributesMatch: "5/6 match",
  score: 84,
  sequence: "Cold Outreach, Active",
  avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=100&h=100&fit=crop&crop=face"
},
{
  id: 14,
  name: "Noah Wilson",
  title: "Lead Product Designer",
  company: "Slack",
  degree: "BA in Communication Design",
  university: "Pratt Institute",
  location: "San Francisco, California, United States",
  experience: "8 years",
  skillsMatch: "21/23 match",
  attributesMatch: "6/6 match",
  score: 89,
  sequence: "Warm Outreach, Active",
  avatar: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=100&h=100&fit=crop&crop=face"
},
{
  id: 15,
  name: "Ava Taylor",
  title: "Product Designer",
  company: "Asana",
  degree: "Msc in Design Thinking",
  university: "Stanford University",
  location: "San Francisco, California, United States",
  experience: "6 years",
  skillsMatch: "19/23 match",
  attributesMatch: "5/6 match",
  score: 81,
  sequence: "Cold Outreach, Active",
  avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop&crop=face"
},
{
  id: 16,
  name: "Ethan Robinson",
  title: "Senior UX Designer",
  company: "Salesforce",
  degree: "BA in Visual Communication",
  university: "Columbia University",
  location: "San Francisco, California, United States",
  experience: "7 years",
  skillsMatch: "18/23 match",
  attributesMatch: "4/6 match",
  score: 80,
  sequence: "Warm Outreach, Active",
  avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100&h=100&fit=crop&crop=face"
},
{
  id: 17,
  name: "Mia White",
  title: "Product Designer",
  company: "Square",
  degree: "Msc in Interaction Design",
  university: "University of Michigan",
  location: "San Francisco, California, United States",
  experience: "5 years",
  skillsMatch: "20/23 match",
  attributesMatch: "5/6 match",
  score: 87,
  sequence: "Cold Outreach, Active",
  avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face"
},
{
  id: 18,
  name: "James Lee",
  title: "Design Lead",
  company: "Zoom",
  degree: "BA in Digital Media",
  university: "University of Southern California",
  location: "San Jose, California, United States",
  experience: "8 years",
  skillsMatch: "19/23 match",
  attributesMatch: "5/6 match",
  score: 83,
  sequence: "Warm Outreach, Active",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
}];


const pipelineCandidates = [
{
  id: 6,
  name: "Daniel Wright",
  title: "UX Lead",
  company: "Meta",
  score: 96,
  stage: "Offer",
  starred: true,
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
},
{
  id: 7,
  name: "Lena Kim",
  title: "Product Designer II",
  company: "Google",
  score: 92,
  stage: "Final Round",
  starred: true,
  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
},
{
  id: 8,
  name: "Marcus Rivera",
  title: "Sr. Designer",
  company: "Apple",
  score: 89,
  stage: "Technical",
  starred: false,
  avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face"
},
{
  id: 9,
  name: "Emma Collins",
  title: "Design Manager",
  company: "Netflix",
  score: 85,
  stage: "Interview",
  starred: false,
  avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
}];


export default function CandidateList({ activeTab, viewMode = "card" }) {
  const candidates =
  activeTab === "review" ? reviewCandidates : pipelineCandidates;
  const [isSourcingExpanded, setIsSourcingExpanded] = useState(false);
  const [sourcingInput, setSourcingInput] = useState("");
  const [sourcingTab, setSourcingTab] = useState("ai");
  const [jobTitles, setJobTitles] = useState(["Product Designer", "UX Designer"]);
  const [companies, setCompanies] = useState(["Google", "Meta"]);
  const [industries, setIndustries] = useState(["Technology", "SaaS"]);
  const [skills, setSkills] = useState(["Figma", "Sketch", "Design Systems"]);
  const [degrees, setDegrees] = useState(["Bachelor in Design", "Master in HCI"]);
  const [universities, setUniversities] = useState(["Stanford", "MIT"]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isPipeline = activeTab === "pipeline";

  const handleCandidateClick = (candidate) => {
    setSelectedCandidate(candidate);
    setIsDrawerOpen(true);
  };

  return (
    <div className="px-6 py-2">
      {/* Sourcing Card - Only show in Review tab */}
      {activeTab === "review" &&
      <div className="bg-white mb-5 p-5 rounded-[20px] border border-indigo-200 transition-all duration-300">


          <div className="flex items-start justify-between">
            <div className="py-2 flex items-center gap-2.5 flex-1">
              <div className="bg-slate-400 rounded-[32px] w-8 h-8 from-indigo-500 to-violet-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[13px] font-semibold text-gray-900">
                  {isSourcingExpanded ? "AI Sourcing Assistant" : "AI Sourcing - Click to Expand"}
                </h3>
                


              </div>
            </div>
            <Button
            variant="ghost"
            size="sm"
            className="h-7"
            onClick={() => setIsSourcingExpanded(!isSourcingExpanded)}>

              {isSourcingExpanded ?
            <ChevronUp className="w-3.5 h-3.5" /> :

            <ChevronDown className="w-3.5 h-3.5" />
            }
            </Button>
          </div>

          {/* Inline chatbox - always visible when collapsed */}
          {!isSourcingExpanded &&
        <div className="relative mt-3">
            <input
            type="text"
            value={sourcingInput}
            onChange={(e) => setSourcingInput(e.target.value)}
            onKeyDown={(e) => {if (e.key === "Enter" && sourcingInput.trim()) {setIsSourcingExpanded(true);}}}
            placeholder="Type a sourcing prompt and press Enter..." className="bg-[#ffffff] text-[12px] pr-10 px-4 py-2.5 rounded-xl w-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300 placeholder:text-gray-400" />


            <button
            onClick={() => {if (sourcingInput.trim()) setIsSourcingExpanded(true);}}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors">
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        }

          {isSourcingExpanded &&
        <div className="mt-4 space-y-4">
              {/* Sub Tabs */}
              <div className="bg-gray-100 p-1 rounded-full inline-flex">
                <button
              onClick={() => setSourcingTab("ai")}
              className={`px-4 py-2 text-[12px] font-semibold rounded-full transition-all ${
              sourcingTab === "ai" ?
              "bg-white text-gray-900 shadow-sm" :
              "text-gray-600 hover:text-gray-900"}`
              }>
                  Talk to AI
                </button>
                <button
              onClick={() => setSourcingTab("manual")}
              className={`px-4 py-2 text-[12px] font-semibold rounded-full transition-all ${
              sourcingTab === "manual" ?
              "bg-white text-gray-900 shadow-sm" :
              "text-gray-600 hover:text-gray-900"}`
              }>
                  Manual Sourcing
                </button>
              </div>

              {/* Talk to AI Tab */}
              {sourcingTab === "ai" &&
          <div className="space-y-3">
                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    <div className="p-3 rounded-lg bg-white/60 border border-indigo-100">
                      <p className="text-[11px] text-gray-700">
                        <strong>AI:</strong> I can help you source candidates from LinkedIn, GitHub, or your talent pool. What would you like me to do?
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-indigo-100/60 border border-indigo-200 ml-12">
                      <p className="text-[11px] text-gray-700">
                        <strong>You:</strong> Find me 10 senior product designers in San Francisco
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/60 border border-indigo-100">
                      <p className="text-[11px] text-gray-700">
                        <strong>AI:</strong> I found 15 candidates matching your criteria. Would you like me to screen them for Figma experience and portfolio quality?
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <Textarea
                value={sourcingInput}
                onChange={(e) => setSourcingInput(e.target.value)}
                placeholder="Type your message..." className="bg-white text-[12px] pr-12 px-3 py-2 rounded-2xl flex min-h-[60px] w-full border border-input shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"

                rows={2} />
                    <Button size="icon" className="bg-blue-600 text-primary-foreground text-sm font-medium rounded-[28px] inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow hover:bg-primary/90 absolute right-2 bottom-2 h-8 w-8">
                      <Send className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
          }

              {/* Manual Sourcing Tab */}
              {sourcingTab === "manual" &&
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {/* Experience */}
                  <div className="p-4 rounded-lg bg-white border border-indigo-100">
                    <h4 className="text-[13px] font-semibold text-gray-900 mb-3">Experience</h4>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-[11px] font-medium text-gray-700">Similar Job Titles</label>
                          <Button variant="ghost" size="sm" className="h-6 text-[10px] text-indigo-600">
                            <Sparkles className="w-3 h-3 mr-1" />
                            AI Generate
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {jobTitles.map((title, idx) =>
                    <Badge key={idx} variant="secondary" className="text-[10px] bg-indigo-50 text-indigo-700">
                              {title}
                            </Badge>
                    )}
                          <Button variant="outline" size="sm" className="h-5 px-2 text-[10px]">+ Add</Button>
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-gray-700 block mb-2">Similar Companies</label>
                        <div className="flex flex-wrap gap-1.5">
                          {companies.map((company, idx) =>
                    <Badge key={idx} variant="secondary" className="text-[10px] bg-indigo-50 text-indigo-700">
                              {company}
                            </Badge>
                    )}
                          <Button variant="outline" size="sm" className="h-5 px-2 text-[10px]">+ Add</Button>
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-gray-700 block mb-2">Similar Industries</label>
                        <div className="flex flex-wrap gap-1.5">
                          {industries.map((industry, idx) =>
                    <Badge key={idx} variant="secondary" className="text-[10px] bg-indigo-50 text-indigo-700">
                              {industry}
                            </Badge>
                    )}
                          <Button variant="outline" size="sm" className="h-5 px-2 text-[10px]">+ Add</Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="p-4 rounded-lg bg-white border border-indigo-100">
                    <h4 className="text-[13px] font-semibold text-gray-900 mb-3">Similar Skills</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.map((skill, idx) =>
                <Badge key={idx} variant="secondary" className="text-[10px] bg-emerald-50 text-emerald-700">
                          {skill}
                        </Badge>
                )}
                      <Button variant="outline" size="sm" className="h-5 px-2 text-[10px]">+ Add</Button>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="p-4 rounded-lg bg-white border border-indigo-100">
                    <h4 className="text-[13px] font-semibold text-gray-900 mb-3">Education</h4>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] font-medium text-gray-700 block mb-2">Similar Degrees</label>
                        <div className="flex flex-wrap gap-1.5">
                          {degrees.map((degree, idx) =>
                    <Badge key={idx} variant="secondary" className="text-[10px] bg-blue-50 text-blue-700">
                              {degree}
                            </Badge>
                    )}
                          <Button variant="outline" size="sm" className="h-5 px-2 text-[10px]">+ Add</Button>
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-gray-700 block mb-2">Similar Universities</label>
                        <div className="flex flex-wrap gap-1.5">
                          {universities.map((uni, idx) =>
                    <Badge key={idx} variant="secondary" className="text-[10px] bg-blue-50 text-blue-700">
                              {uni}
                            </Badge>
                    )}
                          <Button variant="outline" size="sm" className="h-5 px-2 text-[10px]">+ Add</Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Other Attributes */}
                  <div className="p-4 rounded-lg bg-white border border-indigo-100">
                    <h4 className="text-[13px] font-semibold text-gray-900 mb-3">Other Attributes</h4>
                    <Button variant="outline" size="sm" className="h-7 text-[11px]">
                      + Add Custom Attribute
                    </Button>
                  </div>

                  <Button className="w-full">
                    Start Sourcing
                  </Button>
                </div>
          }
            </div>
        }
        </div>
      }

      {/* Search / Filter bar */}
      














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