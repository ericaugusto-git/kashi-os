# kashi-os

A web-based operating system built with React and TypeScript.
Inspired by linux, [hyprland](https://github.com/hyprwm/Hyprland) and [hyprdots](https://github.com/prasanthrangan/hyprdots).

## Table of Contents
- [Features](#-features)
- [OS Apps](#os-apps)
- [Getting Started](#-getting-started)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🌟 Features

 **🗃️ File System**
- Built with [BrowserFS](https://github.com/jvilk/BrowserFS). 
- All the files and folders are stored on the browser [IndexDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).
- Files and folders creation through drag and drop and new file/folder context menu option.

🖥️ **Desktop**
  - [react-rnd](https://github.com/bokuweb/react-rnd) windows that can be minimized, maximazed, closed and dragged arround.
  - Right click context menu with dynamic options depending on target (file, folder, desktop area, etc).
  - Start menu with options to change the OS status (off/sleep) and a list of apps.
  - Responsive desktop [grid layout](https://github.com/react-grid-layout/react-grid-layout).
  - Draggable desktop icons with persistent positioning.
  
🖼️ **Personalization**
  - Three different themes (Lake slate, Nord and Cozy)
  - List of wallpapers per theme, gathered from [pexels](https://www.pexels.com/pt-br/) and [freepik](https://br.freepik.com/)
  - Two desktop orientation options with taskbar on top or bottom.
  - Show/hide desktop icons.

### OS Apps

#### 🎮 [EmulatorJS](https://github.com/EmulatorJS/EmulatorJS)
- Multiple game systems emulation thanks to [EmulatorJS](https://github.com/EmulatorJS/EmulatorJS).
- Auto state save to IndexDB with exit.
- Persist list of games on [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

#### 💻 [Xterm.js terminal](https://xtermjs.org/)
- Neofetch
- File system manipulation commands Ex: rm, mv, mkdir, etc
- Weather information with [wttr](https://github.com/chubin/wttr.in)

#### 📝 [Monaco editor](https://github.com/microsoft/monaco-editor)
- Monaco editor integration
- Syntax highlighting
- File saving support

#### 🎨 Paint
- Basic drawing capabilities
- Color picker
- Various tools

#### 🌐 Browser
- Web page rendering
- Navigation controls
- Integrated experience

## 🚀 Getting Started

1. Environment
Create a `.env` file in the root directory with the following variables:
```bash
VITE_REACT_GIPHY_API_KEY=your_giphy_api_key
VITE_REACT_GITHUB_TOKEN=your_github_token
```
2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```
