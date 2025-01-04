import desktop_off from '@/assets/contextMenu/desktop_off.svg';
import desktop_on from '@/assets/contextMenu/desktop_on.svg';
import lofi from '@/assets/contextMenu/lofi.svg';
import maximize from '@/assets/contextMenu/maximize.svg';
import minimmize from '@/assets/contextMenu/minimize.svg';
import new_file from '@/assets/contextMenu/new_file.svg';
import reset from '@/assets/contextMenu/reset.svg';
import cmd from '@/assets/startMenu/cmd2.png';
import powerOff from "@/assets/startMenu/power_off.svg";
import sleep from "@/assets/startMenu/sleep.svg";
import mail from '@/assets/taskbar/contact/mail.svg';
import taskbar_switcher from '@/assets/taskbar/taskbar_switcher.svg';
import theme_change from '@/assets/taskbar/theme_change.svg';
import close from '@/assets/window/close.svg';
import lock from '@/assets/window/lock.svg';
import { AppType, TERMINAL } from '@/constants/apps';
import { ContextMenuProps, useContextMenu } from "@/contexts/ContextMenuContext";
import { useDesktopPositionHandler } from "@/contexts/DesktopPositonContext";
import { useFileSystem } from "@/contexts/FileSystemContext";
import { usePcStatus } from "@/contexts/PcStatusContext";
import { useWindowContext } from "@/contexts/WindowContext";
import useCloseWindow from '@/hooks/useCloseWindow';
import useOpenWindow from "@/hooks/useOpenWindow";
import { fileCount } from '@/utils/utils';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FullScreenHandle } from "react-full-screen";
import { useTranslation } from "react-i18next";
import styles from './ContextMenu.module.scss';

type MenuProps = {    setwWallpaperSwitcherOpen: Dispatch<SetStateAction<boolean>>, 
  setThemeSwitcherOpen: Dispatch<SetStateAction<boolean>>,
  screenHandle: FullScreenHandle,
  isDesktopHidden: boolean,
  setDesktopHidden:  Dispatch<SetStateAction<boolean>>,
  folderPath?: string,
  source?: NonNullable<ContextMenuProps>['source']
}

let eventHandler: (event: string) => void;

export default function ContextMenu({isDesktopHidden, setDesktopHidden,setwWallpaperSwitcherOpen, setThemeSwitcherOpen, screenHandle}: MenuProps){
    const contextRef = useRef<HTMLUListElement>(null);
    const [position, setPosition] = useState<{x: number, y: number} | null>(null);
    const [menuProps, setMenuProps] = useContextMenu();
    const [subMenuPosition, setSubMenuPosition] = useState<string>('right');
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
        if (x && y && contextRef.current) {
            const adjustedPos = getAdjustedPosition(x, y);
            // 500 is the width of the context menu plus submenu
            setSubMenuPosition((window.innerWidth - x) <= 500 ? 'left' : 'right');
            setPosition(adjustedPos);
        }
    }, [x, y]);

    const getAdjustedPosition = (x: number, y: number) => {
        if (!contextRef.current) return { x, y };

        const menuRect = contextRef.current.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let adjustedX = x;
        let adjustedY = y;

        if (x + menuRect.width > windowWidth) {
            adjustedX = windowWidth - menuRect.width;
        }

        if (y + menuRect.height > windowHeight) {
            adjustedY = windowHeight - menuRect.height;
        }

        return { x: adjustedX, y: source == 'windows' ? adjustedY : adjustedY };
    };

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
    {x &&  <ul ref={contextRef} className={`${styles.contextMenu} ${styles[`${subMenuPosition}SubMenu`]}`} style={{position: 'absolute', top: `${position?.y ?? y}px`, left: `${position?.x ?? x}px`, visibility: 'visible'}} onClick={handleClick}>
      {source == 'desktop' || source == 'folder' ? 
      <DesktopOptions source={source} folderPath={folderPath} isDesktopHidden={isDesktopHidden} setDesktopHidden={setDesktopHidden}  screenHandle={screenHandle} setThemeSwitcherOpen={setThemeSwitcherOpen} setwWallpaperSwitcherOpen={setwWallpaperSwitcherOpen}/> : 
      source === 'windows' ? <WindowsItemOptions app={menuProps?.app}/> : <DesktopItemOptions source={source!} appIcon={menuProps?.app?.icon}/>}
      </ul>}
    </>
}

function WindowsItemOptions({app}: {app?: AppType}) {
  const {t} = useTranslation();
  const closeWindow = useCloseWindow();
  console.log(app)
  const handleCloseWindow = () => {
    console.log("closing")
    closeWindow(app!);
  }

  return <>
  {/* <li>
    {t('open')}
  </li>
  <li>
    <div className={`svgMask ${styles.icon}`}   style={{maskImage: `url("${minimize}")`}}></div>
    {t('minimize')}
  </li>
  <li>
    <div className={`svgMask ${styles.icon}`}   style={{maskImage: `url("${maximize_w}")`}}></div>
    {t('maximize')}
  </li> */}
  <li onClick={handleCloseWindow}>
    <div className={`svgMask ${styles.icon}`}  style={{maskImage: `url("${close}")`}}></div>
    {t('close')}
  </li>
  </>
}

