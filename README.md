# kashi-os

A web-based operating system built with React and TypeScript. Also an interactive portfolio.
Inspired by linux, [hyprland](https://github.com/hyprwm/Hyprland) and [hyprdots](https://github.com/prasanthrangan/hyprdots).

## 🌟 Features

 **🗃️ File System**
- Built with [BrowserFS](https://github.com/jvilk/BrowserFS). All the files and folders are stored on the browser [IndexDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).
- Files and folders creation through drag and drop and new file/folder button.

🖥️ **Desktop**
  - Context menu with dynamic options depending on target (file, folder, desktop area, etc).
  - Start menu with options to turn the "pc" off and or put it to sleep and a list of OS apps.
  - [react-rnd](https://github.com/bokuweb/react-rnd) windows that can be  minimazed, maximazed, closed and dragged arround.
  - Responsive desktop [grid](https://github.com/react-grid-layout/react-grid-layout) with persistent desktop icon position.
  
🖼️ **Personalization**
  - An selection of three different themes (Lake slate, Nord and Cozy)
  - List of wallpapers per theme, gathered from [pexels](https://www.pexels.com/pt-br/) and [freepik](https://br.freepik.com/)

### Applications

#### 🎮 EmulatorJS
- Multiple system emulation support
- ROM management system
- Save state support
- Localization support

#### 💻 Terminal
- System information display
- File system navigation
- Weather information
- Custom commands

#### 📝 File Editor
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
