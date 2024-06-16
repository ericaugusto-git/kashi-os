import { useTheme } from "../../../contexts/ThemeContext";
import { useWindowContext } from "../../../contexts/WindowContext";
import styles from './MiniAllBtn.module.scss'

export default function MiniAllBtn(){
    const [, setWindows] = useWindowContext();
    const [theme] = useTheme()
    const handleClick = () => {
        setWindows(prevWindows => {
            const updatedWindows = prevWindows
                .map(window => ({ ...window, active: false, minimized: true })) 
              
            return [...updatedWindows]; // Add the new window
        });
    } 
    return <div className={`${styles['miniallbtn']} ${styles[theme.value]}`} onTouchStart={handleClick} onClick={handleClick}>

    </div>
}