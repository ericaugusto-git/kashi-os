import { WindowType } from "../constants/window";
import { windowsTemplates } from "../constants/windowsTemplate";
import useOpenWindow from "../hooks/useOpenWindow";
import styles from "./DestopIcons.module.scss";
import DesktopIcon from "./components/DesktopIcon/DesktopIcon";
import { motion } from "framer-motion";

function DesktopIcons() {
  const apps = windowsTemplates.filter(a=> a.appType == 'project' || a.desktop);
  const openWindow = useOpenWindow();
  const handleDesktopIconCLick = (app: WindowType) => {
    openWindow(app);
  };

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };


  return <>
            <motion.menu initial="hidden" animate="visible"   variants={container}  className={styles.desktop}>
                {apps.map(app => <motion.li whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.9 }} variants={item} key={app.app} onClick={() => handleDesktopIconCLick(app)}>
                            <DesktopIcon app={app} svgMask={app.svgMask?.desktop} buttonStyles={app.desktopStyles?.button} imgWrapperStyles={app.desktopStyles?.img} />
                </motion.li>)}
                {/* <li onClick={openResume}>
                  <DesktopIcon  app={{app: 'resume', icon: resume, appType: 'os', hideInStartMenu: true,}} buttonStyles={{textTransform: 'none'}} svgMask={true}></DesktopIcon>
                </li> */}
            </motion.menu>

        </>;
}

export default DesktopIcons;