import { CSSProperties } from 'react';
import styles from './DesktopIcon.module.scss';
import { useTheme } from '../../../contexts/ThemeContext';
import { WindowType } from '../../../constants/window';
import { useTranslation } from 'react-i18next';

type DesktopIconProp = {
    app: WindowType,
    imgWrapperStyles?: CSSProperties,
    buttonStyles?: CSSProperties,
    svgMask?: boolean
}
function DesktopIcon({app, imgWrapperStyles, buttonStyles, svgMask}: DesktopIconProp){
    const [theme] = useTheme();
    const { t } = useTranslation();
    const icon = svgMask ? { } :  {backgroundImage: `url("${app.icon}")`}
    const stylesDefault: CSSProperties = {...imgWrapperStyles, ...icon}
    return (
        <button className={styles.desktop_icon + " " + styles[theme]} style={buttonStyles}>
            <div style={stylesDefault} className={styles.img_wrapper + " " +  (!svgMask ? 'backgroundImage' : '')}>
                {svgMask && <div style={{ maskImage: `url("${app.icon}")` }} className={"svgMask " + styles.icon}></div>}
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