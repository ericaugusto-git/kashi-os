import { Rnd } from 'react-rnd';
import { WindowType } from '../constants/window';
import { useWindowContext } from '../contexts/WindowContext';
import styles from './Window.module.scss';
import useCloseWindow from '../hooks/useCloseWindow';


const Window = () => {
  const [windows, setWindows] = useWindowContext();

  const handleWindowClick = (app: string) => {
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
  // const closeWindow = (app: string) => {
  //   const updateWindows = windows.filter((a) => a.app != app);
  //   setWindows(updateWindows)
  // }

  const maximizeWindow = (window: WindowType) => {
    if(window.width == "100%" && window.height == "95dvh"){
      window.y =  50;
      window.x =  150;
      window.width = "40%";
      window.height = "400px"
    }else{
      window.y =  0;
      window.x =  0;
      window.width =  "100%"; 
      window.height = "95dvh";
    }
    let updateWindow = windows.filter((a) => a.app != window.app);
    updateWindow = [
      ...updateWindow,
      window
    ]
    console.log(updateWindow)
    setWindows(updateWindow);
  }

  const setWindowPosSize = (posSize: {x: number, y:number, width?: string, height?: string}, window: WindowType) => {
    if(window.width == "100%" && window.height == "95dvh"){
      window.width = "40%";
      window.height = "400px"
    }
    window = {...window, ...posSize};
    console.log(window);
    let updateWindow = windows.filter((a) => a.app != window.app);
    console.log("update")
    updateWindow = [
      ...updateWindow,
      window
    ]
    console.log(updateWindow)
    setWindows(updateWindow);
  }
  // const defaultX = 150 * windows.length
  // const defaultY = 50 * windows.length
  return <>
  {windows.map((window) => (
  <div key={window.app} onMouseDown={() => handleWindowClick(window.app)}
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
  disableDragging={window.width == "100%" && window.height == "95dvh"}
  onResizeStop={(_e, _direction, ref, _delta, position) => {
    setWindowPosSize({
      width: ref.style.width,
      height: ref.style.height,
      ...position,
    }, window);
  }}
    minWidth={320}
    minHeight={500}
    bounds="window"
    style={{zIndex: window.active ? 2 : 1}}
  >
    <div className={styles.window} style={window.windowStyles}>
        <div className={styles.header} style={window.headerStyles}>
          <div className={styles.app}>
          {window.icon?.includes(".svg") ? (
            <div style={{ maskImage: `url(${window.icon})`, width: "21px", height: "19px" }} className="svgMask"></div>
          ) : <img src={window.icon} style={{width: "21px", height: "19px"}}></img>}
            <span>{window.app}</span>
          </div>
          <div className={styles.actions}>
              {!window.cantMax && <button className={`${styles.action} ${styles.maximize}`} onClick={ () => maximizeWindow(window)}>

              </button>}
              <button className={`${styles.action} ${styles.close}`} onClick={() => handleCloseWindow(window)}>

              </button>
          </div>
        </div>
        <div className={styles.body} style={window.bodyStyles}>
          {/* <div style={{backgroundColor: "white",width: "100%", height: "100%", boxSizing: "border-box"}}></div> */}
          {/* <iframe src="http://wikipedia.com" ></iframe> */}
          {window.conteudo}
          {/* <div style={{width: "100%", height: "100%", backgroundImage: `url(${jdm})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}></div> */}
        </div>
    </div>
  </Rnd>
          </div>
))}
  </>
};

export default Window;
