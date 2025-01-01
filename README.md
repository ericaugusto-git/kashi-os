# kashi-os
<p>
A web-based operating system built with React and TypeScript.
</p>

![kashi-os](https://github.com/user-attachments/assets/2035809f-a37f-4e78-8acd-52ed5d4f2210)

<p>
Inspired by linux, macOS, [hyprland](https://github.com/hyprwm/Hyprland) and [hyprdots](https://github.com/prasanthrangan/hyprdots).
</p>

## 🌟 Features

 **🗃️ File System**
- Built with [BrowserFS](https://github.com/jvilk/BrowserFS). 
- All the files and folders are stored on the browser [IndexDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).
- Files and folders creation through drag and drop and new file/folder context menu option.
- OS configuration files are stored and accesible on the FS (path /.config/) and any changes to it are reflected immediately on the OS.

🖥️ **Desktop**
  - [react-rnd](https://github.com/bokuweb/react-rnd) windows that can be minimized, maximized, closed and dragged arround, with smooth [framer-motion](https://motion.dev/) animations.
  - Right click context menu with dynamic options depending on target (file, folder, desktop area, etc).
  - Start menu with options to change the OS status (off/sleep) and a list of apps with search.
  - Custom desktop grid layout that has draggable desktop icons with persistent positioning.
  
🖼️ **Personalization**
  - Three different default themes (Lake slate, Nord and Cozy)
  - Default list of wallpapers per theme, gathered from [pexels](https://www.pexels.com/pt-br/) and [freepik](https://br.freepik.com/)
  - Two desktop orientation options with taskbar on top or bottom.
  - Show/hide desktop icons.
  - More themes can be created by editing the file at /.config/themes.json and there you can assign an folder path for new wallpapers.

### OS Apps

#### 🎮 [EmulatorJS](https://github.com/EmulatorJS/EmulatorJS)
- Multiple game systems emulation thanks to [EmulatorJS](https://github.com/EmulatorJS/EmulatorJS).
- Auto state save to the File System within exit on the path /.local/EmulatorJS/saves.
- Read and save list of games on /.local/EmulatorJS/roms.

#### 💻 [Xterm.js terminal](https://xtermjs.org/)
- Displays system informations with neofetch command.
- File system manipulation commands Ex: rm, mv, mkdir, etc
- Weather information with [wttr](https://github.com/chubin/wttr.in)

#### 📝 [Monaco editor](https://github.com/microsoft/monaco-editor)
- Editor for code and text files.

#### 🎨 Paint
- [react-painter](https://www.npmjs.com/package/react-painter) canvas.
- [react-color] color picker.
- Button to save art on File System at /home/pictures

#### 🌐 Browser
- Just a [google.com](google.com) embed :)

#### 🎧 Audio Player
- Plays audio files from the FS.
- Skip, Previous, Pause, Mute controls.
- Toggle view between audio file thumbnail or list of audio files on current folder.

## 🚀 Getting Started

1. Create a `.env` file in the root directory with the following variables:
```bash
VITE_REACT_WTTR_API_KEY=open_wttr_api_key (https://openweathermap.org/api)
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
