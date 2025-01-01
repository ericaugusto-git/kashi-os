import { useEffect, useState } from 'react';
import { AppType } from '@/constants/apps';
import { Grid } from '@/Grid/Grid';
import { motion } from "framer-motion";
import { useDesktopPosition } from '../contexts/DesktopPositonContext';
import useOpenWindow from '../hooks/useOpenWindow';
import DesktopIcon from './components/DesktopIcon/DesktopIcon';
import styles from "./DestopIcons.module.scss";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.04
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
const DesktopIcons = ({apps}: { apps: AppType[] | null}) => {
  const [position] = useDesktopPosition();



  const [isAnimating, setIsAnimating] = useState(true);


  useEffect(() => {
    const handleReplay = () => {
      // Toggle the state to replay the animation
      setIsAnimating(false);
      // Use a timeout to ensure the state change is processed
      setTimeout(() => setIsAnimating(true), 50);
    };
    handleReplay();
  }, [position]);
  const openWindow = useOpenWindow();




  return (
    <>
    {position == 'bottom' ? <>
      <Grid apps={apps}/>
    
    </> : <>
  
  {isAnimating && <motion.menu id="desktop_icons" initial="hidden" animate={"visible"}  variants={container}   className={`${styles.desktop} ${styles[position]}`}>
       {apps?.map((app) => <motion.li  id={app.name} whileHover={{ scale:  1.05 }} whileTap={{ scale: 0.9 }}  variants={item} key={app.name} onClick={() => openWindow(app)}>
                   <DesktopIcon app={app} hideLabel={true} folderPath='/home/desktop' svgStyles={app.desktopStyles?.svg} svgMask={app.svgMask?.desktop} buttonStyles={app.desktopStyles?.button} imgWrapperStyles={app.desktopStyles?.img} />
       </motion.li>)}
       {/* <li onClick={openResume}>
         <DesktopIcon  app={{app: 'resume', icon: resume, appType: 'os', hideInStartMenu: true,}} buttonStyles={{textTransform: 'none'}} svgMask={true}></DesktopIcon>
       </li> */}
   </motion.menu>}

</>}
    </>
  );
};

export default DesktopIcons;
