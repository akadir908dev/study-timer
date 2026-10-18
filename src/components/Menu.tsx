interface MenuProps {
  onNavigate: (view: string) => void;
}

export default function Menu({ onNavigate }: MenuProps) {
  return (
    <div 
      className="flex flex-col items-center justify-center h-full w-full gap-4">
      <button 
        className="text-3xl transition-colors cursor-pointer"
        onClick={() => onNavigate("start")}>
        Start
      </button>
      <button
        className="text-lg transition-colors cursor-pointer"
        onClick={() => onNavigate("history")}>
        History
      </button>
      <button
        className="text-lg transition-colors cursor-pointer"
        onClick={() => onNavigate("settings")}>
        Settings
      </button>
    </div>
  );
}