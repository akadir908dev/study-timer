# Study Timer ⏱️(v1.2)

Welcome to my personal Study Timer! It' to help manage focus sessions. It features a borderless, always-on-top window that stays out of your way while keeping you on track. I also added a 20px border-radius to the window to make it look more modern.

Built with **Tauri v2**, **React**, **TypeScript**, and **Tailwind CSS**.

---

## 🚀 Features (Current)
- **Countdown Mode:** The original mode. You can set a time and the timer will count down. Perfect for timed study sessions.
- **Stopwatch Mode:** Stopwatch mode is here. You can now track your time for your study sessions.
- **Always On Top:** Pin the timer to float seamlessly above your other windows.
- **Frosted Glass UI:** A beautiful, draggable transparent UI with rounded corners.
- **Native Notifications:** Triggers a native Windows toast notification and an achievement sound when the timer finishes.
- **Minimalist Controls:** Simple play, pause, and end controls that get straight to the point.

---

## 🔮 Upcoming Updates
I'm actively building out new features to make this better. Soon you will be able to customize the whole app directly from a settings menu:
- 🎨 **Adjustable Colors:** Change the theme and colors to match your desktop aesthetic. I am currently working on some designs for the look of the map, perhaps I will make a fork of this if the design looks very different.
- 🪟 **Adjustable Transparency:** I want to make the background frosted glass, letting you adjust the transparency.
- 🔊 **Volume Control:** A slider to adjust the ending achievement sound.
- 🍅 **Pomodoro Mode:** Built-in Pomodoro intervals and stopwatch modes.
- ⏱️ **Stopwatch improvements:** The ability to flag different intervals of time and save them to a list to view later. Also the ability to save your times as a list so you can see your progress.

---

## 🛠️ Development

If you want to run this repo locally, you will need Node.js and Rust installed.

```bash
# Install dependencies
npm install

# Run the desktop app in development mode
npm run tauri dev

# Build the final Windows installer
npm run tauri build
```
