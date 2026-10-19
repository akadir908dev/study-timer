interface StartProps {
  onNavigate: (view: string) => void;
}

export default function Start({ onNavigate }: StartProps) {
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-full w-full">
      <div className="flex flex-col gap-3">
        <button 
          className="text-lg hover:text-white/80 transition-colors cursor-pointer"
          onClick={() => onNavigate("timerMenu")}
        >
          timer
        </button>
        <button 
          className="text-lg hover:text-white/80 transition-colors cursor-pointer"
          onClick={() => onNavigate("stopwatch")}
        >
          stopwatch
        </button>
        <button
          className="text-lg hover:text-white/80 transition-colors cursor-pointer"
          onClick={() => onNavigate("pomodoro")}
        >
          pomodoro
        </button>
        <button
          className="text-lg hover:text-white/80 transition-colors cursor-pointer"
          onClick={() => {
            localStorage.removeItem('currentTag');
            onNavigate("flowtime");
          }}
        >
          flowtime
        </button>
      </div>
      <button 
        className="text-lg hover:text-white/80 transition-colors opacity-50 cursor-pointer"
        onClick={() => onNavigate("menu")}
      >
        menu
      </button>

    </div>
  );
}