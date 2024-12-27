import { ThemesJS } from '@/constants/themes';
import { FileAsUrl, useFileSystem } from '@/contexts/FileSystemContext';
import { AnimatePresence, motion } from 'framer-motion';
import { CSSProperties, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from "../../../contexts/ThemeContext";
import { useWallpaper } from '../../../contexts/WallpaperContext';
import style from './WallpaperSwitcher.module.scss';



type WallpaperSwitcherProps = {
    wallpaperSwitcherOpen: boolean,
    setwWallpaperSwitcherOpen: Dispatch<SetStateAction<boolean>>,
    themes: ThemesJS
}

export default function WallpaperSwitcher({wallpaperSwitcherOpen, setwWallpaperSwitcherOpen, themes}: WallpaperSwitcherProps){
    const [theme] = useTheme();
    const {t} = useTranslation();
    const {readFilesFromDir, fileList} = useFileSystem();
    const [wpprs, setWpprs] = useState<FileAsUrl[]>([]);
    useEffect(() => {
        const getWpprsUrl = async () => {
            const urls = await readFilesFromDir(themes[theme].wpprsPath, true);
            setWpprs(urls as FileAsUrl[])
        }
        getWpprsUrl();
    },[readFilesFromDir, fileList, theme])
    const [wallpaper, setWallpaper] = useWallpaper();
    const handleWpprChange = (name: string) => {
        setWallpaper(() => name);
        setwWallpaperSwitcherOpen(false)
    }

    return     <AnimatePresence>
    {wallpaperSwitcherOpen && 
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className={style.wallpapers} style={{'--wallpapers-length': wpprs.length + 1} as CSSProperties}>
    {wpprs.map((wppr, index) => {
        const wpprName = wppr.name;
return <a title={wpprName} onClick={() => handleWpprChange(wpprName!)} key={index} className={`${style.wallpaper}  ${wallpaper === wpprName && style.active}`}>
    <div className={`backgroundImage ${style.wallpaper_img}`} style={{backgroundImage: `url("${wppr.url}"`}}>
    </div>
    <span>
        {wpprName}
    </span>
</a>
    }
    
)}
    {wpprs.length === 0 && <p className={style.not_found}> {t('wppr_not_found')} {themes[theme].wpprsPath}</p>}
    </motion.div>
    }
    /</AnimatePresence>
}