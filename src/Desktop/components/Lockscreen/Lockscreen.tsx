import { useWallpaper } from '@/contexts/WallpaperContext';
import styles from './Lockscreen.module.scss';
import { wallpapers } from '@/constants/wallpapers';
import { useTheme } from '@/contexts/ThemeContext';
import { usePcStatus } from '@/contexts/PcStatusContext';
import { useTranslation } from 'react-i18next';

export default function Lockscreen(){
    const [wallpaperIndex] = useWallpaper();
    const [theme] = useTheme();
    const currentWppr = wallpapers[theme][wallpaperIndex];
    const [_, setPcStatus] = usePcStatus();
    const {t} = useTranslation();
    return <div className={styles.lock}>
        <div className={`backgroundImage ${styles.user}`} style={{backgroundImage: `url("${currentWppr}")`}}>

        </div>
        {t('guest')}
        <div className={styles.form}>
            <input type="password" placeholder={t('enter_password')}/>
            <button data-tooltip={t("confirm")} onClick={() => setPcStatus("on")}>
                <div className={`svgMask ${styles.icon}`}   style={{maskImage: `url("arrow_right.svg")`}}></div>
            </button>
        </div>
    </div>
}