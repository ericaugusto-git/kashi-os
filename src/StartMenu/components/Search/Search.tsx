import { AnimatePresence, motion } from "framer-motion";
import _ from 'lodash';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import search from "../../../assets/startMenu/search.svg";
import { APPS,AppType } from "@/constants/apps";
import useOpenWindow from "../../../hooks/useOpenWindow";
import styles from "./Search.module.scss";
import { wallpapers } from "../../../constants/wallpapers";
import { useTheme } from "../../../contexts/ThemeContext";
import { useWallpaper } from "../../../contexts/WallpaperContext";

export default function Search({searchVisible, setSearchVisible}: {searchVisible: boolean, setSearchVisible: Dispatch<SetStateAction<boolean>>}) {
    const initialApps: AppType[] = _.cloneDeep(APPS).sort((a: AppType, b: AppType) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
const [apps, setApps] = useState<AppType[]>(_.cloneDeep(initialApps));
const {t} = useTranslation();
const [inputValue, setInputValue] = useState<string>('');
const inputRef = useRef<HTMLInputElement>(null);
const listRef = useRef<HTMLUListElement>(null); // Ref for the <ul> element
const [focusedIndex, setFocusedIndex] = useState<number>(0); // Index of the focused app
const [theme] = useTheme();
const [wallpaperIndex] = useWallpaper();
const handleInputChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
    // Update the state with the new input value
    const newInput = event.target.value;
    setInputValue(newInput);
    setApps(() => {
        if(inputValue?.length == 0){
            return initialApps;
        }else{
            return initialApps.filter((a) => t(a.name).trim().toLowerCase().includes(newInput.trim().toLowerCase()));
        }
    })
  };

  const openWindow = useOpenWindow();
  const handleOpenApp = (app: AppType) => {
    // app = {
    //   ...name,
    //   ...windowsTemplates[app.name as keyof WindowsTemplatesType],
    // };
    openWindow(app);
    setSearchVisible(false);
  };

  useEffect(() => {
    setApps(initialApps);
    setFocusedIndex(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchVisible]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
        if(event.code === 'Escape'){
            setSearchVisible(false);
        }
    inputRef?.current?.focus();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    // Add event listener for keyboard navigation
    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.code === 'Escape') {
            setSearchVisible(false);
        } else if (event.code === 'ArrowDown') {
            // Move focus to the next app item
            
            setFocusedIndex(prevIndex => Math.min(prevIndex + 1, apps.length - 1));
        } else if (event.code === 'ArrowUp') {
            // Move focus to the previous app item
            setFocusedIndex(prevIndex => Math.max(prevIndex - 1, 0));
        } else if (event.code === 'Enter' && apps[focusedIndex]) {
            // Open the selected app if Enter is pressed
            handleOpenApp(apps[focusedIndex]);
        }
    };
    if(searchVisible){
        // Add event listener
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }
}, [searchVisible, focusedIndex, apps]); // Listen to changes in searchVisible, focusedIndex, and apps

useEffect(() => {
    // Scroll the list to ensure the focused item is visible when it changes
    if (listRef.current) {
        const focusedItem = listRef.current.childNodes[focusedIndex] as HTMLElement;
        focusedItem.scrollIntoView();
    }
}, [focusedIndex]);


  return (
    <AnimatePresence>
        {searchVisible && 
            <motion.div initial={{scale: 0}} animate={{scale: 1}} exit={{scale: 0, opacity: 0}} className={styles.search_container}>
            <div className={`backgroundImage ${styles.search_bar}`} style={{backgroundImage: `url("${wallpapers[theme][wallpaperIndex]}")`}}>
                <div className={styles.search_input_container}>
                <div
                    style={{ maskImage: `url("${search}")` }}
                    className={"svgMask " + styles.icon}
                ></div>
                <input autoFocus ref={inputRef} onChange={handleInputChange} placeholder={t('search')} />
                </div>
            </div>
            <div className={`${styles.apps_container} custom_scrollbar`}>
            {inputValue?.length == 0 && <span>All apps</span>}
                <ul ref={listRef} className={styles.apps}>
                    {apps.sort((a, b) => t(a.name).localeCompare(t(b.name))).map((app, index) => (
                        <li key={app.name}
                        
                        >
                            <a onClick={() => handleOpenApp(app)} className={`${styles.name} ${index === focusedIndex ? styles.focused : ''}`}
>
                            {app.svgMask?.search ? (
                                    <div
                                    style={{ maskImage: `url("${app.icon}")` }}
                                    className={"svgMask " + styles.icon}
                                    ></div>
                                ) : (
                                    <img className={styles.icon} src={app.icon}></img>
                                )}
                                <span>{t(app.name)}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            </motion.div>
        }  
    </AnimatePresence>
  );
}