import { CSSProperties } from "react";
import DesktopIcon from "../../../DesktopIcons/components/DesktopIcon/DesktopIcon";
import { AppType } from "@/constants/apps";
import { useTheme } from "../../../contexts/ThemeContext";
import { useWindowContext } from "../../../contexts/WindowContext";
import Intro from "../Intro/Intro";
import styles from './Windows.module.scss';
import { motion } from "framer-motion";

export default function Windows(){
    const [windows, setWindows] = useWindowContext();
    const [theme] = useTheme();
    const item = {
        hidden: { x: 20, opacity: 0 },
        visible: {
          x: 0,
          opacity: 1
        }
      };
    const buttonStyles: CSSProperties = {width: '100%', height: '100%'};
    const imgWrapperStyles: CSSProperties = {height: '40px', padding: '0', borderRadius: '5px', backgroundColor: 'unset'}

    const handleDesktopIconCLick = (app: AppType) => {
      // app.conteudo = <div className="backgroundImage" style={{
      //   width: "100%",
      //   height: "100%",
      //   backgroundImage: `url(${jdm})`
      // }}></div>;
      setWindows((prevWindows) => {
          const updatedWindows = prevWindows
          .map(window => ({ ...window, active: false })); // Deactivate all windows
          const newApp = updatedWindows.find(a=> a.name == app.name);
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
    return <div className={styles.taskbarWindowsWrapper}>
        {/* Workaround for https://issues.chromium.org/issues/41471914 */}
        <div className={styles.introsWrapper} style={{ position: windows?.length == 0 ? 'relative' : 'absolute' }}><Intro/> </div> 
        {windows?.length > 0 && <ul className={`${styles.taskbarWindows} ${styles[theme]}`}>
        {windows.map((window) => (
            
            <motion.li initial="hidden" animate="visible"  variants={item} key={window.name} onClick={() => handleDesktopIconCLick(window)}>
                 <DesktopIcon hideLabel={true} fromTaskbar={true} app={window} svgStyles={window.desktopStyles?.svg} svgMask={window.svgMask?.desktop} buttonStyles={buttonStyles} imgWrapperStyles={{...window.desktopStyles?.img, ...imgWrapperStyles}} />
            </motion.li>
        ))}
        </ul>}
    </div>
}