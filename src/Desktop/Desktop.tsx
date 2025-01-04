import GameOver from "@/GameOver/GameOver";
import { APPS, AppType } from "@/constants/apps";
import { useFileSystem } from "@/contexts/FileSystemContext";
import { useWindowContext } from "@/contexts/WindowContext";
import { AnimatePresence, motion } from "framer-motion";
import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { StartSetterContext } from "../App";
import DesktopIcons from "../DesktopIcons/DesktopIcons";
import StartMenu from "../StartMenu/StartMenu";
import Search from "../StartMenu/components/Search/Search";
import TaskbarHypr from "../Taskbar/TaskbarHypr";
import { PcStatusMenu } from "../Taskbar/components/PcStatusMenu/PcStatusMenu";
import ThemeSwitcher from "../Taskbar/components/ThemeSwitcher/ThemeSwitcher";
import WallpaperSwitcher from "../Taskbar/components/WallpaperSwitcher/WallpaperSwitcher";
import Window from "../Window/Window";
import { themes, transitionMs } from "../constants/themes";
import { wallpapers } from "../constants/wallpapers";
import { useContextMenuHandler } from "../contexts/ContextMenuContext";
import { useDesktopPosition } from "../contexts/DesktopPositonContext";
import { usePcStatus } from "../contexts/PcStatusContext";
import { useTheme } from "../contexts/ThemeContext";
import { useWallpaper } from "../contexts/WallpaperContext";
import useComponentVisible from "../hooks/useComponentVisible";
import styles from "./Desktop.module.scss";
import ContextMenu from "./components/ContextMenu/ContextMenu";
import Lockscreen from "./components/Lockscreen/Lockscreen";
import Lofi from "./components/Lofi/Lofi";
import Sleep from "./components/Sleep/Sleep";


