import { usePcStatus } from '@/contexts/PcStatusContext';
import { useTranslation } from 'react-i18next';
import styles from './Lockscreen.module.scss';

export default function Lockscreen({wallpaperUrl}: {wallpaperUrl: string | undefined}){

    const [_, setPcStatus] = usePcStatus();
    const {t} = useTranslation();
    return <div className={styles.lock}>
        <div className={`backgroundImage ${styles.user}`} style={{backgroundImage: `url("${wallpaperUrl}")`}}>

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