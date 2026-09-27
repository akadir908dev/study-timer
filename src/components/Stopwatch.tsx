import { useState, useEffect } from "react";
import { Play, Pause, Square } from "lucide-react";

interface StopwatchProps {
    onNavigate: (view: string) => void;
}

export default function Stopwatch({ onNavigate }: StopwatchProps) {
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isPaused, setIsPaused] = useState(true);
    const [showEndConfirm, setShowEndConfirm] = useState(false);

    useEffect(() => {
        if (isPaused || showEndConfirm) return;

        const id = setInterval(() => {
            setTimeElapsed((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(id);
    }, [isPaused, showEndConfirm]);

    const h = Math.floor(timeElapsed / 3600);
    const m = Math.floor((timeElapsed % 3600) / 60);
    const s = timeElapsed % 60;

    const pad = (num: number) => num.toString().padStart(2, "0");

    const handleEndClick = () => {
        setShowEndConfirm(true);
    };

    const handleConfirmEnd = (yes: boolean) => {
        if (yes) {
            onNavigate("finished-silent");
        } else {
            setShowEndConfirm(false);
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center h-full w-full">
            <div className="text-4xl font-mono font-light tracking-widest text-white mb-6">
                {h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`}
            </div>

            <div className="flex gap-6 items-center">
                <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="p-3 bg-white/10 rounded-full transition-colors cursor-pointer"
                    title={isPaused ? "Resume" : "Pause"}
                >
                    {isPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
                </button>
                <button
                    onClick={handleEndClick}
                    className="p-3 bg-white/10 rounded-full transition-colors cursor-pointer"
                    title="End Stopwatch"
                >
                    <Square size={16} fill="currentColor" />
                </button>
            </div>

            {showEndConfirm && (
                <div className="absolute inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                    <div className="relative bg-[#242424] border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-xl w-[80%] h-[80%]">
                        <p className="text-sm font-medium mb-4">Are you sure you would like to end?</p>
                        <div className="flex gap-4">
                            <button
                                className="px-4 py-1.5 bg-red-600 rounded-md text-sm font-medium transition-colors cursor-pointer"
                                onClick={() => handleConfirmEnd(true)}
                            >
                                Yes
                            </button>
                            <button
                                className="px-4 py-1.5 bg-gray-600 ounded-md text-sm font-medium transition-colors cursor-pointer"
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
