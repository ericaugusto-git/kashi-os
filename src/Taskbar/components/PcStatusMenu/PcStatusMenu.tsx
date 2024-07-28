import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import locked from "../../../assets/startMenu/locked.svg";
import powerOff from "../../../assets/startMenu/power_off.svg";
import sleep from "../../../assets/startMenu/sleep.svg";
import { usePcStatus } from '../../../contexts/PcStatusContext';
import { useWindowContext } from '../../../contexts/WindowContext';
import styles from './PcStatusMenu.module.scss';
import { fetchGif } from '../../../utils/utils';

export function PcStatusMenu({pcStatusMenuOpen, setPcStatusMenuOpen}: {pcStatusMenuOpen: boolean, setPcStatusMenuOpen: Dispatch<SetStateAction<boolean>>}) {
    const [lofiUrl, setLofiUrl] = useState('');
    const [, setWindows] = useWindowContext();
    const [, setPcStatus] = usePcStatus();
    const { t } = useTranslation();
    const handlePowerOff = () => {
        setWindows([]);
        setPcStatus("shutdown");
      };

      useEffect(() => {
        const updateGif = async () => {
            setLofiUrl(await fetchGif('H62NM1ab7wzMXURdoi'));
        }
        updateGif();
      }, []);

    return <AnimatePresence>
        { pcStatusMenuOpen && <motion.div initial={{scale: 0}} animate={{scale: 1}} exit={{scale: 0, opacity: 0}}  onClick={() => setPcStatusMenuOpen(false)} className={styles.status_menu}>
            <button className={styles.btn} onClick={() => setPcStatus('sleeping')}>
                <div className={`svgMask ${styles.wallpaper_img}`} style={{ maskImage: `url("${locked}"` }}>
                </div>
                <span>{t('lock')}</span>
            </button>
            <button className={styles.btn} onClick={() => setPcStatus('sleeping')}>

                <div className={`svgMask ${styles.wallpaper_img}`} style={{ maskImage: `url("${sleep}"` }} />
                <span>{t('sleep')}</span>
            </button>
            <button className={styles.btn} onClick={() => setPcStatus('lofi')}>
                
                <div className={`backgroundImage ${styles.lofi}`} style={{ backgroundImage: `url("${lofiUrl}"` }}>
                    <img style={{width: '200px', height: '26px', paddingTop: '2px'}} src="/public/PoweredBy_200px-Black_HorizLogo.png"></img>
                </div>
                <span>wait, lofi mode?</span>
            </button>
            <button className={styles.btn} onClick={handlePowerOff}>
                <div className={`svgMask ${styles.wallpaper_img}`} style={{ maskImage: `url("${powerOff}"` }} />
                <span>{t('shut')}</span>
            </button>
        </motion.div>}
    </AnimatePresence> 
}