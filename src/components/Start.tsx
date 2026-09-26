import React from "react";

interface StartProps {
  onNavigate: (view: string) => void;
}

export default function Start({ onNavigate }: StartProps) {
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-full w-full">
      <div className="flex flex-col gap-3">
        <button 
          className="text-lg transition-colors cursor-pointer"
          onClick={() => onNavigate("timerMenu")}
        >
          timer
        </button>
        <button className="text-lg transition-colors opacity-50 cursor-not-allowed">
          stopwatch
        </button>
        <button className="text-lg transition-colors opacity-50 cursor-not-allowed">
          pomodoro
        </button>
      </div>
      <button 
        className="text-lg transition-colors opacity-50 cursor-pointer"
        onClick={() => onNavigate("menu")}
      >
        menu
      </button>

    </div>
  );
}