function Desktop() {

  const [pcStatus, setPcStatus] = usePcStatus();
  const startButtonRef = useRef<HTMLButtonElement | null>(null);
  const pcStatusButtonRef = useRef<HTMLButtonElement | null>(null);
  const [startMenuRef, isStartMenuOpen, setisStartMenuOpen] = useComponentVisible(false, startButtonRef);
  const [pcStatusMenuRef, pcStatusMenuOpen, setPcStatusMenuOpen] = useComponentVisible(false, pcStatusButtonRef);
  const [searchRef, searchVisible, setSearchVisible] = useComponentVisible(false);
  const [themesFile, setThemesFile] = useState(themes);
  const [theme, setTheme] = useTheme();
  const [, setWindows] = useWindowContext();
  const isInitialMount = useRef(true);
  
  const [wallpaperUrl, setWallpaperUrl] = useState<string | undefined>();
  const [wpprFallback, setWpprFallback] = useState<string>();
  const [newWallpaper, setNewWallpaper] = useState<string | undefined>();
  const [wallpaperName, setWallpaperName] = useWallpaper();

  const [position] = useDesktopPosition();

  const themeButtonRef = useRef(null);
  const wallpaperButtonRef = useRef(null);
  const  [themeSwitcherRef, themeSwitcherOpen, setThemeSwitcherOpen ] = useComponentVisible(false,themeButtonRef);
  const  [wallpaperSwitcherRef, wallpaperSwitcherOpen, setwWallpaperSwitcherOpen ] = useComponentVisible(false,wallpaperButtonRef);


  const handleContextMenu = useContextMenuHandler("desktop", undefined, '/home/desktop');
  const [isDesktopHidden, setDesktopHidden] = useState(localStorage.getItem("desktop_icon_visibility") === "true");
  const [apps, setApps] = useState<AppType[] | null>(null);
  const {fileList, handleDrop, createFileFromUrl, deletePath, pathExists, readDirectory, readFile, getFileUrl, fs} = useFileSystem();
  
  useEffect(() => {
    const setupApps = () => {
      if(fileList){
        const files = fileList['/home/desktop'];
        const windows = APPS.filter((a) => a.desktop);
        const apps = files ? [...windows, ...files] : windows;
        setApps(apps);
      }
    }
    setupApps()
  }, [fileList]);
  
  const getWpprUrl = useCallback(async (wppr: string) => {
    if(!wppr) return;
    const wpprPath = `${themesFile[theme].wpprsPath}/${wppr}`
    const url = await getFileUrl(wpprPath);    
    return url;
  }, [getFileUrl, theme]);

  useEffect(() => {
    // this is a mess but I gotta move on, well refactor in optimization phase.
    const loadWallpapers = async () => {
      if(!fs) return;
      
      // Cache map in localStorage
      const map = localStorage.getItem('wpprMap') || '{}';
      const wpprMap = JSON.parse(map);
      
      // Load first wallpaper immediately for initial display
      const firstWallpaper = wallpapers[theme]?.[0];
      if (!wpprMap[firstWallpaper]) {
        const fileName = await createFileFromUrl(themesFile[theme].wpprsPath, firstWallpaper);
        // if(isInitialMount.current){
        // }
        setWallpaperName(() => fileName!)
        changeWallpaper(!isInitialMount.current);
        wpprMap[firstWallpaper] = 'created';
        localStorage.setItem('wpprMap', JSON.stringify(wpprMap));
      }
    
      // Load rest of wallpapers in parallel
      const otherWallpapers = wallpapers[theme].slice(1);
      const firstWpprThemesMap = new Map<string, string>();
      const firstWpprs = Object.entries(wallpapers)
      .map(([key, wpprs]) => {if(key !== theme){ firstWpprThemesMap.set(wpprs[0], key);return wpprs[0]}})
      .filter((wppr): wppr is string => wppr !== undefined);
      await Promise.all([...firstWpprs,...otherWallpapers].map(async wppr => {
        if (!wpprMap[wppr]) {
          const thm = firstWpprThemesMap.get(wppr) ?? theme;
          await createFileFromUrl(themes[thm].wpprsPath, wppr);
          wpprMap[wppr] = 'created';
        }
      }));
    
      localStorage.setItem('wpprMap', JSON.stringify(wpprMap));
    }
    loadWallpapers();
  }, [theme, createFileFromUrl, getWpprUrl]);

  useEffect(() => {
    const checkIfWpprIsStillAlive = async () => { 
    const url = await getWpprUrl(wallpaperName!);
    if(!url){
      const files = await readDirectory(themesFile[theme].wpprsPath);
      if(files[0])
      setWallpaperName(() => files[0]);
      else {setWallpaperName(null); setWallpaperUrl(undefined); localStorage.setItem(theme + "_wallpaper", 'null');}
    }
  }
  if(wallpaperUrl)
    checkIfWpprIsStillAlive();
  }, [fileList]);
  
  useEffect(() => {
    const getThemesFile = async () => {
      const path = '/.config/themes.json';
      if(!await pathExists(path) && fs){
        setWindows([]);
        setPcStatus('game_over');
        return;
      }

      const fileBuffer = await readFile(path);
      if(fileBuffer){
        const fileJson = fileBuffer ? JSON.parse(fileBuffer.toString()) : null;
        const firstTheme = Object.keys(fileJson)[0];
        
        if(!fileJson[theme]){
          if(!firstTheme){
            deletePath('/.config', 'themes.json');
            setWindows([]);
            setPcStatus('game_over')
            return;
          }
          setWallpaperName(null)
          setTheme(firstTheme);
        }
        setThemesFile(fileJson);
      }
    }
    getThemesFile();
  }, [fileList]);


  // useEffect(() => {
  //   const setLayout = async () => {
  //     const files = await listFiles('/');
  //     
  //     if(files){
  //       const { layout, apps } = generateLayouts(files);
  //       setLayouts(layout);
  //       setApps(apps);
  //     }
  //   }
  //   setLayout();
  // }, [listFiles])


  function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  const changeWallpaper = async (transition: boolean, wpprUrl?: string, name?: string) => {
    try{
      const wpprName = name ?? wallpaperName ?? localStorage.getItem(theme + "_wallpaper");
      if((!wpprName || wpprName == "null") && !wpprUrl) return;
      const newWpprUrl = wpprUrl ?? await getWpprUrl(wpprName!);
      if(!newWpprUrl) return;
      if(wpprName && newWpprUrl){
        localStorage.setItem(theme + "_wallpaper", wpprName!);
        isInitialMount.current = false;
      }
      if(transition){
        setNewWallpaper(newWpprUrl);
        await timeout(parseInt(transitionMs, 10));
        setNewWallpaper(undefined)
      }
      setWallpaperUrl(newWpprUrl);
      setTimeout(() => setWpprFallback(undefined), 200)
    }catch(e){
      console.log(e);
    }
  };





  useEffect(() => {
    // setWallpaper(theme === 'light' ? topography : code);
    if(isInitialMount.current && !localStorage.getItem(theme + "_wallpaper")){
      setWpprFallback(wallpapers[theme][0]);
    }
    localStorage.setItem("theme", theme);
    if(fs)
    changeWallpaper(!isInitialMount.current);
   
  }, [theme, wallpaperName, fs]);



  // const [a, setA] = useState(false);
  useEffect(() => {
    // joke of the year
    const shutup = (event: MouseEvent) => {
      if (!startMenuRef?.current?.contains(event.target as Node) && !pcStatusMenuRef?.current?.contains(event.target as Node) && (pcStatus == "sleeping" || pcStatus == 'shutdown')) {
        setPcStatus("on");
      }
    };
    window.addEventListener("click",shutup);
    return () => window.removeEventListener("click", shutup);
  }, [pcStatus, setPcStatus, startMenuRef]);

  const screenHandle = useFullScreenHandle();

  const handleDropWrapper = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleDrop('/home/desktop', event);
  }



  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  return (
    <FullScreen handle={screenHandle}>
      <div
      onDragOver={handleDragOver}
      onDrop={handleDropWrapper}
        className={
          `${(pcStatus == "on" ? styles.desktop : styles[pcStatus])} ${styles[position]} desktop_${position}`
        }
        style={{'--theme-color': themesFile[theme].color,'--font-color': themesFile[theme].font, '--accent-color': themesFile[theme].accent, '--darker-color': themesFile[theme].darker_color,  '--theme-transition-ms': transitionMs} as CSSProperties}
      >

          <div ref={themeSwitcherRef}>
              <ThemeSwitcher setThemeSwitcherOpen={setThemeSwitcherOpen} themeSwitcherOpen={themeSwitcherOpen} themes={themesFile} currentWpprUrl={wallpaperUrl!}/>
          </div>
          <div ref={wallpaperSwitcherRef}>
              <WallpaperSwitcher setwWallpaperSwitcherOpen={setwWallpaperSwitcherOpen} themes={themesFile} wallpaperSwitcherOpen={wallpaperSwitcherOpen}/>
          </div>
        
        {/* The context menu */}
        <ContextMenu isDesktopHidden={isDesktopHidden} setDesktopHidden={setDesktopHidden} screenHandle={screenHandle} setThemeSwitcherOpen={setThemeSwitcherOpen} setwWallpaperSwitcherOpen={setwWallpaperSwitcherOpen}/>
        {/* The wallpaper */}
        <div className={styles.wallpaper_wrapper}>
        <div className={`backgroundImage ${styles.wallpaperImg}`}  style={{backgroundImage: `url("${wpprFallback}")`}}></div>
        <div className={`backgroundImage ${styles.wallpaperImg}`}  style={{backgroundImage: `url("${wallpaperUrl}")`}}></div>
        {newWallpaper && (<div className={`backgroundImage ${styles.wallpaperImg} ${styles.circle}  ${styles[position]}`}  style={{backgroundImage: `url("${newWallpaper}")`}}></div>)}
        </div>

        {/* wrapper for the actual high elements of the desktop, Windows array, Taskbar, Desktopicons */}
        <div style={{ display: pcStatus !== "on" ? "none" : "" }}>
            <div ref={searchRef}><Search searchVisible={searchVisible} setSearchVisible={setSearchVisible} wallpaperUrl={wallpaperUrl!}/></div>
            <div ref={pcStatusMenuRef}><PcStatusMenu pcStatusMenuOpen={pcStatusMenuOpen} setPcStatusMenuOpen={setPcStatusMenuOpen} /></div>
            {/* Array of windows */}
            <Window wrapperClass={styles.desktopIconsWrapper}>
            </Window>
            {/* <DesktopIcons /> */}
            <div style={{[position == 'top' ? 'bottom' : 'top']: 0}} onContextMenu={handleContextMenu} className={styles.desktopIconsWrapper}>
            {!isDesktopHidden && <DesktopIcons apps={apps}/>}

            </div>
            <StartSetterContext.Provider
              value={[isStartMenuOpen, setisStartMenuOpen, startButtonRef]}
            >
              <div ref={startMenuRef}>{<StartMenu themes={themesFile} setSearchVisible={setSearchVisible} />}</div>
              {/* <Taskbar /> */}
              <TaskbarHypr setPcStatusMenuOpen={setPcStatusMenuOpen} pcStatusButtonRef={pcStatusButtonRef} setwWallpaperSwitcherOpen={setwWallpaperSwitcherOpen}  setThemeSwitcherOpen={setThemeSwitcherOpen} wallpaperButtonRef={wallpaperButtonRef} themeButtonRef={themeButtonRef}/>
            </StartSetterContext.Provider>
        </div>
        {pcStatus === "sleeping" && <AnimatePresence><motion.div initial={{opacity: 0}} animate={{opacity: 1}}><Sleep wallpaperUrl={wallpaperUrl}/></motion.div></AnimatePresence>}
        {pcStatus === "lock" && <AnimatePresence><motion.div initial={{opacity: 0}} animate={{opacity: 1}}><Lockscreen wallpaperUrl={wallpaperUrl}/></motion.div></AnimatePresence>  }
        {pcStatus === 'lofi' && <div ><Lofi screenHandle={screenHandle}/></div>}
        {pcStatus === 'game_over' && <GameOver />}
      </div>
    </FullScreen>
  );
}

export default Desktop;
