import { CSSProperties, Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WindowType } from '../../../constants/window';
import { useTheme } from '../../../contexts/ThemeContext';
import styles from './DesktopIcon.module.scss';
import { useDesktopPosition } from '../../../contexts/DesktopPositonContext';
import Draggable from 'react-draggable';

type DesktopIconProp = {
    app: WindowType,
    imgWrapperStyles?: CSSProperties,
    buttonStyles?: CSSProperties,
    svgStyles?: CSSProperties,
    svgMask?: boolean,
    fromTaskbar?: boolean,
    setIsDragging:  Dispatch<SetStateAction<boolean>>
}
function DesktopIcon({app, imgWrapperStyles, buttonStyles, svgStyles, svgMask, fromTaskbar, setIsDragging}: DesktopIconProp){
    const [theme] = useTheme();
    const [position] = useDesktopPosition();
    const { t } = useTranslation();
    const icon = svgMask ? { } :  {backgroundImage: `url("${app.icon}")`}
    const stylesDefault: CSSProperties = {...imgWrapperStyles, ...icon}
    const svgDefault = {...svgStyles, maskImage: `url("${app.icon}")` }
    return (
        <Draggable onDrag={() => setIsDragging(true)} onStop={() => {setTimeout(() => setIsDragging(false), 50)}}>
            <button className={`${styles.desktop_icon} ${styles[position]} ${styles[theme]} ${fromTaskbar && styles.fromTaskbar} ${app.active && styles.appActive}`} style={buttonStyles}>
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
            </button>
        </Draggable>
    )
}

export default DesktopIcon;