# Portfolio

Welcome to my portfolio, the O.S version! Featuring a desktop-inspired UI, this site showcase a collection of applications that I have developed. Explore my projects and discover the creativity and functionality behind each one. Whether you're seeking innovative solutions or simply curious about my work, this portfolio offers a glimpse into my skills and expertise. Many thanks for stopping by!

## TODO List

- [x] Create component for media player
- [x] Make media player responsive
- [x] Create dark and cappucino theme
- [x] Change language: english and pt-br
- [x] Calendar component
- [x] CMD
- [x] Paint
- [x] Credits
- [x] Put to sleep: load lockscreen
- [x] Shutdown
- [x] Close startmenu and calendar with click outside
- [ ] Refactor StartSetterContext
- [ ] Refactor providers
- [ ] Paint redesign
- [ ] Improve experience in mobile (oh boy...)
- [x] Only ask for location if it's on pc
- [x] Move all heavy assets to CDN
- [ ] Re-do folders structure
- [x] Add fallback image for when the wallpaper don't load and fallback color for when the image don't load lol
- [x] Hyprland inspired change wallpaper animations

## KNOWN ISSUES

- [x] Close unfocused windows
- [x] Taskbar disappears when user open window on mobile
- [x] Window onClick functions not working on mobile
- [x] Resizing window should stop at taskbar
- [x] Iframe reloads when changing window focus
- [ ] Autosave with nitendo 64 games corrupts the save

### Cool open source projects to add in the future

- [ ] https://github.com/1j01/jspaint
- [x] https://demo.emulatorjs.org


