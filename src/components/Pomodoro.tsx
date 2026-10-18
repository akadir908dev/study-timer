import { useState, useEffect } from "react";
import { Play, Pause, Square } from "lucide-react";
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/plugin-notification';

interface PomodoroProps {
    onNavigate: (view: string) => void;
    volume?: number;
}

export default function Pomodoro({ onNavigate, volume = 0.1 }: PomodoroProps) {
    const WORK_SECONDS = 25 * 60;
    const BREAK_SECONDS = 5 * 60;

    const [timeLeft, setTimeLeft] = useState(WORK_SECONDS);
    const [isPaused, setIsPaused] = useState(true);
    const [isWorkSession, setIsWorkSession] = useState(true);
    const [showEndConfirm, setShowEndConfirm] = useState(false);

    useEffect(() => {
        const initNotifications = async () => {
            let permissionGranted = await isPermissionGranted();
            if (!permissionGranted) {
                const permission = await requestPermission();
                permissionGranted = permission === 'granted';
            }
        };
        initNotifications();
    }, []);

    useEffect(() => {
        if (isPaused || showEndConfirm) return;

        const id = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(id);

                    const audio = new Audio("/sounds/pwlpl-achievement-unlocked-361842.mp3");
                    audio.volume = volume;
                    audio.play().catch(e => console.error(e));

                    if (isWorkSession) {
                        sendNotification({ title: 'Pomodoro', body: 'Work session finished! Time for a break.' });
                        setIsWorkSession(false);
                        return BREAK_SECONDS;
                    } else {
                        sendNotification({ title: 'Pomodoro', body: 'Break finished! Back to work.' });
                        setIsWorkSession(true);
                        return WORK_SECONDS;
                    }
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(id);
    }, [isPaused, showEndConfirm, isWorkSession, volume]);

    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    const pad = (num: number) => num.toString().padStart(2, "0");

    const handleEndClick = () => {
        setShowEndConfirm(true);
    };

    const handleConfirmEnd = (yes: boolean) => {
        if (yes) {
            onNavigate("start");
        } else {
            setShowEndConfirm(false);
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center h-full w-full">
            <div className="text-sm text-white/70 mb-2 font-bold tracking-wider">
                {isWorkSession ? "WORK" : "BREAK"}
            </div>

            <div className="text-4xl font-mono font-light tracking-widest text-white mb-6">
                {`${pad(m)}:${pad(s)}`}
            </div>

            <div className="flex gap-6 items-center">
                <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                    title={isPaused ? "Resume" : "Pause"}
                >
                    {isPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
                </button>
                <button
                    onClick={handleEndClick}
                    className="p-3 bg-white/10 hover:bg-red-500/80 rounded-full transition-colors cursor-pointer"
                    title="End Pomodoro"
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
