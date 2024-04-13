import { CSSProperties } from 'react';
import styles from './DesktopIcon.module.scss';
import { useTheme } from '../../../contexts/ThemeContext';

type DesktopIconProp = {
    app: {
        icon: string,
        app: string
    },
    stylesProp?: CSSProperties
}
function DesktopIcon({app, stylesProp}: DesktopIconProp){
    const [theme] = useTheme();
    return (
        <button className={styles.desktop_icon + " " + styles[theme]}>
            <div style={stylesProp} className={styles.img_wrapper}>
            {/* {app.icon?.includes(".svg") ? (
            <div style={{ maskImage: `url(${app.icon})` }} className={"svgMask " + styles.icon}></div>
          ) : <img src={app.icon}></img>} */}
          <img src={app.icon}></img>
            </div>
            <span className={styles.label}>
                {app.app}
            </span>
        </button>
    )
}

export default DesktopIcon;