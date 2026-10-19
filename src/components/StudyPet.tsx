import { useState, useEffect } from "react";

interface StudyPetProps {
  status: 'sleeping' | 'studying' | 'happy';
  isProfile?: boolean;
}

export default function StudyPet({ status, isProfile }: StudyPetProps) {
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const studySessions = JSON.parse(localStorage.getItem('studySessions') || '[]');
    const stopwatchHistory = JSON.parse(localStorage.getItem('stopwatchHistory') || '[]');
    let total = 0;
    studySessions.forEach((s: any) => total += (s.duration || 0));
    stopwatchHistory.forEach((s: any) => total += (s.duration || 0));

    if (total < 3600) setLevel(1);
    else if (total < 3600 * 5) setLevel(2);
    else if (total < 3600 * 10) setLevel(3);
    else if (total < 3600 * 25) setLevel(4);
    else if (total < 3600 * 50) setLevel(5);
    else if (total < 3600 * 100) setLevel(6);
    else setLevel(99);
  }, []);

  let emoji = '😴';
  if (status === 'studying') emoji = '🤓';
  if (status === 'happy') emoji = '🥳';

  if (isProfile) {
      if (level === 1) emoji = '🥚'; // Egg
      else if (level === 2) emoji = '🐣'; // Hatching
      else if (level === 3) emoji = '🐥'; // Chick
      else if (level === 4) emoji = '🐔'; // Chicken
      else if (level === 5) emoji = '🦅'; // Eagle
      else if (level >= 6) emoji = '🐉'; // Dragon
  }

  return (
    <div className="flex flex-col items-center justify-center mt-2">
      <div className={`transition-transform duration-300 ${status === 'studying' && !isProfile ? 'animate-bounce' : ''} ${isProfile ? 'text-6xl' : 'text-3xl'}`}>
        {emoji}
      </div>
    </div>
  );
}
