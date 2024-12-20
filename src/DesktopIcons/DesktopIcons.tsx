import { useEffect, useState } from 'react';
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout';
// import 'react-grid-layout/css/styles.css';
import { AppType } from '@/constants/apps';
import { motion } from "framer-motion";
import { useDesktopPosition } from '../contexts/DesktopPositonContext';
import useOpenWindow from '../hooks/useOpenWindow';
import DesktopIcon from './components/DesktopIcon/DesktopIcon';
import styles from "./DestopIcons.module.scss";

const ResponsiveGridLayout = WidthProvider(Responsive);
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
const DesktopIcons = ({layouts, setLayouts, apps}: {layouts: Layouts | null, setLayouts: React.Dispatch<React.SetStateAction<Layouts | null>>, apps: AppType[] | null}) => {
  const [position] = useDesktopPosition();

  const [isDragging, setIsDragging] = useState(false);


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

  if(!layouts || !apps){
    return;
  }

  // Save layouts to localStorage whenever they change
  const handleLayoutChange = (_: Layout[], allLayouts: Layouts) => {
    const layoutsString = JSON.stringify(allLayouts);
    const storedLayouts = localStorage.getItem('app-layouts');

    // Only update if the layouts have changed to prevent unnecessary updates
    if (storedLayouts !== layoutsString) {
      setLayouts(allLayouts);
      
      localStorage.setItem('app-layouts', layoutsString);
    }
  };





  const handleDragStop = (item: Layout) => {
    // 
    // if(isDragging){
    //   
    //   return;
    // }
    // const wasMoved = oldItem.x !== newItem.x || oldItem.y !== newItem.y;
    if(!isDragging){
      // Click event here
      const app = apps.find(a => a.name === item.i);
      // if(app?.appType == 'file'){
      //   handleFileDisplay(app.folderPath!, app.name);
      // }else{
      // }
      openWindow(app!)
    }else{
      setIsDragging(false);
    }
  }



  return (
    <>
    {position == 'bottom' ? <>
      <ResponsiveGridLayout
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={130}
        style={{cursor: isDragging ? `url("/grabbing.svg"), grabbing` : ''}}
        useCSSTransforms={true}
        compactType={null}
        autoSize={false}
        containerPadding={[0,0]}
        isResizable={false}
        isBounded={true}
        isDraggable={true}
        preventCollision={true}
        onDrag={() =>{setIsDragging(true)}}
        onDragStop={(_,item) => {handleDragStop(item)}}
        onLayoutChange={handleLayoutChange}
      >
        {apps.map((app) => (
          <div id={app.name} key={app.name}>
                   <DesktopIcon app={app} folderPath='/home/desktop' setLayouts={setLayouts} svgStyles={app.desktopStyles?.svg} svgMask={app.svgMask?.desktop} buttonStyles={app.desktopStyles?.button} imgWrapperStyles={app.desktopStyles?.img} />
            </div>
        ))}
      </ResponsiveGridLayout>
    
    </> : <>
  
  {isAnimating && <motion.menu id="desktop_icons" initial="hidden" animate={"visible"}  variants={container}   className={`${styles.desktop} ${styles[position]}`}>
       {apps.map((app) => <motion.li  id={app.name} whileHover={{ scale:  1.05 }} whileTap={{ scale: 0.9 }}  variants={item} key={app.name} onClick={() => openWindow(app)}>
                   <DesktopIcon app={app} hideLabel={true} setLayouts={setLayouts} folderPath='/home/desktop' svgStyles={app.desktopStyles?.svg} svgMask={app.svgMask?.desktop} buttonStyles={app.desktopStyles?.button} imgWrapperStyles={app.desktopStyles?.img} />
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
