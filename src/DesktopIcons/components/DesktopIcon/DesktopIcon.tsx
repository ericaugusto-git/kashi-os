import { CSSProperties } from 'react';
import styles from './DesktopIcon.module.scss';
import { useTheme } from '../../../contexts/ThemeContext';
import { WindowType } from '../../../constants/window';
import { useTranslation } from 'react-i18next';

type DesktopIconProp = {
    app: WindowType,
    stylesProp?: CSSProperties
}
function DesktopIcon({app, stylesProp}: DesktopIconProp){
    const [theme] = useTheme();
    const { t } = useTranslation();
    const stylesDefault: CSSProperties = {...stylesProp, backgroundImage: `url(${app.icon})`}
    return (
        <button className={styles.desktop_icon + " " + styles[theme]}>
            <div style={stylesDefault} className={styles.img_wrapper + " backgroundImage"}>
            {/* {app.icon?.includes(".svg") ? (
            <div style={{ maskImage: `url(${app.icon})` }} className={"svgMask " + styles.icon}></div>
          ) : <img src={app.icon}></img>} */}
          {/* <img src={app.icon}></img> */}
            </div>
            <span className={styles.label}>
                {t(app.app)}
            </span>
        </button>
    )
}

export default DesktopIcon;