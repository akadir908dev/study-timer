import { useEffect } from "react";

interface FinishedProps {
  onNavigate: (view: string) => void;
}

export default function Finished({ onNavigate }: FinishedProps) {
  useEffect(() => {
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

    // Cleanup function stops the audio immediately when navigating away
    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <div className="flex flex-col gap-3 items-center justify-center h-full">
      <div className="flex flex-col items-center gap-1">
      <p className="text-2xl font-bold text-white tracking-wider">Well done!</p>
      <p className="text-base font-bold text-white tracking-wider">You should be proud of yourself !</p>
      </div>
      <button 
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors mt-4 cursor-pointer"
        onClick={() => onNavigate("start")}
      >
        Back to Start
      </button>
    </div>
  );
}
