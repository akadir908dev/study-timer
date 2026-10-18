import { useState } from "react";
import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window";

const appWindow = getCurrentWindow();

export default function TitleBar() {
  const [isPinned, setIsPinned] = useState(true);

  const [isMini, setIsMini] = useState(false);

  const togglePin = async () => {
    const newState = !isPinned;
    await appWindow.setAlwaysOnTop(newState);
    setIsPinned(newState);
  };

  const toggleMini = async () => {
    const newState = !isMini;
    if (newState) {
      await appWindow.setSize(new LogicalSize(150, 80));
    } else {
      await appWindow.setSize(new LogicalSize(240, 256));
    }
    setIsMini(newState);
  };

  return (
    <div className="titlebar">
      <div className="titlebar-drag-region" data-tauri-drag-region>
        <span className="titlebar-title" data-tauri-drag-region>Study Timer</span>
      </div>
      <div className="titlebar-actions">
        <button
          className={`titlebar-button ${isMini ? 'text-blue-400' : ''}`}
          onClick={toggleMini}
          title={isMini ? "Restore Size" : "Mini Player"}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMini ? (
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
            ) : (
              <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7"/>
            )}
          </svg>
        </button>
        <button
          className={`titlebar-button pin ${isPinned ? 'active' : ''}`}
          onClick={togglePin}
          title={isPinned ? "Unpin from top" : "Pin to top"}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill={isPinned ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="17" x2="12" y2="22"></line>
            <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path>
          </svg>
        </button>
        <button
          className="titlebar-button"
          onClick={() => appWindow.minimize()}
          title="Minimize"
        >
          &#8211;
        </button>
        <button
          className="titlebar-button close"
          onClick={() => appWindow.close()}
          title="Close"
        >
          &#10005;
        </button>
      </div>
    </div>
  );
}
