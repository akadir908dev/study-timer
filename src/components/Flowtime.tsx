import { useState, useEffect } from "react";
import { Play, Pause, Square } from "lucide-react";
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/plugin-notification';
import StudyPet from "./StudyPet";

interface FlowtimeProps {
    onNavigate: (view: string) => void;
    volume?: number;
}

export default function Flowtime({ onNavigate, volume = 0.1 }: FlowtimeProps) {
    const [seconds, setSeconds] = useState(0);
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
            setSeconds((prev) => {
                // If counting down (break time)
                if (!isWorkSession) {
                    if (prev <= 1) {
                        clearInterval(id);

                        const audio = new Audio("/sounds/pwlpl-achievement-unlocked-361842.mp3");
                        audio.volume = volume;
                        audio.play().catch(e => console.error(e));

                        sendNotification({ title: 'Flowtime', body: 'Break finished! Back to work.' });
                        setIsWorkSession(true);
                        return 0; // Start counting up from 0 for work
                    }
                    return prev - 1;
                }

                // If counting up (work time)
                return prev + 1;
            });
        }, 1000);

        return () => clearInterval(id);
    }, [isPaused, showEndConfirm, isWorkSession, volume]);

    const formatTime = (secs: number) => {
        const h = Math.floor(secs / 3600);
        const m = Math.floor((secs % 3600) / 60);
        const s = secs % 60;
        const pad = (num: number) => num.toString().padStart(2, "0");
        return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
    };

    const handleEndClick = () => {
        if (isWorkSession && seconds > 0) {
            // User stopped working, calculate break time (20% of work time)
            setIsPaused(true);
            const breakTime = Math.floor(seconds * 0.2);

            // Save work session
            const sessions = JSON.parse(localStorage.getItem('studySessions') || '[]');
            sessions.push({
                date: new Date().toISOString(),
                duration: seconds,
                tag: localStorage.getItem('currentTag') || 'Flowtime'
            });
            localStorage.setItem('studySessions', JSON.stringify(sessions));

            sendNotification({ title: 'Flowtime', body: `Great job! Take a break for ${Math.floor(breakTime/60)} minutes.` });

            // Switch to break mode
            setIsWorkSession(false);
            setSeconds(breakTime);
        } else {
            // Already in break mode, or no work done, just ask to end
            setShowEndConfirm(true);
        }
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
                {isWorkSession ? "FLOW: WORK" : "FLOW: BREAK"}
            </div>

            <div className="text-4xl font-mono font-light tracking-widest text-white mb-2">
                {formatTime(seconds)}
            </div>

            <StudyPet status={isPaused || showEndConfirm ? 'sleeping' : (isWorkSession ? 'studying' : 'happy')} />

            <div className="flex gap-6 items-center mt-4">
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
                    title={isWorkSession ? "Stop and take break" : "End Flowtime"}
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
