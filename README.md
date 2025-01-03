# kashi-os
### A web-based operating system built with React and TypeScript.
![UntitledVideo-MadeWithClipchamp5-ezgif com-optimize (1)](https://github.com/user-attachments/assets/6bbde3d2-ae18-4630-96cf-b590770d23d6)
##### Inspired by linux, macOS, [hyprland](https://github.com/hyprwm/Hyprland) and [hyprdots](https://github.com/prasanthrangan/hyprdots).

## 🌟 Features

 **🗃️ File System**
- Built with [BrowserFS](https://github.com/jvilk/BrowserFS). 
- All the files and folders are stored on the browser [IndexDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).
- Files and folders creation through drag and drop and new file/folder context menu option.
- OS configuration files are stored and accesible on the FS (path /.config/) and any changes to it are reflected immediately on the OS.
- Currently file extensions that it tries to open (didn't try then all yet): (pdf, mp3, m3u, wav, ogg, aac, flac, m4a, wma, aiff, opus, amr, m3u8, mid, midi, kar, rmi, webm, pls, mp4, webm, mov, avi, 3gp, mpg, mpeg, m4v, ogv, 3g2, m2v, mpe, h264, mp2t, jpg, jpeg, png, gif, webp, svg, ico, bmp, tiff, tif, avif, apng, cur, jfif, pjpeg, pjp, dib, xbm, svgz) + roms supported by [EmulatorJS](https://github.com/EmulatorJS/EmulatorJS)

🖥️ **Desktop**
  - [react-rnd](https://github.com/bokuweb/react-rnd) windows that can be minimized, maximized, closed and dragged arround, with smooth [framer-motion](https://motion.dev/) animations.
  - Right click context menu with dynamic options depending on target (file, folder, desktop area, etc).
  - Start menu with options to change the OS status (off/sleep) and a list of apps with search. Also displays [giphy api](https://developers.giphy.com/) gifs that changes depending on theme.
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

## Why
Since I saw [this website](https://www.based.gg) three years ago (2022), I got the idea to do the same thing as a portfolio. So I made this [initial version](https://ericaugusto-portfolio.netlify.app) and I wasn't really happy with it, I didn't have the skills to make things work as intended, so I dropped it to git gud at front-end dev.

Two years later, I decided to pick it up again. Along the way I found a lot of inspiration on r/unixporn and especially in the work of Dustin Brett with daedalOS (the best personal website I've ever seen—absolute cinema). Dustin's project keeps showing me what's possible, which helps me keep pushing.

This project is a reflection of my progress since the first version, and with it, I'm still constantly improving. 

TLDR: It's just for fun like building Legos :)

## 👨‍💻 Try it out

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