function DesktopItemOptions({ source, appIcon }: { source: NonNullable<ContextMenuProps>['source'], appIcon?: string }) {
  const {t} = useTranslation();
  console.log(appIcon)
  return <>
      <li onClick={() => eventHandler('open')}>
        <img className={styles.open_icon} src={appIcon}></img>
        {t(`open`)}
      </li>
{source == 'file'  &&  
    <>
    <li onClick={() => eventHandler('delete')}>
    <div className={`svgMask ${styles.icon}`}   style={{maskImage: `url("trash.svg")`}}></div>
    {t(`delete`)}
    </li>
    <li onClick={() => eventHandler('rename')}>
    <div className={`svgMask ${styles.icon}`}   style={{maskImage: `url("edit.svg")`}}></div>
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

function DesktopOptions ({folderPath = '/', isDesktopHidden, setDesktopHidden,setwWallpaperSwitcherOpen, setThemeSwitcherOpen,screenHandle, source}: MenuProps){
  const {t} = useTranslation();
  const [pcStatus, setPcStatus] = usePcStatus();
  const changePosition = useDesktopPositionHandler();
  const [, , fileInputRef] = useContextMenu();
  const [, setWindows] = useWindowContext();
  const {deletePath, listFiles, createFolder, createFile} = useFileSystem();

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
  const resetDesktop = async () => {
    localStorage.removeItem('desktop_icon_visibility');
    await deletePath('/.config', 'desktop_icons_coords.json');
    await createFile('/.config/desktop_icons_coords.json', '{}');
  }



  const createNewFolder = async () => {
    const getCount = (name: string) => parseInt(name.replace(newDir, '').replace('(', '').replace(')', ''));
    const list = await listFiles(folderPath) || [];
    const newDir = t('new_dir');  
    const newFolders = list.filter((a) => {
      const regex = new RegExp(`^${newDir}(\\s\\((\\d+)\\))?$`);
      return regex.test(a.name);
    }).sort((a, b) => getCount(a.name) - getCount(b.name));
    let lastFolderIndex = 0;
    // good enough for my sleep deprived brain, probably buggy, uhh nobody well ever stress it enough right?
    for(const [index, folder] of newFolders.entries()){
      const folderCount = getCount(folder?.name);
      if(!folderCount){ lastFolderIndex = 1; continue;}
      lastFolderIndex = index != folderCount ? index : index + 1;
    }
    
    createFolder(folderPath, `${newDir} ${lastFolderIndex == 0 ? '' : `(${lastFolderIndex})`}`.trim());
  }

  const createNewFile = async () => {
    const list = await listFiles(folderPath);
    if(list){
        const defaultName = t('new_text_file');
        const count = fileCount(list, defaultName);
        const fileName = `${defaultName} ${count == 0 ? '' : `(${count})`}`.trim() + '.txt';
        createFile(`${folderPath}/${fileName}`, '');
    }
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
    const inputElement = fileInputRef.current;
    if (inputElement) {
      inputElement.onchange = handleFileChange;
    }
  }, [fileInputRef, createFile]);

  const handleFileInput = () => {
    fileInputRef.current?.click();
  };
  const openWindow = useOpenWindow();
  const handleOpenCmd = () => {
    openWindow({...TERMINAL, props: {folderPath}})
  }

  return <>        

      <li onClick={createNewFolder}>
        <div className={`svgMask ${styles.folder}`}   style={{maskImage: `url("folder_plus.svg")`}}></div>
          {t('new_dir', {suffix: ''})}
      </li>
      <li>
        <div className={`svgMask ${styles.icon}`}   style={{maskImage: `url("${new_file}")`}}></div>
          {t('new_file')}
        <div className={`svgMask ${styles.icon} ${styles.subMenuArrow}`}   style={{maskImage: `url("arrow_right_2.svg")`}}></div>
        <ul className={`${styles.contextMenu} ${styles.submenu}`}>
          <li role='button' onClick={handleFileInput}>
            <div className={`svgMask ${styles.icon}`}   style={{maskImage: `url("monitor.svg")`}}></div>
            {t('from_system')}
            </li>
          <li onClick={createNewFile}>
          <div className={`svgMask ${styles.icon}`}   style={{maskImage: `url("text_file.svg")`}}></div>
          {t('new_text_file')}
            </li>
        </ul>
      </li>
      <li onClick={handleOpenCmd}>
        <img src={cmd} className={styles.icon}></img>
          {t('open_cmd')}
      </li>
     {source == 'desktop' &&  
     <>
      <li onClick={() => setwWallpaperSwitcherOpen(previous => !previous)} >
        <div className={`svgMask ${styles.ghost}`}   style={{maskImage: `url("image.svg")`}}></div>
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
        {/* <li onClick={format}>
        <div className={`svgMask ${styles.db}`}   style={{maskImage: `url("delete_db.svg")`}}></div>
          {t('delete_everything')}
        </li> */}
        <li onClick={handleDesktop}>
        <div className={`svgMask ${styles.icon}`}   style={{maskImage: `url("${isDesktopHidden ? desktop_on : desktop_off}")`}}></div>
          {t(isDesktopHidden ? 'desktop_on' : 'desktop_off')}
        </li>
        <div className={styles.separator}></div>
        <li onClick={() => handleContact('mailto:eric72001@hotmail.com')}>
          <div className={`svgMask ${styles.icon}`}   style={{maskImage: `url("${mail}")`}}></div>
            eric72001@hotmail.com
        </li>
        <div className={styles.separator}></div>
        <li onClick={() => setPcStatus('lofi')}>
          <div className={"svgMask " + styles.icon} style={{maskImage: `url("${lofi}")`}}></div>
          lofi
        </li>
        <li onClick={() => setPcStatus('lock')}>
          <div className={"svgMask " + styles.icon} style={{maskImage: `url("${lock}")`, width: '13px'}}></div>
          {t('lock')}
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