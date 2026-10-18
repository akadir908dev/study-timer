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

  useEffect(() => {
    localStorage.setItem("themeColor", themeColor);
  }, [themeColor]);

  useEffect(() => {
    localStorage.setItem("opacity", opacity.toString());
  }, [opacity]);

  useEffect(() => {
    localStorage.setItem("volume", volume.toString());
  }, [volume]);

  return (
    <div
      className="app-container"
      style={{ backgroundColor: `rgba(${hexToRgb(themeColor)}, ${opacity})` }}
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
        {currentView === "history" && <History onNavigate={setCurrentView} />}
        {currentView === "settings" && (
          <Settings
            onNavigate={setCurrentView}
            themeColor={themeColor}
            setThemeColor={setThemeColor}
            opacity={opacity}
            setOpacity={setOpacity}
            volume={volume}
            setVolume={setVolume}
          />
        )}
        {currentView === "finished" && <Finished onNavigate={setCurrentView} volume={volume} />}
        {currentView === "finished-silent" && <Finished onNavigate={setCurrentView} playMusic={false} showRepeat={false} volume={volume} />}
      </main>
    </div>
  );
}

export default App;
