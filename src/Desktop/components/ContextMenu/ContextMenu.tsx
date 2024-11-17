import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { FullScreenHandle } from "react-full-screen";
import { Layouts } from "react-grid-layout";
import { useTranslation } from "react-i18next";
import desktop_off from '../../../assets/contextMenu/desktop_off.svg';
import desktop_on from '../../../assets/contextMenu/desktop_on.svg';
import lofi from '../../../assets/contextMenu/lofi.svg';
import maximize from '../../../assets/contextMenu/maximize.svg';
import minimmize from '../../../assets/contextMenu/minimize.svg';
import new_file from '../../../assets/contextMenu/new_file.svg';
import phone from '../../../assets/contextMenu/phone.svg';
import reset from '../../../assets/contextMenu/reset.svg';
import powerOff from "../../../assets/startMenu/power_off.svg";
import sleep from "../../../assets/startMenu/sleep.svg";
import mail from '../../../assets/taskbar/contact/mail.svg';
import taskbar_switcher from '../../../assets/taskbar/taskbar_switcher.svg';
import theme_change from '../../../assets/taskbar/theme_change.svg';
import wallpaper_change from '../../../assets/taskbar/wallpaper_change.svg';
import { ContextMenuProps, useContextMenu } from "../../../contexts/ContextMenuContext";
import { useDesktopPositionHandler } from "../../../contexts/DesktopPositonContext";
import { usePcStatus } from "../../../contexts/PcStatusContext";
import { useWindowContext } from "../../../contexts/WindowContext";
import { generateLayouts } from "../../../utils/utils";
import styles from './ContextMenu.module.scss';
import { useFileSystem } from "@/contexts/FileSystemContext";

type MenuProps = {    setwWallpaperSwitcherOpen: Dispatch<SetStateAction<boolean>>, 
  setThemeSwitcherOpen: Dispatch<SetStateAction<boolean>>,
  screenHandle: FullScreenHandle,
  setLayouts: Dispatch<SetStateAction<Layouts | null>>,
  isDesktopHidden: boolean,
  setDesktopHidden:  Dispatch<SetStateAction<boolean>>,
  folderPath?: string,
  source?: NonNullable<ContextMenuProps>['source']
}

let eventHandler: (event: string) => void;

export default function ContextMenu({isDesktopHidden, setDesktopHidden,setwWallpaperSwitcherOpen, setThemeSwitcherOpen, screenHandle, setLayouts}: MenuProps){
    const contextRef = useRef<HTMLUListElement>(null);
    const [menuProps, setMenuProps] = useContextMenu();
    const { x, y, source, handleCustomMenuEvent, folderPath } = menuProps || {};
    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setMenuProps(null);
    }
    useEffect(() => {
      if(handleCustomMenuEvent)
      eventHandler = handleCustomMenuEvent;
    }, [handleCustomMenuEvent])



    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (contextRef.current && !contextRef.current.contains(event.target as Node)) {
          setMenuProps(null);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    },[])
    
    return <>
    {x &&  <ul ref={contextRef} className={styles.contextMenu} style={{top: `${y}px`, left: `${x}px`}} onClick={handleClick}>
      {source == 'desktop' || source == 'folder' ? 
      <DesktopOptions source={source} folderPath={folderPath} isDesktopHidden={isDesktopHidden} setDesktopHidden={setDesktopHidden} setLayouts={setLayouts} screenHandle={screenHandle} setThemeSwitcherOpen={setThemeSwitcherOpen} setwWallpaperSwitcherOpen={setwWallpaperSwitcherOpen}/> : 
      <DesktopItemOptions source={source!}/>}
      </ul>}
    </>
}


function DesktopItemOptions({ source }: { source: NonNullable<ContextMenuProps>['source'] }) {
  const {t} = useTranslation();
  return <>
      <li onClick={() => eventHandler('open')}>
        {t(`open`)}
      </li>
{source == 'file'  &&  
    <>
    <li onClick={() => eventHandler('delete')}>
    {t(`delete`)}
    </li>
    <li onClick={() => eventHandler('rename')}>
        {t(`rename`)}
      </li>
    </>
}
{ source == 'app' && 
    <>
        {/* <li>
          Open in files
        </li> */}
        {/* <li>
          About this project
        </li> */}
    </>
   }
  </>
}

