import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Rnd } from 'react-rnd';
import lock from '../assets/window/lock.svg';
import { WindowType } from '../constants/window';
import { useDesktopPosition } from '../contexts/DesktopPositonContext';
import { useWindowContext } from '../contexts/WindowContext';
import useCloseWindow from '../hooks/useCloseWindow';
import WindowContent from './components/WindowContent/WindowContent';
import styles from './Window.module.scss';


const Window = ({wrapperClass}: {wrapperClass: string}) => {
  const [windows, setWindows] = useWindowContext();
  const defaultWindowStyles = {borderRadius: '8px'};
  const [defaultSyles, setDefaultStyles] = useState<React.CSSProperties>( defaultWindowStyles);
  const [noTransition, seNoTransition] = useState(false);
  const windowRefs = useRef<Array<Rnd | null>>([]);
  const windowRef = useRef<HTMLDivElement>(null)
  const closeRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const minimizedRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [position] = useDesktopPosition();
  const taskbarHeight = 37;
  const { t } = useTranslation();
  const variants = {
    initial: position == 'top' ? { scale: 0 } : {},
    animate: position == 'top' ? { scale: 1 } : {},
    exit: position == 'top' ? { scale: 0, opacity: 0 } : {opacity: 0, }
  };
  
  const isHeaderItem = (index: number,event: React.TouchEvent | React.MouseEvent) => {
    // @ts-expect-error tagName actually exists on event.target
    if(Array.from(event.target.classList).some((className: unknown) => className.includes('close'))){
      return true;
    }
    if (index !== -1 && (closeRefs.current[index] && closeRefs.current[index]?.contains(event.target as Node))  || (minimizedRefs.current[index] && minimizedRefs.current[index]?.contains(event.target as Node))) {
      return true;
    }
  }

  const handleWindowClick = (app: string, index: number, event: React.TouchEvent | React.MouseEvent) => {
    if(isHeaderItem(index, event)){
      return;
    }
    windows.map((a) => a.active = a.app === app);
    
    const updatedWindows = windows.map(w => ({
      ...w,
      active: w.app === app
    }));
    
    setWindows(updatedWindows);
  }

  const closeWindow = useCloseWindow();
  const handleCloseWindow = (window: WindowType) => {
    if(!window.customClose)  
      closeWindow(window);
  }

  const handleMinimized = (app: string)=> {
    const updatedWindows = windows.map(w => ({
      ...w,
      active: false
    }));
    const newApp = updatedWindows.find(a => a.app == app);
    if(newApp)
      newApp.minimized = true;
    setWindows(updatedWindows);
  }

  const isMaximized = (index: number, lastHeight?: number):boolean =>{
    const windowRef = windowRefs.current[index];
    if(windowRef){
      const {width, height} =  windowRef.resizable.state;
      const windowHeight = lastHeight ?? innerHeight;
      return width == "100%" && height == (windowHeight - taskbarHeight) + 'px' 
    }
    return false;
  }
  
  const maximizeWindow = (window: WindowType, index: number) => {
    const windowRef = windowRefs.current[index];
    if(windowRef){
      const isMax = isMaximized(index);
      const size = isMax ? {width: "40%", height: window.height ?? '400px'} : {width: "100%", height: (innerHeight - taskbarHeight) + 'px'};
      setDefaultStyles(!isMax ? {borderRadius: '1px'} : defaultWindowStyles);
      windowRef?.updateSize(size);
      windowRef?.updatePosition(!isMax ? {x: 0, y: position == 'top' ? taskbarHeight : 0} : {x: window.x ?? Math.round(0.08 * innerWidth) , y: window.y ?? Math.round(0.02 * innerHeight)});
    }
    // window.active = true;
  }

  useEffect(() => {
    const updatedWindows = windows.map((w,i) => {
      if(isMaximized(i)){
        const windowRef = windowRefs.current[i];
        windowRef?.updatePosition({x: 0, y: position == 'top' ? taskbarHeight : 0});
      }
      return w;
    }
  );
  setWindows(updatedWindows);
  }, [position])

  const handleDragStop = (event: React.TouchEvent | React.MouseEvent, index: number, posSize: {x: number, y:number, width?: string, height?: string}, window: WindowType) => {
      // gotta change this logic soon, creating components maybe so i dont have an array of refs
      if(isHeaderItem(index, event)){
        return;
      }
      seNoTransition(false);
      const updatedWindows = windows.map((w,i) => {
          if(w.app == window.app && !isMaximized(i)){
            w.x = posSize.x;
            w.y = posSize.y;
          }
          return w;
        }
      );
      setWindows(updatedWindows);
  }

  // const [windowSize, setWindowSize] = useState({
  //   width: window.innerWidth,
  //   height: window.innerHeight,
  // });

  // useEffect(() => {
  //   const handleResize = () => {
  //       windows.forEach((window,i) => {
  //         if(isMaximized(i, windowSize.height)){
  //           maximizeWindow(window, i);
  //         }
  //       })
  //     // }
  //     setWindowSize({
  //       width: window.innerWidth,
  //       height: window.innerHeight,
  //     });
  //   };

  //   window.addEventListener('resize', handleResize);

  //   // Cleanup the event listener on component unmount
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, [windows]);

  
  return <div ref={windowRef}>
    <AnimatePresence>
  {windows.map((window, index) => (
    <motion.div variants={variants} initial="initial"  animate="animate" exit="exit" transition={{ duration: 0.2 }}  key={window.app} onTouchStart={(event) => handleWindowClick(window.app, index, event)} onMouseDown={(event) => handleWindowClick(window.app, index, event)}
    >
  <Rnd
    // default={{
    //   y: window.y ?? 50,
    //   x:window.x ?? 150,
    //   width: window.width ?? "40%",
    //   height: window.height ?? "400px" 
    // }}
    ref={ref => windowRefs.current[index] = ref}
    dragHandleClassName={styles.header}
  default={{ x: window.x ?? 150, y:  window.y ?? 50, width: window.width ?? "40%",height: window.height ?  (window.height == '100%' ? ((innerHeight - taskbarHeight) + 'px') : window.height ) : "400px"  }}
  enableResizing={window.enableResizing ?? true}
    minWidth={window.maxWidth ?? 350}
    minHeight={window.maxHeight ?? 350}
    bounds={"."+  wrapperClass}
    onResize={() => {seNoTransition(true)}}
    onResizeStop={() => seNoTransition(false)}
    onDrag={() => {seNoTransition(true)}}
    onDragStop={(event, d) => { handleDragStop(event as React.TouchEvent | React.MouseEvent, index, d, window)} }
    
    style={{zIndex: window.active ? 2 : 1,   transitionProperty: noTransition ? 'none' : 'width, height, transform, opacity, visibility',
    transitionDuration: '0.3s', visibility: window.minimized ? 'hidden' : 'visible',  opacity: window.minimized ? '0' : '1', 
    transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)'}}
  >
    <div className={styles.glass_effect}></div>
    <div className={`${styles.window}`} style={{...defaultSyles, ...window.windowStyles, }}>
        <div className={styles.header} style={window.headerStyles}>
          <div className={styles.app}>
          {/* {window.icon?.includes(".svg") ? (
            <div style={{ maskImage: `url(${window.icon})`, width: "21px", height: "19px" }} className="svgMask"></div>
          ) : <img src={window.icon} style={{width: "21px", height: "19px"}}></img>} */}
          <img src={window.icon} style={{width: "21px", height: "19px"}}></img>
            <span>{t(window.app)}</span>
          </div>
          {window.link && <div className={styles.link}><div style={{maskImage: `url("${lock}")`, minWidth: "14px", height: "14px"}} className='svgMask'></div> <a href={window.link} target='_blank'>{window.link.replace('https://', '').replace('http://', '').split('?')[0]}</a></div>}
          <div style={!window.link ? {marginLeft: 'auto'} : {}} className={styles.actions}>
              <button className={`${styles.action} ${styles.minimize}`} ref={ref => minimizedRefs.current[index] = ref} onTouchStart={() => handleMinimized(window.app)} onClick={() => handleMinimized(window.app)}></button>
              {!window.cantMax && <button className={`${styles.action} ${styles.maximize}`} onTouchStart={() => maximizeWindow(window, index)} onClick={ () => maximizeWindow(window, index)}></button>}
              <button className={`${styles.action} ${styles.close}`} ref={ref => closeRefs.current[index] = ref}  onTouchStart={() => handleCloseWindow(window)} onClick={() => handleCloseWindow(window)}></button>
          </div>
        </div>
        <div className={styles.body} style={window.bodyStyles}>
          {/* <div style={{backgroundColor: "white",width: "100%", height: "100%", boxSizing: "border-box"}}></div> */}
          {/* {window.link ? <iframe src={window.link} width="100%" height="100%"></iframe> : window.conteudo && <window.conteudo closeBtnRefs={closeRefs.current} closeRefIndex={index} />} */}
            <WindowContent window={window} index={index} closeRefCurrent={closeRefs.current}/>
          {/* <div style={{width: "100%", height: "100%", backgroundImage: `url(${jdm})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}></div> */}
        </div>
    </div>
  </Rnd>
          </motion.div>
))}
</AnimatePresence>
  </div>
  
};
Window.defaultProps = {
  enableResizing: true
}


export default Window;
