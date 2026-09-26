import { useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";

const appWindow = getCurrentWindow();

export default function TitleBar() {
  const [isPinned, setIsPinned] = useState(true);

  const togglePin = async () => {
    const newState = !isPinned;
    await appWindow.setAlwaysOnTop(newState);
    setIsPinned(newState);
  };

  return (
    <div className="titlebar">
      <div className="titlebar-drag-region" data-tauri-drag-region>
        <span className="titlebar-title" data-tauri-drag-region>Study Timer</span>
      </div>
      <div className="titlebar-actions">
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
