import { FileProps, WindowType } from '@/constants/window';
import { useContextMenuHandler } from '@/contexts/ContextMenuContext';
import DesktopIcon from '@/DesktopIcons/components/DesktopIcon/DesktopIcon';
import { useEffect, useState } from 'react';
import styles from './Folder.module.scss';

function Folder({ filePath = '/', fileList, listFiles }: FileProps) {
  const [currentPath, setCurrentPath] = useState(filePath);
  const [files, setFiles] = useState<WindowType[]>([]);
  const [history, setHistory] = useState<string[]>([filePath]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const handleCustomMenuEvent = (event: string) => {
    console.log(event);
  }
  const handleContextMenu = useContextMenuHandler('folder', handleCustomMenuEvent, currentPath);

  useEffect(() => {
    const loadFiles = async () => {
      if(listFiles){
        const filesList = await listFiles(currentPath);
        if (filesList) {
          setFiles(filesList);
        }
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
    if (file.icon === 'folder.svg') {
      const newPath = `${currentPath === '/' ? '' : currentPath}/${file.app}`;
      navigateToFolder(newPath);
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

  return (
    <div className={styles.folder} onContextMenu={handleContextMenu}>
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
      
      <div className={styles.fileGrid}>
        {files.map((file) => (
          <div 
            key={file.app} 
            onClick={() => handleFileClick(file)}
            className={styles.fileItem}
          >
            <DesktopIcon
              app={file}
              folderPath={currentPath}
              fromTaskbar={false}
              imgWrapperStyles={{ height: '48px', width: '48px' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Folder;
