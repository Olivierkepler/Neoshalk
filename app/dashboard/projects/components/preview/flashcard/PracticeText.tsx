"use client";

import { useTabsStore } from "../../../store/useTabsStore"; 

interface TabContent {
  title: string;
  content: React.ReactNode;
  image?: string;
  code?: string;
  filename?: string;
}

interface PracticeTextTabsProps {
  tabs: TabContent[];
  theme?: "light" | "dark";
}


export default function PracticeTextTabs({
  tabs

}: PracticeTextTabsProps) {
  const { activeIndex} = useTabsStore();
  const activeTab = tabs[activeIndex];


  return (
    <div className="w-full " tabIndex={0}>
   {typeof activeTab.content === "string"
                ? activeTab.content
                : activeTab.content}

    
    </div>
  );
}

