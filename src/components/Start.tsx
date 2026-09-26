import React from "react";

interface StartProps {
  onNavigate: (view: string) => void;
}

export default function Start({ onNavigate }: StartProps) {
  return (
    <div className="flex flex-col gap-[16px] items-center justify-center h-full w-full">
      <button 
        className="text-lg hover:text-blue-400 transition-colors cursor-pointer"
        onClick={() => onNavigate("timerMenu")}
      >
        timer
      </button>
      <button className="text-lg hover:text-blue-400 transition-colors opacity-50 cursor-not-allowed">
        stopwatch
      </button>
      <button className="text-lg hover:text-blue-400 transition-colors opacity-50 cursor-not-allowed">
        pomodoro
      </button>
    </div>
  );
}