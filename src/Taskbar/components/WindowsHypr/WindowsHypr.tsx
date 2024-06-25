import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../../../contexts/ThemeContext";
import { useWindowContext } from "../../../contexts/WindowContext";
import styles from './WindowsHypr.module.scss';
import { WindowType } from "../../../constants/window";
import { Dispatch, SetStateAction } from "react";

export default function WindowsHypr({windows, setWindows}: {windows: WindowType[], setWindows: Dispatch<SetStateAction<WindowType[]>>}){
    const [theme] = useTheme();
    const item = {
        hidden: { x: 20, opacity: 0 },
        visible: {
          x: 0,
          opacity: 1
        }
      };

      const handleDesktopIconCLick = (app: WindowType) => {
        // app.conteudo = <div className="backgroundImage" style={{
        //   width: "100%",
        //   height: "100%",
        //   backgroundImage: `url(${jdm})`
        // }}></div>;
        setWindows((prevWindows) => {
            const updatedWindows = prevWindows
            .map(window => ({ ...window, active: false })); // Deactivate all windows
            const newApp = updatedWindows.find(a=> a.app == app.app);
          if(app.active && newApp){
              newApp.active = false;
              newApp.minimized = true;
              return updatedWindows;
          }else if(newApp){
              newApp.active = true;
              newApp.minimized = false;
              return updatedWindows;
          }
          return updatedWindows;
        })
      };
      
    return( 
           <motion.ul className={`${styles.windows} ${styles[theme]}`}>
            <AnimatePresence>
        {windows.map((window: WindowType) => (
            <motion.li initial={{ padding: '2px 0'}} transition={{duration: 0.2}} animate={{ padding: window.active ? '2px 18px' : '2px 0' }} exit={{ padding: 0, width: 0, opacity: 0, margin: 0 }}  key={window.app} className={window.active ? styles.active : ''} onClick={() => handleDesktopIconCLick(window)}>
                {/* <button className="backgroundImage svgMask" style={{[window.svgMask?.desktop ?  'maskImage' : 'backgroundImage']: `url("${window.icon}")`}}></button> */}
                <img className={styles.icon} src={window.icon}></img>
            </motion.li>
        ))}
    </AnimatePresence>
        </motion.ul>)
}