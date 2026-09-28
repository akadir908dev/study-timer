import { useEffect } from "react";
import { RotateCcw } from "lucide-react";

interface FinishedProps {
  onNavigate: (view: string) => void;
  playMusic?: boolean;
  showRepeat?: boolean;
}

export default function Finished({ onNavigate, playMusic = true, showRepeat = true }: FinishedProps) {
  useEffect(() => {
    if (!playMusic) return;

    const audio = new Audio("/sounds/pwlpl-achievement-unlocked-361842.mp3");
    audio.volume = 0.1; // 0.0 is silent, 1.0 is max volume
    
    let playCount = 0;
    const maxPlays = 3;

    const playSound = async () => {
      if (playCount < maxPlays) {
        try {
          await audio.play();
        } catch (err) {
          console.error("Audio playback failed:", err);
        }
      }
    };

    const handleEnded = () => {
      playCount++;
      if (playCount < maxPlays) {
        audio.currentTime = 0;
        playSound();
      }
    };

    audio.addEventListener("ended", handleEnded);
    playSound();

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <div className="flex flex-col gap-3 items-center justify-center h-full w-full">
      <div className="flex flex-col items-center gap-1 mb-2 text-center">
        <p className="text-2xl font-bold text-white tracking-wider">Well done!</p>
        <p className="text-xs font-medium text-white/70 tracking-wider">You should be proud of yourself!</p>
      </div>
      <div className="flex gap-4">
        {showRepeat && (
          <button 
            className="p-3 bg-white/10 text-white rounded-full transition-colors cursor-pointer"
            onClick={() => onNavigate("timerMenu")}
            title="Repeat Timer"
          >
            <RotateCcw size={20} />
          </button>
        )}
        <button 
          className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium transition-colors cursor-pointer"
          onClick={() => onNavigate("start")}
        >
          Back to Start
        </button>
      </div>
    </div>
  );
}
