/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { WindowType } from '../../../constants/window';
import { useDesktopPosition } from '../../../contexts/DesktopPositonContext';
import { useTheme } from '../../../contexts/ThemeContext';
import styles from './DesktopIcon.module.scss';

type DesktopIconProp = {
    app: WindowType,
    imgWrapperStyles?: CSSProperties,
    buttonStyles?: CSSProperties,
    svgStyles?: CSSProperties,
    svgMask?: boolean,
    fromTaskbar?: boolean,
    isDragging?: boolean
}
function DesktopIcon({app, imgWrapperStyles, buttonStyles, svgStyles, svgMask, fromTaskbar, isDragging}: DesktopIconProp){
    const [theme] = useTheme();
    const [position] = useDesktopPosition();
    const { t } = useTranslation();
    const icon = svgMask ? { } :  {backgroundImage: `url("${app.icon}")`}
    const stylesDefault: CSSProperties = {...imgWrapperStyles, ...icon}
    const svgDefault = {...svgStyles, maskImage: `url("${app.icon}")` }

    
    return (
            <a  className={`${styles.desktop_icon} ${styles[position]} ${styles[theme]} ${fromTaskbar && styles.fromTaskbar} ${app.active && styles.appActive} ${isDragging && styles.dragging}`} style={buttonStyles}>
                {app.active}
                <div style={stylesDefault} className={styles.img_wrapper + " " +  (!svgMask ? 'backgroundImage' : '')}>
                    {svgMask && <div style={svgDefault} className={"svgMask " + styles.icon}></div>}
                {/* {app.icon?.includes(".svg") ? (
                <div style={{ maskImage: `url(${app.icon})` }} className={"svgMask " + styles.icon}></div>
            ) : <img src={app.icon}></img>} */}
            {/* <img src={app.icon}></img> */}
                </div>
            {!fromTaskbar && position == 'bottom' && <span className={styles.label}>
                    {t(app.app)}
                </span>}
            </a>
    )
}

export default DesktopIcon;