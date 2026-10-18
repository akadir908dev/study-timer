import { useState, useEffect } from "react";
import "./App.css";
import TitleBar from "./components/TitleBar";
import Menu from "./components/Menu";
import Start from "./components/Start";
import TimerMenu from "./components/TimerMenu";
import Timer from "./components/Timer";
import Stopwatch from "./components/Stopwatch";
import Finished from "./components/Finished";
import Settings from "./components/Settings";
import Pomodoro from "./components/Pomodoro";
import History from "./components/History";
import AmbienceMixer, { SOUND_TRACKS } from "./components/AmbienceMixer";
import Flowtime from "./components/Flowtime";
import { useRef } from "react";

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "36, 36, 36";
};

function App() {
  const [currentView, setCurrentView] = useState("menu");
  const [timerDuration, setTimerDuration] = useState(0);

  const [themeColor, setThemeColor] = useState(() => localStorage.getItem("themeColor") || "#242424");
  const [opacity, setOpacity] = useState(() => parseFloat(localStorage.getItem("opacity") || "1.0"));
  const [volume, setVolume] = useState(() => parseFloat(localStorage.getItem("volume") || "0.1"));
  const [themePreset, setThemePreset] = useState(() => localStorage.getItem("themePreset") || "default");
  const [fontFamily, setFontFamily] = useState(() => localStorage.getItem("fontFamily") || "Pixelify Sans");

  const [ambienceVolumes, setAmbienceVolumes] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('ambienceVolumes');
    return saved ? JSON.parse(saved) : { rain: 0, fire: 0, cafe: 0, waves: 0 };
  });

  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  useEffect(() => {
    localStorage.setItem("themeColor", themeColor);
  }, [themeColor]);

  useEffect(() => {
    localStorage.setItem("opacity", opacity.toString());
  }, [opacity]);

  useEffect(() => {
    localStorage.setItem("volume", volume.toString());
  }, [volume]);

  useEffect(() => {
    localStorage.setItem("themePreset", themePreset);
  }, [themePreset]);

  useEffect(() => {
    localStorage.setItem("fontFamily", fontFamily);
  }, [fontFamily]);

  useEffect(() => {
    localStorage.setItem('ambienceVolumes', JSON.stringify(ambienceVolumes));
  }, [ambienceVolumes]);

  useEffect(() => {
    Object.entries(ambienceVolumes).forEach(([id, vol]) => {
      const audio = audioRefs.current[id];
      if (audio) {
        audio.volume = vol;
        if (vol > 0 && audio.paused) {
          audio.play().catch(e => console.log('Audio play error:', e));
        } else if (vol === 0 && !audio.paused) {
          audio.pause();
        }
      }
    });
  }, [ambienceVolumes]);

  return (
    <div
      className={`app-container theme-${themePreset}`}
      style={{
        backgroundColor: `rgba(${hexToRgb(themeColor)}, ${opacity})`,
        fontFamily: fontFamily !== 'Pixelify Sans' ? fontFamily : undefined
      }}
    >
      <TitleBar />
      <main className="content">
        {currentView === "menu" && <Menu onNavigate={setCurrentView} />}
        {currentView === "start" && <Start onNavigate={setCurrentView} />}
        {currentView === "timerMenu" && (
          <TimerMenu 
            initialSeconds={timerDuration}
            onNavigate={setCurrentView} 
            onStartTimer={(seconds) => {
              setTimerDuration(seconds);
              setCurrentView("timer");
            }}
          />
        )}
        {currentView === "timer" && (
          <Timer 
            initialSeconds={timerDuration} 
            onNavigate={setCurrentView} 
          />
        )}
        {currentView === "stopwatch" && <Stopwatch onNavigate={setCurrentView} />}
        {currentView === "pomodoro" && <Pomodoro onNavigate={setCurrentView} volume={volume} />}
        {currentView === "flowtime" && <Flowtime onNavigate={setCurrentView} volume={volume} />}
        {currentView === "history" && <History onNavigate={setCurrentView} />}
        {currentView === "ambience" && <AmbienceMixer onNavigate={setCurrentView} volumes={ambienceVolumes} setVolumes={setAmbienceVolumes} />}
        {currentView === "settings" && (
          <Settings
            onNavigate={setCurrentView}
            themeColor={themeColor}
            setThemeColor={setThemeColor}
            opacity={opacity}
            setOpacity={setOpacity}
            volume={volume}
            setVolume={setVolume}
            themePreset={themePreset}
            setThemePreset={setThemePreset}
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
          />
        )}
        {currentView === "finished" && <Finished onNavigate={setCurrentView} volume={volume} />}
        {currentView === "finished-silent" && <Finished onNavigate={setCurrentView} playMusic={false} showRepeat={false} volume={volume} />}
      </main>

      {/* Global Ambience Audio Players */}
      {SOUND_TRACKS.map(track => (
        <audio
          key={track.id}
          ref={el => { if (el) audioRefs.current[track.id] = el; }}
          src={track.url}
          loop
        />
      ))}
    </div>
  );
}

export default App;
