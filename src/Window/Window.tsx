import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Rnd } from 'react-rnd';
import lock from '../assets/window/lock.svg';
import { WindowType } from '../constants/window';
import { useWindowContext } from '../contexts/WindowContext';
import useCloseWindow from '../hooks/useCloseWindow';
import styles from './Window.module.scss';

const Window = ({wrapperClass}: {wrapperClass: string}) => {
  const [windows, setWindows] = useWindowContext();
  const windowRefs = useRef<Array<Rnd | null>>([]);
  const windowRef = useRef<HTMLDivElement>(null)
  const closeRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const minimizedRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const { t } = useTranslation();


  const handleWindowClick = (app: string, index: number, event: React.TouchEvent | React.MouseEvent) => {
    if (index !== -1 && (closeRefs.current[index] && closeRefs.current[index]?.contains(event.target as Node)) || (minimizedRefs.current[index] && minimizedRefs.current[index]?.contains(event.target as Node))) {
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

  const isMaximized = (index: number):boolean =>{
    const windowRef = windowRefs.current[index];
    if(windowRef){
      const {width, height} =  windowRef.resizable.state;
      return width == "100%" && height == (innerHeight - 51) + 'px' 
    }
    return false;
  }
  
  const maximizeWindow = (window: WindowType, index: number) => {
    const windowRef = windowRefs.current[index];
    if(windowRef){
      const isMax = isMaximized(index);
      
      const size = isMax ? {width: "40%", height: window.height ?? '400px'} : {width: "100%", height: (innerHeight - 51) + 'px'};
      windowRef?.updateSize(size);
      windowRef?.updatePosition(!isMax ? {x: 0, y: 0} : {x: window.x ?? Math.round(0.08 * innerWidth) , y: window.y ?? Math.round(0.02 * innerHeight)});
    }
    // window.active = true;
  }

  const handleDragStop = (posSize: {x: number, y:number, width?: string, height?: string}, window: WindowType) => {
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
  // resize window with drag on full screen
  // const handleDragStart = (window: WindowType, index: number) => {
  //   const windowRef = windowRefs.current[index];
  //   if(isMaximized(index)){
  //     windowRef?.updateSize({width: "50%", height: window.height ?? '400px'})
  //   }
  // }
  // was used to handle position and drag soon to be deleted
  // const setWindowPosSize = (posSize: {x: number, y:number, width?: string, height?: string}, window: WindowType
  // ) => {
  //   if(!isDragging && !posSize.width) return;
  //   setIsDragging(false);
  //   // if(isMaximized(window)){
  //   //   window.width = "40%";
  //   //   window.height = "400px"
  //   // }
  //   window = {...window, ...posSize};
    
  //   let updateWindow = windows.filter((a) => a.app != window.app);
    
  //   updateWindow = [
  //     ...updateWindow,
  //     window
  //   ]
  //   setWindows(updateWindow);
  // }

  // const defaultX = 150 * windows.length
  // const defaultY = 50 * windows.length
  return <div ref={windowRef}>
  {windows.map((window, index) => (
  <div key={window.app} onTouchStart={(event) => handleWindowClick(window.app, index, event)} onMouseDown={(event) => handleWindowClick(window.app, index, event)}
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
  default={{ x: window.x ?? 150, y:  window.y ?? 50, width: window.width ?? "40%",height: window.height ?  (window.height == '100%' ? ((innerHeight - 51) + 'px') : window.height ) : "400px"  }}
  enableResizing={window.enableResizing ?? true}
    minWidth={window.maxWidth ?? 350}
    minHeight={window.maxHeight ?? 350}
    bounds={"."+  wrapperClass}
    onDragStop={(_, d) => { handleDragStop(d, window)} }
    style={{zIndex: window.active ? 10 : 5, display: window.minimized ? 'none' : ''}}
  >
    <div className={styles.window} style={{cursor: isMaximized(index) ? 'normal' : 'move',...window.windowStyles}}>
        <div className={styles.header} style={window.headerStyles}>
          <div className={styles.app}>
          {/* {window.icon?.includes(".svg") ? (
            <div style={{ maskImage: `url(${window.icon})`, width: "21px", height: "19px" }} className="svgMask"></div>
          ) : <img src={window.icon} style={{width: "21px", height: "19px"}}></img>} */}
          <img src={window.icon} style={{width: "21px", height: "19px"}}></img>
            <span>{t(window.app)}</span>
          </div>
          {window.link && <div className={styles.link}><div style={{maskImage: `url("${lock}")`, minWidth: "14px", height: "14px"}} className='svgMask'></div> <a href={window.link} target='_blank'>{window.link.replace('https://', '').replace('http://', '')}</a></div>}
          <div style={!window.link ? {marginLeft: 'auto'} : {}} className={styles.actions}>
              {!window.cantMax && <button className={`${styles.action} ${styles.maximize}`} onTouchStart={() => maximizeWindow(window, index)} onClick={ () => maximizeWindow(window, index)}></button>}
              <button className={`${styles.action} ${styles.minimize}`} ref={ref => minimizedRefs.current[index] = ref} onTouchStart={() => handleMinimized(window.app)} onClick={() => handleMinimized(window.app)}></button>
              <button className={`${styles.action} ${styles.close}`} ref={ref => closeRefs.current[index] = ref}  onTouchStart={() => handleCloseWindow(window)} onClick={() => handleCloseWindow(window)}></button>
          </div>
        </div>
        <div className={styles.body} style={window.bodyStyles}>
          {/* <div style={{backgroundColor: "white",width: "100%", height: "100%", boxSizing: "border-box"}}></div> */}
          {/* <iframe src="http://wikipedia.com" ></iframe> */}
          {window.link ? <iframe src={window.link} width="100%" height="100%"></iframe> : window.conteudo && <window.conteudo />}
          
          {/* <div style={{width: "100%", height: "100%", backgroundImage: `url(${jdm})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}></div> */}
        </div>
    </div>
  </Rnd>
          </div>
))}
  </div>
  
};
Window.defaultProps = {
  enableResizing: true
}

export default Window;
