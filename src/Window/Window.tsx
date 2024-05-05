import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Rnd } from 'react-rnd';
import { WindowType } from '../constants/window';
import { useWindowContext } from '../contexts/WindowContext';
import useCloseWindow from '../hooks/useCloseWindow';
import styles from './Window.module.scss';
import lock from '../assets/window/lock.svg';

const Window = ({wrapperClass}: {wrapperClass: string}) => {
  const [windows, setWindows] = useWindowContext();
  const [isDragging, setIsDragging] = useState(false);
  const closeRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const maximizeRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const { t } = useTranslation();

  const handleWindowClick = (app: string | null | undefined, event: React.MouseEvent<HTMLDivElement> | React.TouchEvent) => {
    const index = windows.findIndex(window => window.app === app);
    if (index !== -1 && closeRefs.current[index] && closeRefs.current[index]?.contains(event.target as Node)) {
        handleCloseWindow(windows[index]);
        return;
    }
    if (index !== -1 && maximizeRefs.current[index] && maximizeRefs.current[index]?.contains(event.target as Node)) {
      if(!windows[index].active){
        setTimeout(() => {
          maximizeWindow(windows[index]);
          
        }, 100)
      }
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

  const isMaximized = (window: WindowType):boolean =>{
    return window.width == "100%" && window.height == (innerHeight - 51) + 'px' 
  }

  const maximizeWindow = (window: WindowType, event?: React.TouchEvent) => {
    event?.stopPropagation();
    if(isMaximized(window)){
      window.y =  50;
      window.x = innerWidth >= 1000 ? 150 : 0;
      window.width = "40%";
      window.height = "400px"
    }else{
      window.y =  0;
      window.x =  0;
      window.width =  "100%"; 
      window.height = (innerHeight - 51) + 'px';
    }
    // window.active = true;
    let updateWindow = windows.filter((a) => a.app != window.app);
    updateWindow = [
      ...updateWindow,
      window
    ]
    console.log(updateWindow)
    setWindows(updateWindow);
  }

  const setWindowPosSize = (posSize: {x: number, y:number, width?: string, height?: string}, window: WindowType
  ) => {
    console.log('trying')
    if(!isDragging && !posSize.width) return;
    setIsDragging(false);
    // if(isMaximized(window)){
    //   window.width = "40%";
    //   window.height = "400px"
    // }
    window = {...window, ...posSize};
    
    let updateWindow = windows.filter((a) => a.app != window.app);
    
    updateWindow = [
      ...updateWindow,
      window
    ]
    
    setWindows(updateWindow);
  }
  // const defaultX = 150 * windows.length
  // const defaultY = 50 * windows.length
  return <>
  {windows.map((window, index) => (
  <div key={window.app} onTouchStart={(event) => handleWindowClick(window.app, event)} onMouseDown={(event) => handleWindowClick(window.app, event)}
>
  <Rnd
    // default={{
    //   y: window.y ?? 50,
    //   x:window.x ?? 150,
    //   width: window.width ?? "40%",
    //   height: window.height ?? "400px" 
    // }}
    
    dragHandleClassName={styles.header}
  size={{ width: window.width ?? "40%",height: window.height ?? "400px"  }}
  position={{ x: window.x ?? 150, y:  window.y ?? 50 }}
  onDragStop={(_e, d) => { setWindowPosSize({ x: d.x, y: d.y }, window) }}  
  onDragStart={(_e, d) => { setWindowPosSize({ x: d.x, y: d.y }, window) }}  
  onDrag={() => setIsDragging(true)}
  disableDragging={isMaximized(window)}
  enableResizing={window.enableResizing ?? true}
  onResizeStop={(_e, _direction, ref, _delta, position) => {
    setWindowPosSize({
      width: ref.style.width,
      height: ref.style.height,
      ...position,
    }, window);
  }}
    minWidth={window.maxWidth ?? 350}
    minHeight={window.maxHeight ?? 350}
    bounds={"."+  wrapperClass}
    style={{zIndex: window.active ? 10 : 5}}
  >
    <div className={styles.window} style={{cursor: isMaximized(window) ? 'normal' : 'move',...window.windowStyles}}>
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
              {!window.cantMax && <button className={`${styles.action} ${styles.maximize}`} ref={ref => maximizeRefs.current[index] = ref} onTouchStart={(e) => maximizeWindow(window, e)} onClick={ () => maximizeWindow(window)}>

              </button>}
              <button className={`${styles.action} ${styles.close}`} ref={ref => closeRefs.current[index] = ref} onTouchStart={() => handleCloseWindow(window)} onClick={() => handleCloseWindow(window)}></button>

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
  </>
  
};
Window.defaultProps = {
  enableResizing: true
}

export default Window;
