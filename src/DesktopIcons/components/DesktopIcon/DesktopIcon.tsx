import { CSSProperties } from 'react';
import styles from './DesktopIcon.module.scss';

type DesktopIconProp = {
    app: {
        icon: string,
        app: string
    },
    stylesProp?: CSSProperties
}
function DesktopIcon({app, stylesProp}: DesktopIconProp){
    return (
        <button className={styles.desktop_icon}>
            <div style={stylesProp} className={styles.img_wrapper}>
                <img src={app.icon}></img>
            </div>
            <span className={styles.label}>
                {app.app}
            </span>
        </button>
    )
}

export default DesktopIcon;