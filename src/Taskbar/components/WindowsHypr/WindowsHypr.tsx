import { motion } from "framer-motion";
import { useTheme } from "../../../contexts/ThemeContext";
import { useWindowContext } from "../../../contexts/WindowContext";
import styles from './WindowsHypr.module.scss';
import { WindowType } from "../../../constants/window";

export default function WindowsHypr(){
    const [windows, setWindows] = useWindowContext();
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
      
    return <>
            {windows?.length > 0 && <ul className={`${styles.windows} ${styles[theme.value]}`}>
        {windows.map((window: WindowType) => (
            <li  key={window.app} className={window.active ? styles.active : ''} onClick={() => handleDesktopIconCLick(window)}>
                <button className="backgroundImage" style={{[window.svgMask?.desktop ?  'maskImage' : 'backgroundImage']: `url("${window.icon}")`}}></button>
            </li>
        ))}
        </ul>}
    </>
}