import { defaultFiles } from '@/constants/defaultFolders';
import { FileProps, AppType } from '@/constants/apps';
import { APPS } from '@/constants/apps';
import { useContextMenuHandler } from '@/contexts/ContextMenuContext';
import { useFileSystem } from '@/contexts/FileSystemContext';
import DesktopIcon from '@/DesktopIcons/components/DesktopIcon/DesktopIcon';
import useOpenWindow from '@/hooks/useOpenWindow';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Folder.module.scss';

function Folder({ filePath = '/home', fileList, listFiles, pathExists }: FileProps) {
  const [currentPath, setCurrentPath] = useState(filePath);
  const [files, setFiles] = useState<AppType[]>([]);
  const [loading, setLoading] = useState<boolean>()
  const [history, setHistory] = useState<string[]>([filePath]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const editableRef = useRef<HTMLSpanElement>(null);
  const { t } = useTranslation();
  const { handleDrop, createFile } = useFileSystem();
  const openWindow = useOpenWindow();

  const handleContextMenu = useContextMenuHandler('folder', undefined, currentPath);

  useEffect(() => {
    const createDefaultFiles = async () => {
      const wasCreated = localStorage.getItem(currentPath);
      if(defaultFiles[currentPath] && !wasCreated){
        localStorage.setItem(currentPath, 'true');
        setLoading(true);
        for await (const fileUrl of defaultFiles[currentPath]){
          await addDefaultFile(fileUrl);
          if(listFiles){
            const filesList = await listFiles(currentPath) || []
            setFiles(filesList);
          }
        }
        if(listFiles){
          const filesList = await listFiles(currentPath) || []
          setFiles(filesList);
        }
        setLoading(false);
      }
    }
    createDefaultFiles();
  })

  useEffect(() => {
    const loadFiles = async () => {
      if(listFiles){
        try{
          let filesList = await listFiles(currentPath) || []
          
          if(currentPath === '/home/desktop/projects'){
            const projects = APPS.filter(app => app.appType === 'project');
            filesList = [...filesList, ...projects];
          }
          setFiles(filesList);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch(e: any){
          if(e?.code == "ENOENT"){
            goUp();
          }
        }

      }
    };
    loadFiles();
  }, [currentPath, listFiles, fileList]);

  useEffect(() => {
    const applyChanges = async () => {
        const newValue = editableRef?.current?.textContent;
        if(newValue && await pathExists!(newValue)){
          navigateToFolder(newValue);
        }else if(editableRef.current){
          editableRef.current.textContent = currentPath;
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
  },[currentPath]);

  const  addDefaultFile = async (fileUrl: string) => {
    try{
      const response = await fetch(fileUrl, {cache: "no-store"});
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
  
      // Decode the URL in case it contains encoded characters
      const decodedUrl = decodeURIComponent(fileUrl);
  
      // Extract the file name using split
      const fileName = decodedUrl.split('/').pop();
  
          // Convert the response to a Blob
          const blob = await response.blob();
  
          // Create a File object from the Blob
          const file = new File([blob], fileName!, {
            type: blob.type,
          });
      createFile(currentPath, file, null, true);
    } catch(e){
      console.log(e);
    }
  }

  const navigateToFolder = (folderPath: string) => {
    // Remove any forward history when navigating to a new path
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(folderPath);
    
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentPath(folderPath);
  };

  const handleFileClick = (file: AppType) => {
    if (file.icon?.includes('folder')) {
      const newPath = `${currentPath === '/' ? '' : currentPath}/${file.name}`;
      navigateToFolder(newPath);
    }else{
      openWindow(file);
    }
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentPath(history[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentPath(history[historyIndex + 1]);
    }
  };

  const goUp = () => {
    if (currentPath === '/') return;
    const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
    navigateToFolder(parentPath || '/');
  };

  const handleDropWrapper = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    handleDrop(currentPath, event);
  }


  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <div className={`${styles.folder} ${loading && styles.loading}`} onContextMenu={handleContextMenu} onDrop={handleDropWrapper} onDragOver={handleDragOver}>
       <div className={styles.navigation}>
        <button 
          onClick={goBack} 
          disabled={historyIndex === 0}
          className={styles.navButton}
        >
          ←
        </button>
        <button 
          onClick={goForward} 
          disabled={historyIndex === history.length - 1}
          className={styles.navButton}
        >
          →
        </button>
        <button 
          onClick={goUp}
          disabled={currentPath === '/'}
          className={styles.navButton}
        >
          ↑
        </button>
        <span ref={editableRef} spellCheck="false" suppressContentEditableWarning={true} contentEditable className={styles.pathDisplay}>
          {currentPath}
        </span>
      </div>
      <div className={styles.body}>
      <menu onContextMenu={(e) => {e.stopPropagation(); e.preventDefault()}}>
        <li onClick={() => navigateToFolder('/home')}>
          <a>
            <div className={`${styles.icon} svgMask`} style={{maskImage: 'url(folder/home.svg)'}}></div>
            {t('home')}
          </a>
        </li>
        <li onClick={() => navigateToFolder('/home/desktop')}>
          <a>
            <div className={`${styles.icon} svgMask`} style={{maskImage: 'url(folder/desktop.svg)'}}></div>
            {t('desktop')}
          </a>
        </li>
        <li onClick={() => navigateToFolder('/home/downloads')}>
          <a>
            <div className={`${styles.icon} svgMask`} style={{maskImage: 'url(folder/download.svg)'}}></div>
            {t('downloads')}
          </a>
        </li>
        <li onClick={() => navigateToFolder('/home/music')}>
          <a>
            <div className={`${styles.icon} svgMask`} style={{maskImage: 'url(folder/music.svg)'}}></div>
            {t('music')}
          </a>
        </li>
        <li onClick={() => navigateToFolder('/home/videos')}>
          <a>
            <div className={`${styles.icon} svgMask`} style={{maskImage: 'url(folder/video.svg)'}}></div>
            {t('videos')}
          </a>
        </li>
        <li onClick={() => navigateToFolder('/home/pictures')}>
          <a>
            <div className={`${styles.icon} svgMask`} style={{maskImage: 'url(folder/photo.svg)'}}></div>
            {t('pictures')}
          </a>
        </li>
        <li onClick={() => navigateToFolder('/home/documents')}>
          <a>
            <div className={`${styles.icon} svgMask`} style={{maskImage: 'url(folder/file.svg)'}}></div>
            {t('documents')}
          </a>
        </li>
      </menu>
      {files.length > 0 && 
        <div className={`${styles.gridWrapper} custom_scrollbar`}>
       <div className={`${styles.fileGrid} custom_scrollbar`}>
          {files.map((file) => (
            <div 
              key={file.name} 
              onClick={() => handleFileClick(file)}
              className={styles.fileItem}
            >
              <DesktopIcon app={file} fromFolder={true} folderPath={currentPath} svgStyles={file.desktopStyles?.svg} svgMask={file.svgMask?.desktop} buttonStyles={file.desktopStyles?.button} imgWrapperStyles={file.desktopStyles?.img} />
            </div>
          ))}
      {loading && <div className={styles["loader_wrapper"]}><div className={styles["loader"]}></div>loading files</div> }
        </div>
      </div>}
      {files.length === 0 && <div className={styles.folderEmpty}>
        {t('folder_empty')}
        <span className={`${styles.folderEmptyIcon} svgMask`} style={{maskImage: 'url(folder/folder_open.svg)'}}></span>
        </div>}
      </div>
    </div>
  );
}



export default Folder;
