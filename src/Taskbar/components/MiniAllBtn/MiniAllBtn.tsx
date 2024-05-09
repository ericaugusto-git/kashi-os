import { useWindowContext } from "../../../contexts/WindowContext";
import styles from './MiniAllBtn.module.scss'

export default function MiniAllBtn(){
    const [, setWindows] = useWindowContext();
    const handleClick = () => {
        setWindows(prevWindows => {
            const updatedWindows = prevWindows
                .map(window => ({ ...window, active: false, minimized: true })) 
              
            return [...updatedWindows]; // Add the new window
        });
    } 
    return <div className={styles['miniallbtn']} onTouchStart={handleClick} onClick={handleClick}>

    </div>
}