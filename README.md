# 🖥️ Kashi-OS

A web-based operating system built with React and TypeScript. Also an interactive portfolio.
Inspired by linux, [hyprland](https://github.com/hyprwm/Hyprland) and [hyprdots](https://github.com/prasanthrangan/hyprdots).

## 🌟 Features

### System
- **🗃️ File System**
  - Built with [BrowserFS](https://github.com/jvilk/BrowserFS) that writes to [IndexDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
  - File upload through drag and drop and new file context menu option
  - File explorer with foward, back and up a level navigation
  - Folders CRUD

- **Desktop Environment**
  - Context menu with dynamic options depending on target. (Ex menu for files: delete, rename, open)
  - An selection of three different themes (Lake slate, Nord and Cozy)
  - List of wallpapers per theme, gathered from [pexels](https://www.pexels.com/pt-br/) and [freepik](https://br.freepik.com/)
  - Start menu with list of my projects and the OS apps. 
  - Window system with minimize/maximize support
  - Desktop icons with grid layout
  - Multi-language support (i18n)

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