```
portfolio-os
├─ .env
├─ .eslintrc.cjs
├─ .git
│  ├─ config
│  ├─ description
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  ├─ sendemail-validate.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ objects
│  │  ├─ info
│  │  └─ pack
│  │     ├─ pack-5784a52889f4158c4b5d5551ab0192e7f73d3557.idx
│  │     ├─ pack-5784a52889f4158c4b5d5551ab0192e7f73d3557.pack
│  │     └─ pack-5784a52889f4158c4b5d5551ab0192e7f73d3557.rev
│  ├─ packed-refs
│  └─ refs
│     ├─ heads
│     │  └─ main
│     ├─ remotes
│     │  └─ origin
│     │     └─ HEAD
│     └─ tags
├─ .gitignore
├─ i18n.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ cursor.svg
│  ├─ dino.ico
│  ├─ EmulatorJS.png
│  ├─ favicon.ico
│  ├─ grabbing.svg
│  ├─ pointer.svg
│  ├─ Poweredby_100px-Black_VertLogo.png
│  └─ under_dev.png
├─ README.md
├─ src
│  ├─ App.tsx
│  ├─ assets
│  │  ├─ cables.gif
│  │  ├─ cmd
│  │  │  ├─ screen_icon.svg
│  │  │  ├─ xterm.png
│  │  │  └─ xterm.svg
│  │  ├─ contextMenu
│  │  │  ├─ check.svg
│  │  │  ├─ desktop_off.svg
│  │  │  ├─ desktop_on.svg
│  │  │  ├─ lofi.svg
│  │  │  ├─ mail.svg
│  │  │  ├─ maximize.svg
│  │  │  ├─ minimize.svg
│  │  │  ├─ new_file.svg
│  │  │  ├─ phone.svg
│  │  │  └─ reset.svg
│  │  ├─ cursor.svg
│  │  ├─ desktop
│  │  │  ├─ avatar.png
│  │  │  ├─ disc.svg
│  │  │  ├─ finance.png
│  │  │  ├─ firefox.svg
│  │  │  ├─ food.svg
│  │  │  ├─ jdm.png
│  │  │  ├─ jdm.svg
│  │  │  ├─ playlist.svg
│  │  │  └─ resume.svg
│  │  ├─ emulator
│  │  │  ├─ controller.svg
│  │  │  └─ info.svg
│  │  ├─ jdm.png
│  │  ├─ paint
│  │  │  ├─ dashed.svg
│  │  │  ├─ download.svg
│  │  │  ├─ eraser.svg
│  │  │  ├─ round.svg
│  │  │  └─ square.svg
│  │  ├─ playlist
│  │  │  ├─ close.svg
│  │  │  ├─ exit_fullscreen.svg
│  │  │  ├─ fullscreen.svg
│  │  │  ├─ gif.svg
│  │  │  ├─ mute.svg
│  │  │  ├─ next.svg
│  │  │  ├─ pause.svg
│  │  │  ├─ play.svg
│  │  │  ├─ pomodoro.svg
│  │  │  ├─ previous.svg
│  │  │  └─ speaker.svg
│  │  ├─ pointer.svg
│  │  ├─ portfolio.png
│  │  ├─ samba.png
│  │  ├─ startMenu
│  │  │  ├─ brush.png
│  │  │  ├─ cmd.png
│  │  │  ├─ cmd2.png
│  │  │  ├─ handshake.png
│  │  │  ├─ handshake.svg
│  │  │  ├─ locked.svg
│  │  │  ├─ playlist.png
│  │  │  ├─ playlist.svg
│  │  │  ├─ power_off.svg
│  │  │  ├─ search.svg
│  │  │  ├─ sleep.svg
│  │  │  └─ start_menu.gif
│  │  ├─ taskbar
│  │  │  ├─ battery.svg
│  │  │  ├─ calendar.svg
│  │  │  ├─ clock.svg
│  │  │  ├─ contact
│  │  │  │  ├─ github.svg
│  │  │  │  ├─ linkedin.svg
│  │  │  │  ├─ mail-icon.svg
│  │  │  │  ├─ mail.svg
│  │  │  │  └─ phone.svg
│  │  │  ├─ ethernet.svg
│  │  │  ├─ languages_icons
│  │  │  │  ├─ brazil_flag.png
│  │  │  │  ├─ brazil_flag.svg
│  │  │  │  ├─ globe.png
│  │  │  │  ├─ globe.svg
│  │  │  │  └─ globe2.svg
│  │  │  ├─ performance.svg
│  │  │  ├─ skills
│  │  │  │  ├─ angular.png
│  │  │  │  ├─ html.png
│  │  │  │  ├─ html.svg
│  │  │  │  ├─ image 24.png
│  │  │  │  ├─ python.png
│  │  │  │  ├─ react.png
│  │  │  │  ├─ react.svg
│  │  │  │  ├─ sass.png
│  │  │  │  ├─ sass.svg
│  │  │  │  ├─ typescript.png
│  │  │  │  └─ typescript.svg
│  │  │  ├─ start_icon.png
│  │  │  ├─ taskbar_switcher.svg
│  │  │  ├─ themes_icons
│  │  │  │  ├─ cappuccino.png
│  │  │  │  ├─ moon.png
│  │  │  │  └─ sunset.png
│  │  │  ├─ theme_change.svg
│  │  │  ├─ wallpaper_change.svg
│  │  │  └─ wifi.svg
│  │  ├─ taskbar.png
│  │  ├─ weather
│  │  │  ├─ humidity.svg
│  │  │  ├─ sad_zeus.png
│  │  │  ├─ sunrise.svg
│  │  │  ├─ sunset.svg
│  │  │  └─ wind.svg
│  │  ├─ window
│  │  │  ├─ close.svg
│  │  │  ├─ lock.svg
│  │  │  ├─ maximize.svg
│  │  │  └─ minimize.svg
│  │  └─ Yesterdays.mp3
│  ├─ CodeEditor
│  │  └─ CodeEditor.tsx
│  ├─ constants
│  │  ├─ asciiArt.ts
│  │  ├─ credits.ts
│  │  ├─ emulatorCores.ts
│  │  ├─ resume.ts
│  │  ├─ themes.ts
│  │  ├─ wallpapers.ts
│  │  ├─ window.ts
│  │  └─ windowsTemplate.ts
│  ├─ contexts
│  │  ├─ ContextMenuContext.tsx
│  │  ├─ DesktopPositonContext.tsx
│  │  ├─ PcStatusContext.tsx
│  │  ├─ ThemeContext.tsx
│  │  ├─ WallpaperContext.tsx
│  │  ├─ WheaterContext.tsx
│  │  └─ WindowContext.tsx
│  ├─ Desktop
│  │  ├─ components
│  │  │  ├─ ContextMenu
│  │  │  │  ├─ ContextMenu.module.scss
│  │  │  │  └─ ContextMenu.tsx
│  │  │  ├─ Lockscreen
│  │  │  │  ├─ Lockscreen.module.scss
│  │  │  │  └─ Lockscreen.tsx
│  │  │  └─ Lofi
│  │  │     ├─ config.ts
│  │  │     ├─ Gifs.module.scss
│  │  │     ├─ Gifs.tsx
│  │  │     ├─ links.html
│  │  │     ├─ Lofi.module.scss
│  │  │     ├─ Lofi.tsx
│  │  │     ├─ LofiPlayer.module.scss
│  │  │     └─ LofiPlayer.tsx
│  │  ├─ Desktop.module.scss
│  │  └─ Desktop.tsx
│  ├─ DesktopIcons
│  │  ├─ components
│  │  │  └─ DesktopIcon
│  │  │     ├─ DesktopIcon.module.scss
│  │  │     └─ DesktopIcon.tsx
│  │  ├─ DesktopIcons.tsx
│  │  └─ DestopIcons.module.scss
│  ├─ EmulatorJS
│  │  ├─ EmulatorJS.module.scss
│  │  └─ EmulatorJS.tsx
│  ├─ global.d.ts
│  ├─ hooks
│  │  ├─ useCloseWindow.tsx
│  │  ├─ useComponentVisible.tsx
│  │  ├─ useDateTime.tsx
│  │  ├─ useOpenWindow.tsx
│  │  └─ useWeather.tsx
│  ├─ index.css
│  ├─ local-echo.d.ts
│  ├─ main.tsx
│  ├─ Resume
│  │  ├─ Resume.module.scss
│  │  └─ Resume.tsx
│  ├─ StartMenu
│  │  ├─ components
│  │  │  ├─ Cmd
│  │  │  │  ├─ Cmd.module.scss
│  │  │  │  ├─ Cmd.tsx
│  │  │  │  ├─ CmdHeader
│  │  │  │  │  ├─ CmdHeader.module.scss
│  │  │  │  │  └─ CmdHeader.tsx
│  │  │  │  ├─ terminal_config.ts
│  │  │  │  └─ userInfo.ts
│  │  │  ├─ Credits
│  │  │  │  ├─ Credits.module.scss
│  │  │  │  └─ Credits.tsx
│  │  │  ├─ Paint
│  │  │  │  ├─ Paint.module.scss
│  │  │  │  └─ Paint.tsx
│  │  │  ├─ Playlist
│  │  │  │  ├─ Playlist.module.scss
│  │  │  │  └─ Playlist.tsx
│  │  │  └─ Search
│  │  │     ├─ Search.module.scss
│  │  │     └─ Search.tsx
│  │  ├─ StartMenu.module.scss
│  │  └─ StartMenu.tsx
│  ├─ Taskbar
│  │  ├─ components
│  │  │  ├─ Actions
│  │  │  │  ├─ Actions.module.scss
│  │  │  │  └─ Actions.tsx
│  │  │  ├─ Battery
│  │  │  │  ├─ Battery.module.scss
│  │  │  │  └─ Battery.tsx
│  │  │  ├─ Button
│  │  │  │  ├─ Button.module.scss
│  │  │  │  └─ Button.tsx
│  │  │  ├─ ButtonGroup
│  │  │  │  ├─ ButtonGroup.module.scss
│  │  │  │  └─ ButtonGroup.tsx
│  │  │  ├─ Calendar
│  │  │  │  ├─ Calendar.module.scss
│  │  │  │  ├─ Calendar.tsx
│  │  │  │  ├─ DateTime
│  │  │  │  │  ├─ DateTime.module.scss
│  │  │  │  │  └─ DateTime.tsx
│  │  │  │  └─ Weather
│  │  │  │     ├─ components
│  │  │  │     │  ├─ WeatherBody
│  │  │  │     │  │  ├─ WeatherBody.module.scss
│  │  │  │     │  │  └─ WeatherBody.tsx
│  │  │  │     │  ├─ WeatherError
│  │  │  │     │  │  ├─ WeatherError.module.scss
│  │  │  │     │  │  └─ WeatherError.tsx
│  │  │  │     │  └─ WeatherHeader
│  │  │  │     │     ├─ WeatherHeader.module.scss
│  │  │  │     │     └─ WeatherHeader.tsx
│  │  │  │     ├─ Weather.module.scss
│  │  │  │     └─ Weather.tsx
│  │  │  ├─ Clock
│  │  │  │  ├─ Clock.module.scss
│  │  │  │  └─ Clock.tsx
│  │  │  ├─ ClockHypr
│  │  │  │  ├─ ClockHypr.module.scss
│  │  │  │  └─ ClockHypr.tsx
│  │  │  ├─ Contact
│  │  │  │  ├─ Contact.module.scss
│  │  │  │  └─ Contact.tsx
│  │  │  ├─ Intro
│  │  │  │  ├─ Gradient.module.css
│  │  │  │  ├─ Intro.module.scss
│  │  │  │  └─ Intro.tsx
│  │  │  ├─ MiniAllBtn
│  │  │  │  ├─ MiniAllBtn.module.scss
│  │  │  │  └─ MiniAllBtn.tsx
│  │  │  ├─ Network
│  │  │  │  ├─ Network.module.scss
│  │  │  │  └─ Network.tsx
│  │  │  ├─ PcStatusMenu
│  │  │  │  ├─ PcStatusMenu.module.scss
│  │  │  │  └─ PcStatusMenu.tsx
│  │  │  ├─ Performance
│  │  │  │  ├─ Performance.module.scss
│  │  │  │  └─ Performance.tsx
│  │  │  ├─ Skills
│  │  │  │  ├─ Skills.module.scss
│  │  │  │  └─ Skills.tsx
│  │  │  ├─ Start
│  │  │  │  ├─ Start.module.scss
│  │  │  │  └─ Start.tsx
│  │  │  ├─ ThemeSwitcher
│  │  │  │  ├─ ThemeSwitcher.module.scss
│  │  │  │  └─ ThemeSwitcher.tsx
│  │  │  ├─ WallpaperSwitcher
│  │  │  │  ├─ WallpaperSwitcher.module.scss
│  │  │  │  └─ WallpaperSwitcher.tsx
│  │  │  ├─ Windows
│  │  │  │  ├─ Windows.module.scss
│  │  │  │  └─ Windows.tsx
│  │  │  └─ WindowsHypr
│  │  │     ├─ WindowsHypr.module.scss
│  │  │     └─ WindowsHypr.tsx
│  │  ├─ LocaleSwitcher
│  │  │  └─ LocaleSwitcher.tsx
│  │  ├─ Taskbar.module.scss
│  │  ├─ Taskbar.tsx
│  │  ├─ TaskbarHypr.module.scss
│  │  └─ TaskbarHypr.tsx
│  ├─ UnderDev
│  │  ├─ UnderDev.module.scss
│  │  └─ UnderDev.tsx
│  ├─ utils
│  │  └─ utils.ts
│  ├─ vite-env.d.ts
│  └─ Window
│     ├─ components
│     │  └─ WindowContent
│     │     ├─ WindowContent.module.scss
│     │     └─ WindowContent.tsx
│     ├─ Window.module.scss
│     └─ Window.tsx
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```