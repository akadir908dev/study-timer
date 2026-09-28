import React, { useState, useRef, useEffect } from "react";

interface TimerMenuProps {
    initialSeconds?: number;
    onNavigate: (view: string) => void;
    onStartTimer: (seconds: number) => void;
}

export default function TimerMenu({ initialSeconds = 0, onNavigate, onStartTimer }: TimerMenuProps) {
    const [digits, setDigits] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [cursorVisible, setCursorVisible] = useState(false);

    useEffect(() => {
        if (initialSeconds > 0) {
            const h = Math.floor(initialSeconds / 3600);
            const m = Math.floor((initialSeconds % 3600) / 60);
            const s = initialSeconds % 60;
            const pad = (num: number) => num.toString().padStart(2, "0");
            
            const newDigits = `${pad(h)}${pad(m)}${pad(s)}`;
            setDigits(newDigits.replace(/^0+/, ''));
        }
    }, [initialSeconds]);

    useEffect(() => {
        if (isFocused) {
            setCursorVisible(true);
            const id = setInterval(() => {
                setCursorVisible((v) => !v);
            }, 530); // standard cursor blink rate
            return () => clearInterval(id);
        } else {
            setCursorVisible(false);
        }
    }, [isFocused]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDigits(e.target.value.replace(/\D/g, "").slice(-6));
    };

    const padded = digits.padStart(6, "0");
    const hh = padded.slice(0, 2);
    const mm = padded.slice(2, 4);
    const ss = padded.slice(4, 6);

    const handleStart = () => {
        const totalSeconds = (parseInt(hh, 10) || 0) * 3600 +
                             (parseInt(mm, 10) || 0) * 60 +
                             (parseInt(ss, 10) || 0);
        if (totalSeconds > 0) {
            onStartTimer(totalSeconds);
        }
    };

    const renderBlock = (block: string, startIndex: number) => {
        return (
            <span className="flex">
                <span className={startIndex < 6 - digits.length ? "opacity-30" : "opacity-100"}>{block[0]}</span>
                <span className={startIndex + 1 < 6 - digits.length ? "opacity-30" : "opacity-100"}>{block[1]}</span>
            </span>
        );
    };

    return (
        <div className="flex flex-col gap-[12px] p-[20px] w-full h-full items-center justify-center">
            <p className="text-gray-400 font-medium text-base">Duration</p>

            <div
                className="relative flex items-center text-3xl sm:text-4xl font-light tracking-widest text-white cursor-text"
                onClick={() => inputRef.current?.focus()}
            >
                <input
                    ref={inputRef}
                    type="text"
                    inputMode="numeric"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-text"
                    value={digits}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                
                <div className="flex items-center pointer-events-none">
                    {[hh, mm, ss].map((block, i) => (
                        <React.Fragment key={i}>
                            {renderBlock(block, i * 2)}
                            {i < 2 && <span className="opacity-50 mx-1 pb-1 sm:pb-1">:</span>}
                        </React.Fragment>
                    ))}
                </div>
                
                {/* Blinking text cursor */}
                <div 
                    className={`w-[1px] h-[32px] sm:h-[36px] bg-white ml-1 sm:ml-2 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`} 
                />
            </div>
            <div className="flex gap-4 mt-4 items-center justify-center">
                <button
                    className="w-24 py-2 bg-white/10 text-white rounded-full font-medium transition-colors cursor-pointer"
                    onClick={() => onNavigate("start")}>
                    Back
                </button>
                <button
                    className="w-24 py-[7px] bg-blue-600 text-white rounded-full font-medium transition-colors cursor-pointer"
                    onClick={handleStart}>
                    Start
                </button>
            </div>
        </div>
    );
}