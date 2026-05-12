"use client";

import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import UploadView from "@/components/UploadView";
import HistoryView from "@/components/HistoryView";
import CoursesView from "@/components/CoursesView";
import AnalysisView from "@/components/AnalysisView";
import ATSScoreView from "@/components/ATSScoreView";
import SuggestionsView from "@/components/SuggestionsView";
import PlaceholderView from "@/components/PlaceholderView";
import { StoreProvider, useStore } from "@/lib/store";

function ActiveView() {
  const { view } = useStore();
  switch (view) {
    case "Dashboard":
      return <Dashboard />;
    case "Upload Resume":
      return <UploadView />;
    case "Analysis":
      return <AnalysisView />;
    case "ATS Score":
      return <ATSScoreView />;
    case "Suggestions":
      return <SuggestionsView />;
    case "Courses":
      return <CoursesView />;
    case "History":
      return <HistoryView />;
    case "Profile":
      return <PlaceholderView title="Profile" />;
    case "Settings":
      return <PlaceholderView title="Settings" />;
    default:
      return <Dashboard />;
  }
}

export default function Home() {
  return (
    <StoreProvider>
      <div className="flex min-h-screen bg-[#F8F9FC]">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden">
          <ActiveView />
        </main>
      </div>
    </StoreProvider>
  );
}
