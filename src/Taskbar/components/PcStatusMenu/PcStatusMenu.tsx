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
            <motion.button whileHover={{scale:"1.18", borderRadius: "40px", borderBottomRightRadius: '0',transition: { duration: 0.2 } }}   className={styles.btn} onClick={() => setPcStatus('sleeping')}>
                <div className={`svgMask ${styles.wallpaper_img}`} style={{ maskImage: `url("${locked}"` }}>
                </div>
                <span>{t('lock')}</span>
            </motion.button>
            <motion.button whileHover={{scale:"1.18", borderRadius: "40px", borderBottomLeftRadius: '0',transition: { duration: 0.2 } }}  className={styles.btn} onClick={() => setPcStatus('sleeping')}>

                <div className={`svgMask ${styles.wallpaper_img}`} style={{ maskImage: `url("${sleep}"` }} />
                <span>{t('sleep')}</span>
            </motion.button>
            <motion.button style={{ backgroundImage: `url("${lofiUrl}"` }} whileHover={{scale:"1.18", borderRadius: "40px", borderTopRightRadius: '0',transition: { duration: 0.2 } }}  className={`backgroundImage ${styles.lofi} ${styles.btn}`} onClick={() => setPcStatus('lofi')}>
                <img style={{width: '100px', height: '27px', paddingTop: '2px',position: "absolute", top: "10px", left: "10px"}} onClick={(e) => {e.stopPropagation(); window.open(lofiUrl, '_blank')}} src="Poweredby_100px-Black_VertLogo.png"></img>
                {/* <div className={``} >
                </div> */}
                <span>wait, lofi mode?</span>
            </motion.button>
            <motion.button whileHover={{scale:"1.18", borderRadius: "40px", borderTopLeftRadius: '0',transition: { duration: 0.2 } }} className={styles.btn} onClick={handlePowerOff}>
                <div className={`svgMask ${styles.wallpaper_img}`} style={{ maskImage: `url("${powerOff}"` }} />
                <span>{t('shut')}</span>
            </motion.button>
        </motion.div>}
    </AnimatePresence> 
}