import { useState, useEffect } from "react";
import { Play, Pause, Square } from "lucide-react";
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/plugin-notification';

interface TimerProps {
    initialSeconds: number;
    onNavigate: (view: string) => void;
}

export default function Timer({ initialSeconds, onNavigate }: TimerProps) {
    const [timeLeft, setTimeLeft] = useState(initialSeconds);
    const [isPaused, setIsPaused] = useState(false);
    const [showEndConfirm, setShowEndConfirm] = useState(false);

    // Request notification permission on mount
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
                    // Send Windows Toast Notification
                    sendNotification({ title: 'Study Timer', body: 'Your timer is finished! Well done!' });
                    setTimeout(() => onNavigate("finished"), 0);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(id);
    }, [isPaused, showEndConfirm, onNavigate]);

    const h = Math.floor(timeLeft / 3600);
    const m = Math.floor((timeLeft % 3600) / 60);
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
            <div className="text-4xl font-mono font-light tracking-widest text-white mb-6">
                {h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`}
            </div>

            <div className="flex gap-6 items-center">
                <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    title={isPaused ? "Resume" : "Pause"}
                >
                    {isPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
                </button>
                <button
                    onClick={handleEndClick}
                    className="p-3 bg-white/10 hover:bg-red-500/80 rounded-full transition-colors"
                    title="End Timer"
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
                                className="px-4 py-1.5 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors"
                                onClick={() => handleConfirmEnd(true)}
                            >
                                Yes
                            </button>
                            <button
                                className="px-4 py-1.5 bg-gray-600 hover:bg-gray-700 rounded-md text-sm font-medium transition-colors"
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