function DesktopOptions ({folderPath = '/', isDesktopHidden, setDesktopHidden,setwWallpaperSwitcherOpen, setThemeSwitcherOpen,screenHandle, setLayouts, source}: MenuProps){
  const {t} = useTranslation();
  const [pcStatus, setPcStatus] = usePcStatus();
  const changePosition = useDesktopPositionHandler();
  const [, , fileInputRef] = useContextMenu();
  const [, setWindows] = useWindowContext();
  const {fileList, format, listFiles, createFolder, createFile} = useFileSystem();

  const handlePowerOff = () => {
    setWindows([]);
    setPcStatus("shutdown");
  };
  const handleSleep = () => {      
    setPcStatus("sleeping");
  };

  const handleContact = (link: string) => {
    window.open(link)
  }

  const handleDesktop = () => {
    setDesktopHidden((prev: boolean) => {
      const newValue = !prev;
      localStorage.setItem('desktop_icon_visibility', newValue.toString());
      return newValue;
    });
  }
  const resetDesktop = () => {
    localStorage.removeItem('app-layouts');
    setLayouts(generateLayouts(fileList?.[folderPath]).layout);
  }



  const createNewFolder = async () => {
    const getCount = (app: string) => parseInt(app.replace(newDir, '').replace('(', '').replace(')', ''));
    const list = await listFiles(folderPath) || [];
    const newDir = t('new_dir');  
    const newFolders = list.filter((a) => {
      const regex = new RegExp(`^${newDir}(\\s\\((\\d+)\\))?$`);
      return regex.test(a.app);
    }).sort((a, b) => getCount(a.app) - getCount(b.app));
    let lastFolderIndex = 0;
    // good enough for my sleep deprived brain, probably buggy, uhh nobody well ever stress it enough right?
    for(const [index, folder] of newFolders.entries()){
      const folderCount = getCount(folder?.app);
      if(!folderCount){ lastFolderIndex = 1; continue;}
      lastFolderIndex = index != folderCount ? index : index + 1;
    }
    
    createFolder(folderPath, `${newDir} ${lastFolderIndex == 0 ? '' : `(${lastFolderIndex})`}`.trim());
  }

  useEffect(() => {

    const handleFileChange = (event: Event) => {
      const fileInput = event.target as HTMLInputElement;
      const file = fileInput.files?.[0];
      if (file  && inputElement) {
        createFile(folderPath, file);
        fileInput.value = ''; // Reset input after file is processed
        inputElement.onchange = null;
      }
    };
    console.log(folderPath )
    const inputElement = fileInputRef.current;
    if (inputElement) {
      inputElement.onchange = handleFileChange;
    }
  }, [fileInputRef, createFile]);

  const handleFileInput = () => {
    fileInputRef.current?.click();
  };

  return <>        

      <li onClick={createNewFolder}>
        <div className={`svgMask ${styles.folder}`}   style={{maskImage: `url("folder_plus.svg")`}}></div>
          {t('new_dir', {suffix: ''})}
      </li>
      <li onClick={handleFileInput}>
        <div className={`svgMask ${styles.icon}`}   style={{maskImage: `url("${new_file}")`}}></div>
          {t('new_file')}
      </li>
     {source == 'desktop' &&  
     <>
      <li onClick={() => setwWallpaperSwitcherOpen(previous => !previous)} >
        <div className={`svgMask ${styles.ghost}`}   style={{maskImage: `url("${wallpaper_change}")`}}></div>
          {t('change_wpp')}
        </li>
        <li onClick={() => setThemeSwitcherOpen(previous => !previous)}>
        <div className={`svgMask ${styles.pallete}`}   style={{maskImage: `url("${theme_change}")`}}></div>
          {t('change_theme')}
        </li>
        <li onClick={changePosition}>
        <div className={`svgMask ${styles.boxes}`}   style={{maskImage: `url("${taskbar_switcher}")`}}></div>
          {t('change_position')}
        </li>
        <li onClick={screenHandle.active ? screenHandle.exit : screenHandle.enter}>
        <div className={`svgMask ${styles.boxes}`}   style={{maskImage: `url("${screenHandle.active ? minimmize : maximize}")`}}></div>
          {t(screenHandle.active ? 'exit_fullscreen' : 'fullscreen')}
        </li>
        <li onClick={resetDesktop}>
        <div className={`svgMask ${styles.icon}`}   style={{maskImage: `url("${reset}")`}}></div>
          {t('reset_desktop')}
        </li>
        <li onClick={format}>
        <div className={`svgMask ${styles.db}`}   style={{maskImage: `url("delete_db.svg")`}}></div>
          {t('delete_everything')}
        </li>
        <li onClick={handleDesktop}>
        <div className={`svgMask ${styles.icon}`}   style={{maskImage: `url("${isDesktopHidden ? desktop_on : desktop_off}")`}}></div>
          {t(isDesktopHidden ? 'desktop_on' : 'desktop_off')}
        </li>
        <div className={styles.separator}></div>
        <li onClick={() => handleContact('mailto:eric72001@hotmail.com')}>
          <div className={`svgMask ${styles.icon}`}   style={{maskImage: `url("${mail}")`}}></div>
            eric72001@hotmail.com
        </li>
        <li onClick={() => handleContact('tel:+55 (71) 98188-6126')}>
          <div className={`svgMask ${styles.icon}`}   style={{maskImage: `url("${phone}")`}}></div>
          (71) 98188-6126
        </li>
        <div className={styles.separator}></div>
        <li onClick={() => setPcStatus('lofi')}>
          <div className={"svgMask " + styles.icon} style={{maskImage: `url("${lofi}")`}}></div>
          Lofi
        </li>
        {pcStatus != 'sleeping' && <li onClick={handleSleep}>
          <div className={"svgMask " + styles.svgMask} style={{maskImage: `url("${sleep}")`}}></div>
          <span>{t('sleep')}</span>
        </li>}
        <li onClick={handlePowerOff}>
          <img src={powerOff}></img>
          <span>{t('shut')}</span>
        </li>
        </>
        }
  </>
}