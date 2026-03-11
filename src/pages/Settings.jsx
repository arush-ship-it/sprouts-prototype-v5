import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, User, Lock, Bell, Plug, Settings as SettingsIcon, Building2, Users, CheckSquare, Briefcase, Mail, FileText, LogOut } from "lucide-react";
import { base44 } from "@/api/base44Client";

const settingsCategories = [
  { id: "account", label: "Account Info", icon: User },
  { id: "password", label: "Change Password", icon: Lock },
  { id: "notification", label: "Notification", icon: Bell },
  { id: "integration", label: "Integration", icon: Plug },
  { id: "control", label: "Control Panel", icon: SettingsIcon },
  { id: "agency", label: "Agency", icon: Building2 },
  { id: "referrals", label: "Referrals", icon: Users },
  { id: "approvals", label: "Approvals", icon: CheckSquare },
  { id: "jobboards", label: "Job Boards", icon: Briefcase },
  { id: "email", label: "Email Settings", icon: Mail },
  { id: "templates", label: "Templates", icon: FileText },
];

export default function Settings() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("account");

  const handleBack = () => {
    navigate(-1);
  };

  const renderContent = () => {
    switch (activeCategory) {
      case "account":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h2>
              <p className="text-sm text-gray-600 mb-6">Manage your account details and preferences.</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="John Doe" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Acme Inc." className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+1 (555) 000-0000" className="mt-1.5" />
              </div>
            </div>
            <Button>Save Changes</Button>
          </div>
        );
      
      case "password":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Change Password</h2>
              <p className="text-sm text-gray-600 mb-6">Update your password to keep your account secure.</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" className="mt-1.5" />
              </div>
            </div>
            <Button>Update Password</Button>
          </div>
        );

      case "notification":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Notification Preferences</h2>
              <p className="text-sm text-gray-600 mb-6">Manage how you receive notifications.</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium text-gray-900">Candidate Updates</p>
                  <p className="text-sm text-gray-500">Get notified about candidate progress</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium text-gray-900">Agent Activity</p>
                  <p className="text-sm text-gray-500">Notifications for agent actions</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-gray-900">Weekly Reports</p>
                  <p className="text-sm text-gray-500">Receive weekly summary reports</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        );

      case "integration":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Integrations</h2>
              <p className="text-sm text-gray-600 mb-6">Connect your recruitment tools and platforms.</p>
            </div>
            <div className="grid gap-4">
              <div className="p-4 border rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">LinkedIn</p>
                    <p className="text-sm text-gray-500">Not connected</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Connect</Button>
              </div>
              <div className="p-4 border rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Gmail</p>
                    <p className="text-sm text-gray-500">Connected</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Disconnect</Button>
              </div>
            </div>
          </div>
        );

      case "control":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Control Panel</h2>
              <p className="text-sm text-gray-600 mb-6">Manage system-wide settings and preferences.</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium text-gray-900">Auto-approve agent actions</p>
                  <p className="text-sm text-gray-500">Automatically approve certain agent activities</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium text-gray-900">Data retention</p>
                  <p className="text-sm text-gray-500">Keep candidate data for 90 days</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        );

      case "agency":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Agency Settings</h2>
              <p className="text-sm text-gray-600 mb-6">Configure your agency information and branding.</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="agencyName">Agency Name</Label>
                <Input id="agencyName" placeholder="Your Agency Name" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="agencyWebsite">Website</Label>
                <Input id="agencyWebsite" placeholder="https://yourwebsite.com" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="agencyDescription">Description</Label>
                <Textarea id="agencyDescription" placeholder="Tell us about your agency..." className="mt-1.5" rows={4} />
              </div>
            </div>
            <Button>Save Changes</Button>
          </div>
        );

      case "referrals":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Referral Program</h2>
              <p className="text-sm text-gray-600 mb-6">Invite others and earn rewards.</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-lg border border-indigo-100">
              <p className="text-sm text-gray-600 mb-3">Your referral link:</p>
              <div className="flex gap-2">
                <Input value="https://sproutsai.com/ref/johndoe" readOnly className="bg-white" />
                <Button>Copy</Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-white border rounded-lg text-center">
                <p className="text-2xl font-bold text-gray-900">5</p>
                <p className="text-sm text-gray-600">Referrals</p>
              </div>
              <div className="p-4 bg-white border rounded-lg text-center">
                <p className="text-2xl font-bold text-gray-900">2</p>
                <p className="text-sm text-gray-600">Active</p>
              </div>
              <div className="p-4 bg-white border rounded-lg text-center">
                <p className="text-2xl font-bold text-gray-900">$150</p>
                <p className="text-sm text-gray-600">Earned</p>
              </div>
            </div>
          </div>
        );

      case "approvals":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Approval Settings</h2>
              <p className="text-sm text-gray-600 mb-6">Configure approval workflows for various actions.</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium text-gray-900">Require approval for agent emails</p>
                  <p className="text-sm text-gray-500">Review emails before agents send them</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium text-gray-900">Require approval for candidate rejection</p>
                  <p className="text-sm text-gray-500">Review before rejecting candidates</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        );

      case "jobboards":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Boards</h2>
              <p className="text-sm text-gray-600 mb-6">Manage your job board integrations and postings.</p>
            </div>
            <div className="grid gap-4">
              <div className="p-4 border rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Indeed</p>
                  <p className="text-sm text-gray-500">Post jobs automatically</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="p-4 border rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">LinkedIn Jobs</p>
                  <p className="text-sm text-gray-500">Post jobs automatically</p>
                </div>
                <Switch />
              </div>
              <div className="p-4 border rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Glassdoor</p>
                  <p className="text-sm text-gray-500">Post jobs automatically</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        );

      case "email":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Email Settings</h2>
              <p className="text-sm text-gray-600 mb-6">Configure your email preferences and signatures.</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fromName">From Name</Label>
                <Input id="fromName" placeholder="John Doe" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="replyTo">Reply-To Email</Label>
                <Input id="replyTo" type="email" placeholder="john@company.com" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="signature">Email Signature</Label>
                <Textarea id="signature" placeholder="Best regards,&#10;John Doe&#10;Recruiter at Acme Inc." className="mt-1.5" rows={5} />
              </div>
            </div>
            <Button>Save Changes</Button>
          </div>
        );

      case "templates":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Email Templates</h2>
              <p className="text-sm text-gray-600 mb-6">Manage your email templates for various scenarios.</p>
            </div>
            <div className="space-y-3">
              <div className="p-4 border rounded-lg hover:border-indigo-300 cursor-pointer transition-colors">
                <p className="font-medium text-gray-900">Interview Invitation</p>
                <p className="text-sm text-gray-500">Template for inviting candidates to interviews</p>
              </div>
              <div className="p-4 border rounded-lg hover:border-indigo-300 cursor-pointer transition-colors">
                <p className="font-medium text-gray-900">Rejection Email</p>
                <p className="text-sm text-gray-500">Template for candidate rejection notifications</p>
              </div>
              <div className="p-4 border rounded-lg hover:border-indigo-300 cursor-pointer transition-colors">
                <p className="font-medium text-gray-900">Offer Letter</p>
                <p className="text-sm text-gray-500">Template for job offer letters</p>
              </div>
            </div>
            <Button>
              <FileText className="w-4 h-4 mr-2" />
              Create New Template
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 relative flex flex-col">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="mb-6 -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
        
        <nav className="space-y-1">
          {settingsCategories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={() => base44.auth.logout()}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-3xl">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}