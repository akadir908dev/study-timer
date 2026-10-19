import { useState, useEffect, useRef } from "react";
import { Play, Pause, Square, Flag } from "lucide-react";

interface StopwatchProps {
    onNavigate: (view: string) => void;
}

export default function Stopwatch({ onNavigate }: StopwatchProps) {
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isPaused, setIsPaused] = useState(true);
    const [showEndConfirm, setShowEndConfirm] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const [hardcoreMode] = useState(() => localStorage.getItem('hardcoreMode') === 'true');
    const [pausePos, setPausePos] = useState({ x: 0, y: 0 });

    const lapsEndRef = useRef<HTMLDivElement>(null);

    const handlePauseHover = () => {
        if (hardcoreMode && !isPaused) {
            setPausePos({
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100
            });
        }
    };

    useEffect(() => {
        if (isPaused || showEndConfirm) return;

        const id = setInterval(() => {
            setTimeElapsed((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(id);
    }, [isPaused, showEndConfirm]);

    useEffect(() => {
        if (lapsEndRef.current) {
            lapsEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [laps]);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        const pad = (num: number) => num.toString().padStart(2, "0");
        return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
    };

    const handleLapClick = () => {
        setLaps(prev => [...prev, timeElapsed]);
    };

    const handleEndClick = () => {
        setShowEndConfirm(true);
    };

    const handleConfirmEnd = (yes: boolean) => {
        if (yes) {
            const newHistoryItem = {
                date: new Date().toISOString(),
                duration: timeElapsed,
                laps: laps
            };
            const currentHistory = JSON.parse(localStorage.getItem('stopwatchHistory') || '[]');
            localStorage.setItem('stopwatchHistory', JSON.stringify([newHistoryItem, ...currentHistory]));

            onNavigate("finished-silent");
        } else {
            setShowEndConfirm(false);
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center h-full w-full pt-8">
            <button
                className="absolute top-4 left-4 text-xs font-bold text-white/50 hover:text-white/80 transition-colors cursor-pointer uppercase tracking-wider"
                onClick={() => onNavigate("menu")}
            >
                Back
            </button>
            <div className="text-4xl font-mono font-light tracking-widest text-white mb-4">
                {formatTime(timeElapsed)}
            </div>

            <div className="flex gap-4 items-center mb-4">
                <button
                    onClick={() => {
                        setIsPaused(!isPaused);
                        setPausePos({ x: 0, y: 0 });
                    }}
                    onMouseEnter={handlePauseHover}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                    style={{ transform: `translate(${pausePos.x}px, ${pausePos.y}px)`, transition: hardcoreMode ? 'transform 0.1s' : 'none' }}
                    title={isPaused ? "Resume" : "Pause"}
                >
                    {isPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
                </button>
                <button
                    onClick={handleLapClick}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                    title="Lap"
                    disabled={timeElapsed === 0}
                >
                    <Flag size={16} fill="currentColor" />
                </button>
                <button
                    onClick={handleEndClick}
                    className="p-3 bg-white/10 hover:bg-red-500/80 rounded-full transition-colors cursor-pointer"
                    title="End Stopwatch"
                >
                    <Square size={16} fill="currentColor" />
                </button>
            </div>

            <div className="flex-1 w-full max-h-24 overflow-y-auto px-4 hide-scrollbar flex flex-col gap-1 mb-4 text-sm text-white/70">
                {laps.map((lap, index) => (
                    <div key={index} className="flex justify-between border-b border-white/5 pb-1">
                        <span>Lap {index + 1}</span>
                        <span className="font-mono">{formatTime(lap)}</span>
                    </div>
                ))}
                <div ref={lapsEndRef} />
            </div>

            {showEndConfirm && (
                <div className="absolute inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                    <div className="relative bg-[#242424] border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-xl w-[80%] h-[80%]">
                        <p className="text-sm font-medium mb-4">Are you sure you would like to end?</p>
                        <div className="flex gap-4">
                            <button
                                className="px-4 py-1.5 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors cursor-pointer"
                                onClick={() => handleConfirmEnd(true)}
                            >
                                Yes
                            </button>
                            <button
                                className="px-4 py-1.5 bg-gray-600 hover:bg-gray-700 rounded-md text-sm font-medium transition-colors cursor-pointer"
                                onClick={() => handleConfirmEnd(false)}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
