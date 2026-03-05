import React, { useState } from "react";
import { Sparkles, User, RefreshCw, ChevronDown, ChevronUp, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

export default function AITalentFinderPanel() {
  const [activeMode, setActiveMode] = useState("ai"); // 'ai' or 'manual'
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [inputMessage, setInputMessage] = useState("");

  const [conversation, setConversation] = useState([
  {
    role: "ai",
    content: "Perfect ! all the filters have been applied, and are visible in the above panel. What other filters can SproutsAI help you with?",
    categories: ["Skills", "Education", "Experience", "Attributes"]
  }]
  );

  const [appliedFilters] = useState({
    skills: ["Java", "Python"],
    education: {
      degree: "Masters (34)",
      institutions: [
      { name: "Harvard (2)", checked: true },
      { name: "Brown University (8)", checked: true },
      { name: "Cornell University (3)", checked: true },
      { name: "MIT (1)", checked: true },
      { name: "Caltech (11)", checked: true },
      { name: "Stanford University (6)", checked: true },
      { name: "Ucla (5)", checked: true },
      { name: "USC (8)", checked: true }]

    },
    jobTitles: {
      primary: "Software Engineer (34)",
      similar: ["Lead Engineer (2)", "Full Stack Engineer (8)", "Principal Engineer (3)"]
    },
    attributes: [
    { name: "Stability", checked: true },
    { name: "Career Growth", checked: true },
    { name: "Startup Experience", checked: true },
    { name: "Open To A New Role", checked: false },
    { name: "Seniority Filter", checked: false }]

  });

  return (
    <div className="bg-white mx-4 my-4 rounded-2xl w-[483px] border-r border-gray-200 flex flex-col h-full overflow-hidden">
      {/* Top Tabs */}
      <div className="px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-slate-100 px-1 py-1 rounded-[10px] flex gap-1">
            <button
              onClick={() => setActiveMode("ai")} className="bg-[#ffffff] text-gray-900 px-4 py-2 text-xs font-medium rounded-lg transition-colors">






              Create With Ai
            </button>
            <button
              onClick={() => setActiveMode("manual")} className="text-gray-400 px-4 py-2 text-xs font-normal transition-colors hover:text-gray-600">






              Edit Manually
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <RefreshCw className="w-4 h-4 text-gray-500" />
            </Button>
            


          </div>
        </div>

        {/* Active Filters Section */}
        <div className="bg-[#ffffff] px-4 py-3 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"

        onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[14px] font-semibold text-gray-900">
                Active Filters (+7)
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Last Updated 14:08 12/08/25
              </p>
            </div>
            {isFiltersExpanded ?
            <ChevronUp className="w-4 h-4 text-gray-400" /> :

            <ChevronDown className="w-4 h-4 text-gray-400" />
            }
          </div>
        </div>
      </div>

      {/* AI Powered Filters Section */}
      <div className="flex-1 overflow-y-auto">
        











        {/* Conversation Area */}
        <div className="px-5 py-4 space-y-4">
          {/* Example User Message */}
          <div className="flex justify-end gap-2">
            <div className="bg-gray-100 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]">
              <p className="text-[13px] text-gray-900">
                Should have Java, python, in a lead position, with at computer science degree
              </p>
            </div>
            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-gray-600" />
            </div>
          </div>

          {/* AI Response with Skills */}
          <div className="flex gap-2">
            <div className="bg-slate-300 rounded-full w-7 h-7 from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-[13px] text-gray-700 mb-3">
                Ok so the following filters have been added.
              </p>
              
              {/* Skills Section */}
              <div className="bg-white mr-8 mb-3 pt-4 pr-4 pb-4 pl-4 rounded-xl border border-gray-200">
                <h4 className="text-[13px] font-semibold text-gray-900 mb-3">Skills</h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {appliedFilters.skills.map((skill, idx) =>
                  <Badge key={idx} className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px]">
                      ✓ {skill}
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Button variant="outline" size="sm" className="h-7 text-[11px] gap-1">
                    <Sparkles className="w-3 h-3" />
                    Optimise For Frontend Skills
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 text-[11px] gap-1">
                    <Sparkles className="w-3 h-3" />
                    Add All Preffered Skills
                  </Button>
                </div>
                <Button variant="outline" size="sm" className="h-7 text-[11px]">
                  Show All Skills
                </Button>

                {/* Education Section */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="text-[13px] font-semibold text-gray-900 mb-3">Education</h4>
                  <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px] mb-3">
                    ✓ Computer Science
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-7 text-[11px] gap-1">
                      <Sparkles className="w-3 h-3" />
                      Find Similair Degrees
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 text-[11px]">
                      Show All Degrees
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button size="sm" className="bg-blue-600 text-primary-foreground px-6 text-xs font-medium rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow hover:bg-primary/90 h-8">Apply</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Applied Message */}
          <div className="flex justify-end gap-2">
            <div className="bg-gray-100 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]">
              <p className="text-[13px] text-gray-900">Apply filters</p>
            </div>
            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-gray-600" />
            </div>
          </div>

          {/* Category Pills Response */}
          <div className="flex gap-2">
            <div className="bg-slate-300 rounded-full w-7 h-7 from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-[13px] text-gray-700 mb-3">
                Perfect ! all the filters have been applied, and are visible in the above panel. What other filters can SproutsAI help you with?
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-[11px] bg-gray-100">Skills</Badge>
                <Badge variant="secondary" className="text-[11px] bg-gray-100">Education</Badge>
                <Badge variant="secondary" className="text-[11px] bg-gray-100">Experience</Badge>
                <Badge variant="secondary" className="text-[11px] bg-gray-100">Attributes</Badge>
              </div>
            </div>
          </div>

          {/* Attributes Request */}
          <div className="flex justify-end gap-2">
            <div className="bg-gray-100 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]">
              <p className="text-[13px] text-gray-900">Attributes</p>
            </div>
            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-gray-600" />
            </div>
          </div>

          {/* Attributes Response */}
          <div className="flex gap-2">
            <div className="bg-slate-300 rounded-full w-7 h-7 from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="mr-10 flex-1">
              <p className="text-[13px] text-gray-700 mb-3">
                Alright are there any specific attributes you would like to choose?
              </p>
              
              <div className="bg-white rounded-xl border border-gray-200 p-4 mb-3">
                <div className="space-y-3 mb-4">
                  {appliedFilters.attributes.map((attr, idx) =>
                  <div key={idx} className="flex items-center gap-2">
                      <Checkbox checked={attr.checked} className="rounded" />
                      <label className="text-[13px] text-gray-900">{attr.name}</label>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Button variant="outline" size="sm" className="h-7 text-[11px] gap-1">
                    <Sparkles className="w-3 h-3" />
                    Add All Must Haves
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 text-[11px] gap-1">
                    <Sparkles className="w-3 h-3" />
                    Optimise For Weightage
                  </Button>
                </div>
                <div className="flex justify-end">
                  <Button size="sm" className="bg-blue-600 text-primary-foreground px-6 text-xs font-medium rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow hover:bg-primary/90 h-8">Apply</Button>
                </div>
              </div>
            </div>
          </div>

          {/* PhD Request */}
          <div className="flex justify-end gap-2">
            <div className="bg-gray-100 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]">
              <p className="text-[13px] text-gray-900">
                ok add only candidates with Phd qualifications, from top universities
              </p>
            </div>
            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-gray-600" />
            </div>
          </div>

          {/* PhD Response with Options */}
          <div className="flex gap-2">
            <div className="bg-slate-300 rounded-full w-7 h-7 from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="mr-10 flex-1">
              <p className="text-[13px] text-gray-700 mb-3">
                No one from the candidate pool has a Phd. What would you like to do next
              </p>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start h-8 text-[11px] gap-1">
                  <Sparkles className="w-3 h-3" />
                  Source Prospects With Phd
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start h-8 text-[11px] gap-1">
                  <Sparkles className="w-3 h-3" />
                  Search Candidates With A Masters (34)
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start h-8 text-[11px] gap-1">
                  <Sparkles className="w-3 h-3" />
                  Search Candidates With A Bachelors (89)
                </Button>
              </div>
            </div>
          </div>

          {/* Masters Selection */}
          <div className="flex justify-end gap-2">
            <div className="bg-gray-100 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]">
              <p className="text-[13px] text-gray-900">Search Candidates With A Masters</p>
            </div>
            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-gray-600" />
            </div>
          </div>

          {/* Masters Details Response */}
          <div className="bg-[#ffffff] flex gap-2">
            <div className="bg-slate-300 rounded-full w-7 h-7 from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="mr-10 flex-1">
              <p className="text-[13px] text-gray-700 mb-3">
                Adding Masters as a chip, and with regards to top universities, we've identified 2 presets.
              </p>
              
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h4 className="text-[13px] font-semibold text-gray-900 mb-3">Degree</h4>
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px] mb-4">
                  ✓ Masters (34)
                </Badge>

                <h4 className="text-[13px] font-semibold text-gray-900 mb-2">Top Institution</h4>
                <p className="text-[12px] text-gray-600 mb-3">Ivy League Universities (Preset)</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {appliedFilters.education.institutions.slice(0, 4).map((uni, idx) =>
                  <Badge key={idx} className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px]">
                      ✓ {uni.name}
                    </Badge>
                  )}
                </div>

                <p className="text-[12px] text-gray-600 mb-3">Top Westcoast Universities (Preset)</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {appliedFilters.education.institutions.slice(4, 8).map((uni, idx) =>
                  <Badge key={idx} className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px]">
                      ✓ {uni.name}
                    </Badge>
                  )}
                </div>

                <Button variant="outline" size="sm" className="h-7 text-[11px] mb-4">
                  Show All Institutions
                </Button>

                <div className="flex justify-end">
                  <Button size="sm" className="bg-blue-600 text-primary-foreground px-6 text-xs font-medium rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow hover:bg-primary/90 h-8">Apply</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Apply Confirmation */}
          <div className="flex justify-end gap-2">
            <div className="bg-gray-100 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]">
              <p className="text-[13px] text-gray-900">Apply</p>
            </div>
            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-gray-600" />
            </div>
          </div>

          {/* Final Options */}
          <div className="flex gap-2">
            <div className="bg-slate-300 rounded-full w-7 h-7 from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-[13px] text-gray-700 mb-3">
                Perfect ! all the filters have been applied, and are visible in the above panel. What other filters can SproutsAI help you with?
              </p>
              <p className="text-[13px] text-gray-700 mb-3">
                try to add some filters for other categories for a balanced profile :
              </p>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="text-[11px] bg-gray-100">Skills</Badge>
                <Sparkles className="w-3 h-3 text-gray-400" />
                <Badge variant="secondary" className="text-[11px] bg-gray-100">Education</Badge>
                <Sparkles className="w-3 h-3 text-gray-400" />
              </div>
              <p className="text-[13px] text-gray-700 mb-2">or keep refining your search for :</p>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="text-[11px] bg-gray-100">Experience</Badge>
                <Sparkles className="w-3 h-3 text-gray-400" />
                <Badge variant="secondary" className="text-[11px] bg-gray-100">Attributes</Badge>
                <Sparkles className="w-3 h-3 text-gray-400" />
              </div>
            </div>
          </div>

          {/* View Templates Request */}
          <div className="flex justify-end gap-2">
            <div className="bg-gray-100 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]">
              <p className="text-[13px] text-gray-900">View templates for experience</p>
            </div>
            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-gray-600" />
            </div>
          </div>

          {/* Experience Templates */}
          <div className="flex gap-2">
            <div className="bg-slate-300 rounded-full w-7 h-7 from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="mr-10 flex-1">
              <p className="text-[13px] text-gray-700 mb-3">
                Perfect ! all the filters have been applied, and are visible in the above panel. What other filters can SproutsAI help you with?
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="h-8 text-[11px] gap-1 justify-start">
                  <Sparkles className="w-3 h-3" />
                  Optimised For Job Title
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-[11px] gap-1 justify-start">
                  <Sparkles className="w-3 h-3" />
                  Optimised For Years Of Experience
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-[11px] gap-1 justify-start">
                  <Sparkles className="w-3 h-3" />
                  Optimised For Company
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-[11px] gap-1 justify-start">
                  <Sparkles className="w-3 h-3" />
                  Optimised For Business Model
                </Button>
              </div>
            </div>
          </div>

          {/* Job Title Selection */}
          <div className="flex justify-end gap-2">
            <div className="bg-gray-100 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]">
              <p className="text-[13px] text-gray-900">optimised for job title</p>
            </div>
            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-gray-600" />
            </div>
          </div>

          {/* Job Title Details */}
          <div className="flex gap-2 mb-20">
            <div className="bg-slate-300 rounded-full w-7 h-7 from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="mr-10 flex-1">
              <p className="text-[13px] text-gray-700 mb-3">Here are the job title</p>
              
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h4 className="text-[13px] font-semibold text-gray-900 mb-3">Primary Job Title</h4>
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px] mb-4">
                  ✓ {appliedFilters.jobTitles.primary}
                </Badge>

                <h4 className="text-[13px] font-semibold text-gray-900 mb-3">Similar Job Title</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {appliedFilters.jobTitles.similar.map((title, idx) =>
                  <Badge key={idx} className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px]">
                      ✓ {title}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2 mb-4">
                  <Button variant="outline" size="sm" className="h-7 text-[11px] gap-1">
                    <Sparkles className="w-3 h-3" />
                    More Relevant Job Titles
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 text-[11px]">
                    Show All Job Titles
                  </Button>
                </div>

                <div className="flex justify-end">
                  <Button size="sm" className="bg-blue-600 text-primary-foreground px-6 text-xs font-medium rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow hover:bg-primary/90 h-8">Apply</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input Area at Bottom */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Let SproutsAI assist you"
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />

          <Button size="icon" className="h-10 w-10 shrink-0 bg-blue-500 hover:bg-blue-600">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>);

}