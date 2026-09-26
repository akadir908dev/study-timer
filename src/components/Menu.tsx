import React from "react";

interface MenuProps {
  onNavigate: (view: string) => void;
}

export default function Menu({ onNavigate }: MenuProps) {
  return (
    <div 
      className="flex flex-col items-center justify-center h-full w-full cursor-pointer hover:bg-white/5 rounded-lg transition-colors"
      onClick={() => onNavigate("start")}
    >
      <p className="text-xl font-bold">Start</p>
    </div>
  );
}