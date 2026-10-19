import { useState, useEffect } from "react";
import StudyPet from "./StudyPet";

interface ProfileProps {
  onNavigate: (view: string) => void;
}

export default function Profile({ onNavigate }: ProfileProps) {
  const [totalSeconds, setTotalSeconds] = useState(0);

  useEffect(() => {
    const studySessions = JSON.parse(localStorage.getItem('studySessions') || '[]');
    const stopwatchHistory = JSON.parse(localStorage.getItem('stopwatchHistory') || '[]');

    let total = 0;
    studySessions.forEach((s: any) => total += (s.duration || 0));
    stopwatchHistory.forEach((s: any) => total += (s.duration || 0));

    setTotalSeconds(total);
  }, []);

  const getLevel = (seconds: number) => {
    if (seconds < 3600) return { level: 1, title: 'Novice Procrastinator' };
    if (seconds < 3600 * 5) return { level: 2, title: 'Amateur Focus Scholar' };
    if (seconds < 3600 * 10) return { level: 3, title: 'Journeyman Taskmaster' };
    if (seconds < 3600 * 25) return { level: 4, title: 'Expert Timebender' };
    if (seconds < 3600 * 50) return { level: 5, title: 'Master of the Pomodoro' };
    if (seconds < 3600 * 100) return { level: 6, title: 'Grandmaster of Focus' };
    return { level: 99, title: 'God of Focus' };
  };

  const { level, title } = getLevel(totalSeconds);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 gap-4">
      <h2 className="text-xl font-bold text-white mb-2">RPG Profile</h2>

      <div className="bg-white/5 p-4 rounded-lg flex flex-col items-center w-full">
        <StudyPet status="happy" isProfile />
        <div className="mt-4 text-2xl font-bold text-yellow-400">Level {level}</div>
        <div className="text-sm font-mono text-white/80">{title}</div>
      </div>

      <div className="text-sm text-white/60">
        Total Experience: {Math.floor(totalSeconds / 60)} minutes
      </div>

      <button
        className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-colors cursor-pointer"
        onClick={() => onNavigate("menu")}
      >
        Back
      </button>
    </div>
  );
}
