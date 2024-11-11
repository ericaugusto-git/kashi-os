/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WindowType } from '../../../constants/window';
import { useDesktopPosition } from '../../../contexts/DesktopPositonContext';
import { useTheme } from '../../../contexts/ThemeContext';
import styles from './DesktopIcon.module.scss';
import { useContextMenuHandler } from '../../../contexts/ContextMenuContext';
import { useFileSystem } from '@/contexts/FileSystemContext';
import { Layouts } from 'react-grid-layout';
import { generateLayouts } from '@/utils/utils';
import useOpenWindow from '@/hooks/useOpenWindow';

type DesktopIconProp = {
    app: WindowType,
    imgWrapperStyles?: CSSProperties,
    buttonStyles?: CSSProperties,
    svgStyles?: CSSProperties,
    svgMask?: boolean,
    fromTaskbar?: boolean,
    isDragging?: boolean,
    setLayouts?: React.Dispatch<React.SetStateAction<Layouts | null>>
}
function DesktopIcon({app, imgWrapperStyles, buttonStyles, svgStyles, svgMask, fromTaskbar, isDragging, setLayouts}: DesktopIconProp){
    const [theme] = useTheme();
    const [position] = useDesktopPosition();
    const [renameMode, setRenameMode] = useState<boolean>();
    const editableRef = useRef<HTMLSpanElement>(null);
    const {refreshFileList ,renamePath, deletePath} = useFileSystem();
    const openWindow = useOpenWindow();
    const { t } = useTranslation();

    const handleCustomMenuEvent = (event: string) => {
        console.log(event)
        switch(event){
            case 'rename':
                startRename();
                break;
            case 'open':
                openWindow(app);
                break;
            case 'delete':
                console.log(app.folderPath)
                if(app.folderPath) deletePath(app.folderPath, app.app!);
                break;
        }
    }
    const handleContextMenu = useContextMenuHandler(app.appType == 'file' ? 'file' : 'app', handleCustomMenuEvent);

    // this was a logic to translate the folder name, but it was removed because it's dumb and troublesome
    // let folderName = app.app;
    // if(app.appType == 'folder' && app.app.includes("new_folder_w_count")){
    //     const count = app.app.replace('new_folder_w_count', '');
    //     const name = count && count !== '0'  ? t('new_dir_with_suffix', { suffix: count }) : t('new_dir');
    //     folderName = name;
    // }
    useEffect(() => {
        const applyChanges = () => {
            const newValue = editableRef?.current?.textContent;
            setRenameMode(false);
            if(app.app === newValue){
                console.warn("Rename path is equal to original.")
                return;
            }
            console.log("1")
            console.log(setLayouts)
            if (editableRef.current && app.folderPath && setLayouts) {
                console.log("2")
                if(newValue){
                        renamePath(app.folderPath, app.app, newValue!).then(() => {
                            // update the layout so the desktop item keeps its position
                            setLayouts((prev) => {
                                if(prev){
                                    for(const key of Object.keys(prev)){
                                        prev[key] = prev[key].map((a) => a.i == app.app ? {...a, i: newValue} : a);
                                    }
                                    return {...prev};
                                }
                                return generateLayouts().layout as Layouts;
                            })
                            refreshFileList('/');
                        }).catch((e) => {
                            if (editableRef.current)
                            editableRef.current.textContent = app.app;
                            console.log(e);
                        });
                }else{
                    
                    editableRef.current.textContent = app.app;
                }
            }
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent newline character from being added
                editableRef?.current?.blur(); // Unfocus the element and as consequence calls applyChanges
            }
        };


        const currentEditable = editableRef.current;
        if(currentEditable){
            currentEditable.addEventListener('keydown', handleKeyDown);
            currentEditable.addEventListener('blur', applyChanges);
    
            return () => {
                currentEditable.removeEventListener('keydown', handleKeyDown);
                currentEditable.removeEventListener('blur', applyChanges);
            };
        }
    },[app, renamePath]);
    const startRename = () => {
        setRenameMode(true);
        setTimeout(() => {

            if(editableRef.current){
                editableRef.current.focus();
                // Select the text inside the editable span
                const range = document.createRange();
                range.selectNodeContents(editableRef.current);
                const selection = window.getSelection();
                selection?.removeAllRanges(); // Clear any existing selections
                selection?.addRange(range); // Add the new range
            }
        })
    }




    const icon = svgMask ? { } :  {backgroundImage: `url("${app.icon}")`}
    const stylesDefault: CSSProperties = {...imgWrapperStyles, ...icon}
    const svgDefault = {...svgStyles, maskImage: `url("${app.icon}")` }

    
    return (
            <a onContextMenu={handleContextMenu}  className={`${styles.desktop_icon} ${styles[position]} ${styles[theme]} ${fromTaskbar && styles.fromTaskbar} ${app.active && styles.appActive} ${isDragging && styles.dragging}`} style={buttonStyles}>
                {app.active}
                <div style={stylesDefault} className={styles.img_wrapper + " " +  (!svgMask ? 'backgroundImage' : '')}>
                    {svgMask && <div style={svgDefault} className={"svgMask " + styles.icon}></div>}
                {/* {app.icon?.includes(".svg") ? (
                <div style={{ maskImage: `url(${app.icon})` }} className={"svgMask " + styles.icon}></div>
            ) : <img src={app.icon}></img>} */}
            {/* <img src={app.icon}></img> */}
                </div>
            {!fromTaskbar && position == 'bottom' && <span ref={editableRef} onMouseDown={(e) => e.stopPropagation()} suppressContentEditableWarning={true} contentEditable={renameMode} className={`${styles.label} ${renameMode && styles.edit}`}>
                    {app.appType == 'file' ? app.app : t(app.app)}
                </span>}
            </a>
    )
}

export default DesktopIcon;