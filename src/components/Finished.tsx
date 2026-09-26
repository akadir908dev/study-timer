import React from "react";

interface FinishedProps {
  onNavigate: (view: string) => void;
}

export default function Finished({ onNavigate }: FinishedProps) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-full">
      <p className="text-2xl font-bold">Well done</p>
      <button 
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors mt-4 cursor-pointer"
        onClick={() => onNavigate("start")}
      >
        Back to Start
      </button>
    </div>
  );
}
