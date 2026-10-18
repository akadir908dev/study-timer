interface SettingsProps {
  onNavigate: (view: string) => void;
  themeColor: string;
  setThemeColor: (color: string) => void;
  opacity: number;
  setOpacity: (opacity: number) => void;
  volume: number;
  setVolume: (volume: number) => void;
}

export default function Settings({
  onNavigate,
  themeColor,
  setThemeColor,
  opacity,
  setOpacity,
  volume,
  setVolume,
}: SettingsProps) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-full w-full p-4">
      <h2 className="text-xl font-bold text-white mb-2">Settings</h2>

      <div className="w-full flex flex-col gap-4 px-4 text-sm text-left">
        {/* Theme Color */}
        <div className="flex justify-between items-center">
          <label className="text-white">Theme Color</label>
          <input
            type="color"
            value={themeColor}
            onChange={(e) => setThemeColor(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer border-none bg-transparent"
          />
        </div>

        {/* Opacity */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <label className="text-white">Transparency</label>
            <span className="text-white/70 text-xs">{Math.round(opacity * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.05"
            value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
            className="w-full cursor-pointer accent-blue-600"
          />
        </div>

        {/* Volume */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <label className="text-white">Volume</label>
            <span className="text-white/70 text-xs">{Math.round(volume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.0"
            max="1.0"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full cursor-pointer accent-blue-600"
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-colors cursor-pointer"
          onClick={() => onNavigate("menu")}
        >
          Back
        </button>
      </div>
    </div>
  );
}
