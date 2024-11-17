import { FileProps, WindowType } from '@/constants/window';
import { useContextMenuHandler } from '@/contexts/ContextMenuContext';
import { useEffect, useState } from 'react';
import styles from './Folder.module.scss';
import { useTranslation } from 'react-i18next';
import DesktopIcon from '@/DesktopIcons/components/DesktopIcon/DesktopIcon';
import useOpenWindow from '@/hooks/useOpenWindow';
import { useFileSystem } from '@/contexts/FileSystemContext';
import { windowsTemplates } from '@/constants/windowsTemplate';

function Folder({ filePath = '/home', fileList, listFiles }: FileProps) {
  const [currentPath, setCurrentPath] = useState(filePath);
  const [files, setFiles] = useState<WindowType[]>([]);
  const [history, setHistory] = useState<string[]>([filePath]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const { t } = useTranslation();
  const { handleDrop } = useFileSystem();
  const openWindow = useOpenWindow();
  const handleCustomMenuEvent = (event: string) => {
    console.log(event);
  }
  const handleContextMenu = useContextMenuHandler('folder', handleCustomMenuEvent, currentPath);

  useEffect(() => {
    const loadFiles = async () => {
      if(listFiles){
        let filesList = await listFiles(currentPath) || [];
        console.log(currentPath);
        if(currentPath === '/home/desktop/projects'){
          const projects = windowsTemplates.filter(window => window.appType === 'project');
          filesList = [...filesList, ...projects];
        }
        setFiles(filesList);
      }
    };
    loadFiles();
  }, [currentPath, listFiles, fileList]);

  const navigateToFolder = (folderPath: string) => {
    // Remove any forward history when navigating to a new path
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(folderPath);
    
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentPath(folderPath);
  };

  const handleFileClick = (file: WindowType) => {
    if (file.icon?.includes('folder')) {
      const newPath = `${currentPath === '/' ? '' : currentPath}/${file.app}`;
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
    <div className={styles.folder} onContextMenu={handleContextMenu} onDrop={handleDropWrapper} onDragOver={handleDragOver}>
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
        <div className={styles.pathDisplay}>
          {currentPath}
        </div>
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
      {files.length > 0 && <div className={styles.fileGrid}>
        {files.map((file) => (
          <div 
            key={file.app} 
            onClick={() => handleFileClick(file)}
            className={styles.fileItem}
          >
            <DesktopIcon app={file} folderPath={currentPath} svgStyles={file.desktopStyles?.svg} svgMask={file.svgMask?.desktop} buttonStyles={file.desktopStyles?.button} imgWrapperStyles={file.desktopStyles?.img} />
          </div>
        ))}
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
