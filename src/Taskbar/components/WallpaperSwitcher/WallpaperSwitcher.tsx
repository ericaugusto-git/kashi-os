import { AnimatePresence, motion } from 'framer-motion';
import { CSSProperties } from 'react';
import { wallpapers } from '../../../constants/wallpapers';
import { useTheme } from "../../../contexts/ThemeContext";
import { useWallpaper } from '../../../contexts/WallpaperContext';
import style from './WallpaperSwitcher.module.scss';



type WallpaperSwitcherProps = {
    wallpaperSwitcherOpen: boolean
}

export default function WallpaperSwitcher({wallpaperSwitcherOpen}: WallpaperSwitcherProps){
    const [theme] = useTheme();
    const [wallpaperIndex, setWallpaperIndex] = useWallpaper();
    const handleChangeTheme = (index: number) => {
        localStorage.setItem(theme + "Wallpaper", index.toString())
        setWallpaperIndex(() => index);
    }

    return     <AnimatePresence>
    {wallpaperSwitcherOpen && <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className={style.wallpapers} style={{'--wallpapers-length': wallpapers[theme].length + 1} as CSSProperties}>
    {wallpapers[theme].map((wallpaper, index) => 

<a onClick={() => handleChangeTheme(index)} key={index} className={`${style.wallpaper}  ${index == wallpaperIndex && style.active}`}>
    <div className={`backgroundImage ${style.wallpaper_img}`} style={{backgroundImage: `url("${wallpaper}"`}}>

    </div>
</a>
)}
    </motion.div>}
    /</AnimatePresence>
}