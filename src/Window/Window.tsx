import { Rnd } from 'react-rnd';
import React, { useContext } from 'react';
import { WindowContext } from '../App';
import { projects, projectsType } from '../constants/projects';
import styles  from './Window.module.scss';
import jdm from '../assets/jdm.png'
import angular from '../assets/taskbar/skills/angular.png'



const Window = () => {
  const [windows, setWindows] = useContext(WindowContext);

  const handleWindowClick = (app: string) => {
    windows.map((a) => a.active = a.app === app);
    const updatedWindows = windows.map(w => ({
      ...w,
      active: w.app === app
    }));
    setWindows(updatedWindows);
  }

  const closeWindow = (app: string) => {
    const updateWindows = windows.filter((a) => a.app != app);
    setWindows(updateWindows)
  }

  const maximizeWindow = (window: projectsType) => {
    window.y =  0;
    window.x =  0;
    if(window.width == "100%" && window.height == "94%"){
        window.width = "40%";
        window.height = "400px"
    }else{
      window.width =  "100%"; 
      window.height = "94%";
    }
    let updateWindow = windows.filter((a) => a.app != window.app);
    console.log(windows)
    console.log(updateWindow)
    updateWindow = [
      ...windows,
      window
    ]
    setWindows(updateWindow);
  }
  console.log(windows)
  return <>
  {windows.map((window) => (
  <div key={window.app} onMouseDown={() => handleWindowClick(window.app)}
>
  <Rnd
    default={{
      y: window.y ?? 50,
      x:window.x ?? 150,
      width: window.width ?? "40%",
      height: window.height ?? "400px" 
    }}

    minWidth={320}
    minHeight={320}
    bounds="window"
    style={{zIndex: window.active ? 2 : 1}}
  >
    <div className={styles.window}>
        <div className={styles.header}>
          <div className={styles.app}>
            <img src={angular}></img>
            <span>{window.app}</span>
          </div>
          <div className={styles.actions}>
              <button className={`${styles.action} ${styles.maximize}`} onClick={ () => maximizeWindow(window)}>

              </button>
              <button className={`${styles.action} ${styles.close}`} onClick={() => closeWindow(window.app)}>

              </button>
          </div>
        </div>
        <div className={styles.body}>
          {/* <div style={{backgroundColor: "white",width: "100%", height: "100%", boxSizing: "border-box"}}></div> */}
          <div style={{width: "100%", height: "100%", backgroundImage: `url(${jdm})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}></div>
        </div>
    </div>
  </Rnd>
          </div>
))}
  </>
};

export default Window;
