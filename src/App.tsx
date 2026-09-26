import { useState } from "react";
import "./App.css";
import TitleBar from "./components/TitleBar";
import Menu from "./components/Menu";
import Start from "./components/Start";
import TimerMenu from "./components/TimerMenu";
import Timer from "./components/Timer";
import Finished from "./components/Finished";

function App() {
  const [currentView, setCurrentView] = useState("menu");
  const [timerDuration, setTimerDuration] = useState(0);

  return (
    <div className="app-container">
      <TitleBar />
      <main className="content">
        {currentView === "menu" && <Menu onNavigate={setCurrentView} />}
        {currentView === "start" && <Start onNavigate={setCurrentView} />}
        {currentView === "timerMenu" && (
          <TimerMenu 
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
        {currentView === "finished" && <Finished onNavigate={setCurrentView} />}
      </main>
    </div>
  );
}

export default App;
