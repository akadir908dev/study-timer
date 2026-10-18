import { useState, useEffect } from "react";

interface HistoryProps {
    onNavigate: (view: string) => void;
}

interface HistoryItem {
    date: string;
    duration: number;
    laps: number[];
}

export default function History({ onNavigate }: HistoryProps) {
    const [history, setHistory] = useState<HistoryItem[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('stopwatchHistory');
        if (stored) {
            setHistory(JSON.parse(stored));
        }
    }, []);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        const pad = (num: number) => num.toString().padStart(2, "0");
        return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
    };

    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="flex flex-col h-full w-full p-4 items-center">
            <h2 className="text-xl font-bold text-white mb-4 shrink-0">History</h2>

            <div className="flex-1 w-full overflow-y-auto hide-scrollbar flex flex-col gap-3">
                {history.length === 0 ? (
                    <div className="text-sm text-white/50 text-center mt-4">
                        No stopwatch sessions yet.
                    </div>
                ) : (
                    history.map((item, index) => (
                        <div key={index} className="bg-white/5 p-3 rounded-lg flex flex-col gap-1 text-left">
                            <div className="flex justify-between items-center border-b border-white/10 pb-1 mb-1">
                                <span className="text-xs text-white/70">{formatDate(item.date)}</span>
                                <span className="text-sm font-mono font-bold text-white">{formatTime(item.duration)}</span>
                            </div>

                            {item.laps && item.laps.length > 0 ? (
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] text-white/50 uppercase tracking-wider">Laps</span>
                                    <div className="flex flex-wrap gap-2">
                                        {item.laps.map((lap, lIdx) => (
                                            <span key={lIdx} className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded text-white/80">
                                                {lIdx + 1}: {formatTime(lap)}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <span className="text-[10px] text-white/30 italic">No laps recorded</span>
                            )}
                        </div>
                    ))
                )}
            </div>

            <button
                className="mt-4 shrink-0 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-colors cursor-pointer"
                onClick={() => onNavigate("menu")}
            >
                Back
            </button>
        </div>
    );
}
