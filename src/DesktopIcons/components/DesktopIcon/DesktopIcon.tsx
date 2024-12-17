/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFileSystem } from '@/contexts/FileSystemContext';
import useOpenWindow from '@/hooks/useOpenWindow';
import { generateLayouts } from '@/utils/utils';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { Layouts } from 'react-grid-layout';
import { useTranslation } from 'react-i18next';
import { WindowType } from '@/constants/window';
import { useContextMenuHandler } from '@/contexts/ContextMenuContext';
import { useDesktopPosition } from '@/contexts/DesktopPositonContext';
import { useTheme } from '@/contexts/ThemeContext';
import styles from './DesktopIcon.module.scss';
import { defaultFolders, deletableDefaultFolders } from '@/constants/defaultFolders';

type DesktopIconProp = {
    app: WindowType,
    imgWrapperStyles?: CSSProperties,
    buttonStyles?: CSSProperties,
    svgStyles?: CSSProperties,
    svgMask?: boolean,
    fromTaskbar?: boolean,
    fromFolder?: boolean,   
    isDragging?: boolean,
    setLayouts?: React.Dispatch<React.SetStateAction<Layouts | null>>,
    folderPath?: string,
    hideLabel?: boolean
}
function DesktopIcon({app, imgWrapperStyles, buttonStyles, svgStyles, svgMask, fromTaskbar, isDragging, setLayouts, folderPath, fromFolder, hideLabel}: DesktopIconProp){
    const [theme] = useTheme();
    const [position] = useDesktopPosition();
    const [renameMode, setRenameMode] = useState<boolean>();
    const editableRef = useRef<HTMLSpanElement>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const {refreshFileList ,renamePath, deletePath} = useFileSystem();
    const openWindow = useOpenWindow();
    const { t } = useTranslation();


    const handleCustomMenuEvent = (event: string) => {
        switch(event){
            case 'rename':
                startRename();
                break;
            case 'open':
                openWindow(app);
                break;
            case 'delete':
                if(app.folderPath) deletePath(app.folderPath, app.app!);
                break;
        }
    }
    const handleContextMenu = useContextMenuHandler(app.appType == 'file' ? 'file' : 'app', handleCustomMenuEvent, folderPath);

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
            if (editableRef.current && app.folderPath) {
                if(newValue){
                    const oldPath = `${app.folderPath}${app.folderPath === '/' ? '' : "/"}${app.app}`;
                    const newPath = `${app.folderPath}${app.folderPath === '/' ? '' : "/"}${newValue}`;
                        renamePath(oldPath, newPath).then(() => {
                            // update the layout so the desktop item keeps its position
                            if(app.folderPath == '/home/desktop' && setLayouts){
                                setLayouts((prev) => {
                                    if(prev){
                                    for(const key of Object.keys(prev)){
                                        prev[key] = prev[key].map((a) => a.i == app.app ? {...a, i: newValue} : a);
                                    }
                                        return {...prev};
                                    }
                                    return generateLayouts().layout as Layouts;
                                })
                            }
                            refreshFileList(app.folderPath!);
                        }).catch(() => {
                            if (editableRef.current)
                            editableRef.current.textContent = app.app;
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
                
                // Select text differently based on whether it's a file or not
                const range = document.createRange();
                if (app.appType === 'file') {
                    const text = editableRef.current.textContent || '';
                    const lastDotIndex = text.lastIndexOf('.');
                    
                    if (lastDotIndex !== -1) {
                        // If there's an extension, select only up to it
                        range.setStart(editableRef.current.firstChild!, 0);
                        range.setEnd(editableRef.current.firstChild!, lastDotIndex);
                    } else {
                        // If no extension, select all content
                        range.selectNodeContents(editableRef.current);
                    }
                } else {
                    // For non-files, select all content
                    range.selectNodeContents(editableRef.current);
                }
                
                const selection = window.getSelection();
                selection?.removeAllRanges();
                selection?.addRange(range);
            }
        })
    }




    const icon = svgMask ? { } :  {backgroundImage: `url("${app.thumbnail ?? app.icon}")`}
    const stylesDefault: CSSProperties = {...imgWrapperStyles, ...icon}
    const svgDefault = {...svgStyles, maskImage: `url("${ app.thumbnail ?? app.icon}")` }
    const handleContextMenuWrapper = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.stopPropagation();
        const fullPath = folderPath + '/' + app.app;
        if(!defaultFolders.includes(fullPath) || deletableDefaultFolders.includes(fullPath)) handleContextMenu(e);
        else e.preventDefault();
    }

    
    return (
            <a onContextMenu={handleContextMenuWrapper} ref={buttonRef} className={`${styles.desktop_icon} ${styles[fromFolder ? 'bottom' : position]} ${styles[theme]} ${fromTaskbar && styles.fromTaskbar} ${app.active && styles.appActive} ${isDragging && styles.dragging}`} style={buttonStyles}>
                {app.active}
                <div style={stylesDefault} className={styles.img_wrapper + " " +  (!svgMask ? 'backgroundImage' : '')}>
                    {svgMask && <div style={svgDefault} className={"svgMask " + styles.icon}></div>}
                </div>
            {(!hideLabel || renameMode) && <span ref={editableRef} suppressContentEditableWarning={true} contentEditable={renameMode} className={`${styles.label} ${renameMode && styles.edit}`}>
                    {(folderPath == '/home/desktop' && app.app == 'projects') || folderPath == '/home' || app.appType != 'file' ? t(app.app) : app.app}
                </span>}
            </a>
    )
}

export default DesktopIcon;