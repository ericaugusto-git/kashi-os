import { CSSProperties, useContext, useEffect, useState } from "react";
import { StartSetterContext } from "../../../App";
import startIcon from "../../../assets/taskbar/start_icon.png";
import Button from "../Button/Button";
import styles from "./Start.module.scss";
interface MousePosition {
    x: number;
    y: number;
  }
  
function Start() {
  const buttonStyles = {
    height: "41px",
    width: "41px",
    backgroundColor: '#161616',
    border: "1px solid rgb(255 255 242)"
  };
  const hoverStyles = {
    backgroundColor: '#3d3d3d'
  }
  const [startMenuOpen, setStartMenuOpen, toggleButtonRef] =
    useContext(StartSetterContext);
  const handleClick = () => {
    setStartMenuOpen((previousValue) => !previousValue);
  };

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // console.log(e)
    setMousePosition({ x: e.clientX, y: e.clientY });
  };
  const calculatePupilPosition = (side: string): MousePosition => {
    const eyeRect = document.querySelector(`.${styles['eye--' + side]}`)?.getBoundingClientRect();
    if (!eyeRect) return { x: 0, y: 0 };
  
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;

    const deltaX = mousePosition.x - eyeCenterX;
    const deltaY = mousePosition.y - eyeCenterY;
    const angle = Math.atan2(deltaY, deltaX);

    const maxDistance = Math.min(eyeRect.width / 2, eyeRect.height / 2); // Maximum distance from the center of the eye

    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance) - 1;
    const pupilX = Math.cos(angle) * distance;
    const pupilY = Math.sin(angle) * distance;
    return { x: pupilX, y: pupilY };
  };
  
  return (
    <div  onMouseMove={handleMouseMove} className={styles.startBtnWrapper}>
    <Button
      ref={toggleButtonRef}
      hoverStyles={hoverStyles}
      styles={buttonStyles}
      handleClick={handleClick}
      outline={true}
    >
      {/* <div style={{height: "21px", width: "21px"}}>
                <img style={{height: "100%", width: "100%"}} src={startIcon}></img>
            </div> */}
   <div className={styles['cat']}>
      <div className={`${styles['ear']} ${styles['ear--left']}`}></div>
      <div className={`${styles['ear']} ${styles['ear--right']}`}></div>
      <div className={styles['face']}>
        <div className={`${styles['eye']} ${styles['eye--left']}`}>
          <div className={styles['eye-pupil']} style={{ transform: `translate(${calculatePupilPosition('left').x}px, ${calculatePupilPosition('left').y}px)` }}></div>
        </div>
        <div className={`${styles['eye']} ${styles['eye--right']}`}>
          <div className={styles['eye-pupil']} style={{ transform: `translate(${calculatePupilPosition('right').x}px, ${calculatePupilPosition('right').y}px)` }}></div>
        </div>
        <div className={styles['muzzle']}></div>
      </div>
    </div>
    </Button>
    </div>
  );
}

export default Start;