import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { WindowType } from "../constants/window";
import { windowsTemplates } from "../constants/windowsTemplate";
import { useDesktopPosition } from "../contexts/DesktopPositonContext";
import useOpenWindow from "../hooks/useOpenWindow";
import styles from "./DestopIcons.module.scss";
import DesktopIcon from "./components/DesktopIcon/DesktopIcon";
import Draggable from "react-draggable";

function DesktopIcons() {
  const [position] = useDesktopPosition();
  const apps = windowsTemplates.filter(a=> a.appType == 'project' || a.desktop);
  const openWindow = useOpenWindow();
  const handleDesktopIconCLick = (app: WindowType) => {
    if(isDragging){
      return;
    }
    openWindow(app);
  };

  
  const [isAnimating, setIsAnimating] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
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
  useEffect(() => {
    const handleReplay = () => {
      // Toggle the state to replay the animation
      setIsAnimating(false);
      // Use a timeout to ensure the state change is processed
      setTimeout(() => setIsAnimating(true), 50);
    };
    handleReplay();
  }, [position]);

  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // useEffect(() => {
  //   const handleMouseMove = (event) => {
  //     setMousePosition({ x: event.clientX, y: event.clientY });
  //   };

  //   window.addEventListener('mousemove', handleMouseMove);
  //   return () => {
  //     window.removeEventListener('mousemove', handleMouseMove);
  //   };
  // }, []);

  // const calculateTransform = (app) => {
  //   const centerX = window.innerWidth / 2;
  //   const distanceFromCenter = Math.abs(centerX - mousePosition.x);
  //   const offset = distanceFromCenter / window.innerWidth;
  //   const el = document.getElementById(`${app}`);
  //   if(el)
  //    el.style.transform = `translateY(${-40}px)`; // Adjust 40px to your desired maximum offset
  // };

  // const MAX_DISTANCE = 1500; // Set this to the maximum distance you expect (you can adjust this based on your needs)
  // useEffect(() => {
  //   const handleMouseMove = (event: MouseEvent) => {
  //     apps.forEach((element) => {
  //       const el = document.getElementById(`${element.app}`);
  //       const rect = el.getBoundingClientRect();
  //       const elementCenterX = rect.left + rect.width / 2;

  //       const distanceX = Math.abs(event.clientX - elementCenterX);

  //       // Normalize the distance to a value between 0 and 1
  //       const normalizedDistance = Math.min(distanceX / MAX_DISTANCE, 1);

  //       // Map the normalized distance to a value between 0 and 10
  //       const value = (1 - normalizedDistance) * 10;

  //       el.style.transform = `translateY(${-value}px)`;

  //     });
  //   };

  //   const desktopIcons = document.getElementById("desktop_icons");
  //   desktopIcons?.addEventListener('mousemove', handleMouseMove);

  //   return () => {
  //     desktopIcons?.removeEventListener('mousemove', handleMouseMove);
  //   };
  // }, [apps]);


  return <>
  
            <motion.menu id="desktop_icons" initial="hidden" animate={"visible"}  variants={container}   className={`${styles.desktop} ${styles[position]}`}>
                {apps.map((app) => <motion.li  id={app.app} 
        variants={item}
        key={app.app}
        onClick={() => handleDesktopIconCLick(app)}>
                              <DesktopIcon setIsDragging={setIsDragging} app={app} svgStyles={app.desktopStyles?.svg} svgMask={app.svgMask?.desktop} buttonStyles={app.desktopStyles?.button} imgWrapperStyles={app.desktopStyles?.img} />
                </motion.li>)}
                {/* <li onClick={openResume}>
                  <DesktopIcon  app={{app: 'resume', icon: resume, appType: 'os', hideInStartMenu: true,}} buttonStyles={{textTransform: 'none'}} svgMask={true}></DesktopIcon>
                </li> */}
            </motion.menu>

        </>;
}

export default DesktopIcons;