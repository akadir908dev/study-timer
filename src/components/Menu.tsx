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
        className="w-48 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors cursor-pointer"
        onClick={() => onNavigate("ambience")}
      >
        Ambience
      </button>

      <button
        className="text-lg transition-colors cursor-pointer"
        onClick={() => onNavigate("settings")}>
        Settings
      </button>
    </div>
  );
}