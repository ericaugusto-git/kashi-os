import { CSSProperties, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { AppType } from "@/constants/apps";
import { useTheme } from "../../../contexts/ThemeContext";
import styles from './WindowsHypr.module.scss';

export default function WindowsHypr({ windows, setWindows, windowsDivTotalLength }: { windows: AppType[], setWindows: Dispatch<SetStateAction<AppType[]>>, windowsDivTotalLength: number }) {
  const iconSize = 21;

  const [theme] = useTheme();
  const taskbarRef = useRef<HTMLUListElement>(null);
  const [overflowingWindows, setOverflowingWindows] = useState<AppType[]>([]);
  const [visibleWindows, setVisibleWindows] = useState<AppType[]>([]);
  const [showOverflowMenu, setShowOverflowMenu] = useState(false);


  useEffect(() => {
    const newVisibleWindows: AppType[] = [];
    const newOverflowingWindows: AppType[] = [];
    
    windows.forEach((window, index) => {
      // this 60 is the result of taskbar_section X padding (24px), icons margin-left (12px),padding of an active window (24px) == 60px
      if((index + 1) * (iconSize + 60) > (windowsDivTotalLength)){
        newOverflowingWindows.push(window);
      }else{
        newVisibleWindows.push(window)
      }
    })
    setVisibleWindows(newVisibleWindows);
    setOverflowingWindows(newOverflowingWindows);
  },[windowsDivTotalLength, windows])


  const handleDesktopIconClick = (app: AppType) => {
    setWindows((prevWindows) => {
      const updatedWindows = prevWindows.map(window => ({ ...window, active: false }));
      const newApp = updatedWindows.find(a => a.name === app.name);
      if (app.active && newApp) {
        newApp.active = false;
        newApp.minimized = true;
      } else if (newApp) {
        newApp.active = true;
        newApp.minimized = false;
      }
      return updatedWindows;
    });
  };

  return (
    <div className={styles.taskbarContainer} style={{'--icon-size': iconSize} as CSSProperties}>
      <motion.ul ref={taskbarRef} className={`${styles.windows} ${styles[theme]}`}>
        <AnimatePresence>
          {visibleWindows.map((window: AppType) => (
            <motion.li
              initial={{ padding: '2px 0' }}
              transition={{ duration: 0.2 }}
              animate={{ padding: window.active ? '2px 18px' : '2px 0' }}
              exit={{ padding: 0, width: 0, opacity: 0, margin: 0 }}
              key={window.name}
              className={window.active ? styles.active : ''}
              onClick={() => handleDesktopIconClick(window)}
            >
              <img className={styles.icon} src={window.icon} alt={window.name} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      {overflowingWindows.length > 0 && (
        <div className={styles.moreButton} onClick={() => setShowOverflowMenu(!showOverflowMenu)}>
          <button className={styles.more_icons}>
            {Array.from({length: 3}).map((_, i) => 
              <div  key={i}></div>
            )
            }
          </button>
          {showOverflowMenu && (
            <motion.ul
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`${styles.overflowMenu} custom_scrollbar`}
            >
              {overflowingWindows.map((window: AppType) => (
                <motion.li
                  initial={{ padding: '2px 0' }}
                  transition={{ duration: 0.2 }}
                  animate={{ padding: window.active ? '2px 18px' : '2px 0' }}
                  exit={{ padding: 0, width: 0, opacity: 0, margin: 0 }}
                  key={window.name}
                  className={window.active ? styles.active : ''}
                  onClick={() => handleDesktopIconClick(window)}
                >
                  <img className={styles.icon} src={window.icon} alt={window.name} />
                </motion.li>
              ))}
            </motion.ul>
          )}
        </div>
      )}
    </div>
  );
}
