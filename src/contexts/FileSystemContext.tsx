import { fileIcons } from '@/constants/fileIcons';
import { imageMimeTypes, videoMimeTypes } from '@/constants/mimeTypes';
import { WindowType } from '@/constants/window';
import { Monaco } from '@/Monaco/Monaco';
import { Pdf } from '@/Pdf/Pdf';
import Photo from '@/Photo/Photo';
import { generateVideoThumbnail } from '@/utils/thumbnailGenerator';
import { Video } from '@/Video/Video';
import * as BrowserFS from 'browserfs';
import { FSModule } from 'browserfs/dist/node/core/FS';
import { Buffer } from 'buffer';
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react';

interface FileSystemContextType {
  fileList: WindowType[] | null,
  handleDrop: (folderPath: string, event: React.DragEvent<HTMLDivElement>) => Promise<void>;
  refreshFileList: (folderPath: string) => Promise<void>;
  createFile: (folderPath: string, file: File) => Promise<void>;
  readFile: (filePath: string) => Promise<Buffer | null>;
  getFileUrl: (filePath: string, type?: string) => Promise<string>;
  updateFile: (filePath:string, newContent: string) => Promise<void>;
  deletePath: (folderPath: string, fileName: string) => Promise<void>;
  createFolder: (folderPath: string, folderName: string) => Promise<void>;
  listFiles: (folderPath: string) => Promise<WindowType[] | null>;
  renamePath: (folderPath: string, oldName: string, newName: string) => Promise<void>;
  format: () => void;
}

const FileSystemContext = createContext<FileSystemContextType | undefined>(undefined);

export const FileSystemProvider = ({ children }: { children: ReactNode }) => {
  const [fs, setFs] = useState<FSModule | null>(null);
  const [fileList, setFileList] = useState<WindowType[] | null>(null);
  const fileListRef = useRef<WindowType[] | null>(null);



  useEffect(() => {
    fileListRef.current = fileList;
  }, [fileList]);

  

  const createFolder = async (folderPath: string = '/', folderName: string) => {
    if (!fs) return;
    const fullPath = `${folderPath}/${folderName}`;
    await new Promise<void>((resolve, reject) => {
      fs.mkdir(fullPath, '0777', (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
    refreshFileList(folderPath);
  };

  const createFile = useCallback(async (folderPath: string = '/', file: File) => {
    if (!fs) return;

    const filePath = `${folderPath}/${file.name}`;

    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer); // Convert ArrayBuffer to Buffer

        fs.writeFile(filePath, buffer, (err) => {
            if (err) {
                console.error('Error creating file:', err);
            } else {
                refreshFileList(folderPath)
            }
        });
    } catch (error) {
        console.error('Error processing file:', error);
    }
}, [fs]);




  const readFile = useCallback((filePath: string): Promise<Buffer | null> => {
    return new Promise((resolve) => {
      if (!fs) return resolve(null);
      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          return resolve(null);
        }
        resolve(data || null);
      });
    });
  }, [fs]);

  const updateFile = useCallback((filePath: string, newContent: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!fs) return reject("File system not initialized");
      fs.writeFile(filePath, newContent, (err) => {
        if (err) {
          console.error("Error updating file:", err);
          return reject(err);
        }
        resolve();
      });
    });
  }, [fs]);

  const deletePath = useCallback((folderPath: string = '/', name: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!fs) return reject("File system not initialized");
      const fullPath = `${folderPath}/${name}`;

      // First check if it's a directory or file
      fs.stat(fullPath, (err, stats) => {
        if (err) {
          console.error("Error checking path:", err);
          return reject(err);
        }

        if (stats?.isDirectory()) {
          // If it's a directory, use rmdir
          fs.rmdir(fullPath, (err) => {
            if (err) {
              console.error("Error deleting directory:", err);
              return reject(err);
            }
            refreshFileList(folderPath);
            resolve();
          });
        } else {
          // If it's a file, use unlink
          fs.unlink(fullPath, (err) => {
            if (err) {
              console.error("Error deleting file:", err);
              return reject(err);
            }
            refreshFileList(folderPath);
            resolve();
          });
        }
      });
    });
  }, [fs]);

  const getFileUrl = useCallback(async (filePath: string): Promise<string> => {
    const buffer = await readFile(filePath!);
    const blob = new Blob([buffer!], { type: imageMimeTypes[filePath.split('.').pop()!] });
    const url = URL.createObjectURL(blob);
    return url;
  }, [readFile])

  

  const listFiles = useCallback((folderPath: string = '/'): Promise<WindowType[] | null> => {
    return new Promise((resolve) => {
      if (!fs) return resolve(null);
      fs.readdir(folderPath, (err, files) => {
        if (err) {
          console.error("Error listing files:", err);
          return resolve([]);
        }

        // Use the ref to get the latest fileList
        const existingFiles = fileListRef.current || [];

        const fileItems = files?.map(async (name) => {
          const fullPath = `${folderPath !== '/' ? folderPath : ''}/${name}`;

          // Check if file already exists in current fileList
          const existingFile = existingFiles.find(
            existing => existing.app === name && existing.folderPath === folderPath
          );

          if (existingFile) {
            return existingFile;
          }

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const stats: any = await new Promise((resolve, reject) => {
            fs.stat(fullPath, (err, stats) => {
              if (err) reject(err);
              else resolve(stats);
            });
          });

          const baseFile: WindowType = { 
            app: name, 
            props: {filePath: fullPath}, 
            folderPath: folderPath, 
            appType: "file", 
            icon: 'non_executable.svg'
          };

          // If it's a directory, use folder icon
          if (stats.isDirectory()) {
            return {
              ...baseFile,
              appType: "file" as const,
              icon: 'folder.svg',
            };
          }


          // Handle different file types
          const extension = name.split('.').pop()?.toLowerCase();
          
          // Images
          if (extension && extension in imageMimeTypes) {
            const buffer = await readFile(fullPath);
            if (buffer) {
              const thumbnailUrl = await getFileUrl(fullPath);
              return { 
                ...baseFile,
                conteudo: Photo,
                icon: thumbnailUrl 
              };
            }
          }

          // Videos
          if (extension && extension in videoMimeTypes) {
            const buffer = await readFile(fullPath);
            if (buffer) {
              const videoUrl = await getFileUrl(fullPath);
              try {
                const thumbnailUrl = extension === 'mkv' ? 'video_icon.svg' : await generateVideoThumbnail(videoUrl);
                return { 
                  ...baseFile,
                  conteudo: Video,
                  icon: thumbnailUrl 
                };
              } catch (error) {
                return {
                  ...baseFile,
                  conteudo: Video,
                  icon: 'video_icon.svg'
                };
              }
            }
          }

          // PDFs
          if (extension === 'pdf') {
            return {
              ...baseFile,
              conteudo: Pdf,
              icon: 'pdf_icon.svg'
            };
          }

          // Code and text files
          if (extension && extension in fileIcons) {
            return {
              ...baseFile,
              conteudo: Monaco,
              icon: fileIcons[extension]
            };
          }

          // Default for unsupported types
          return baseFile;
        });
        
        Promise.all(fileItems || []).then(resolve);
      });
    });
  }, [fs, readFile, getFileUrl]);



  const renamePath = useCallback(async (folderPath: string = '/', oldName: string, newName: string): Promise<void> => {
    if (!fs) return;
    await new Promise<void>((resolve, reject) => {
      fs.exists(`${folderPath}${folderPath === '/' ? '' : "/"}${newName}`, (exists) => {
        if (exists) {
          reject(new Error('A file or folder with this name already exists'));
        }
        resolve();
      });
    });
    const oldPath = `${folderPath}${folderPath === '/' ? '' : "/"}${oldName}`;
    const newPath = `${folderPath}${folderPath === '/' ? '' : "/"}${newName}`;
    if(oldPath === newPath) {
      console.warn("Rename path is equal to original.")
      return
    }
    await new Promise<void>((resolve, reject) => {
      fs.rename(oldPath, newPath, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }, [fs]);

  const refreshFileList = useCallback(async (folderPath: string = '/') => {
    if (!fs) return;
    const files = await listFiles(folderPath);
    setFileList(() => files || []);
  }, [fs, listFiles]);

  const initializeBrowserFS = useCallback(() => {
    if(fs) return;
    BrowserFS.configure(
      {
        fs: "IndexedDB",
        options: {},
      },
      (err) => {
        if (err) {
          console.error("Failed to reinitialize BrowserFS:", err);
          return;
        }
        setFs(BrowserFS.BFSRequire("fs"));
        refreshFileList(); // Refresh the file list after reinitialization
      }
    );    
  }, [fs, setFs, refreshFileList]);

  useEffect(() => {
    initializeBrowserFS();
  }, [initializeBrowserFS]);

  useEffect(() => {
    refreshFileList();
  }, [fs, refreshFileList]);

  const handleDrop = useCallback(
    async (folderPath: string, event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (event.dataTransfer.items) {
        for (let i = 0; i < event.dataTransfer.items.length; i++) {
          const item = event.dataTransfer.items[i];
          if (item.kind === 'file') {
            const file = item.getAsFile();
            if (file) {
              await createFile(folderPath, file);
            }
          }
        }
        await refreshFileList(folderPath);
      }
    },
    [createFile, refreshFileList]
  );

  const format = useCallback(async () => {
    if (!fs) return;

    const deleteRecursive = async (path: string) => {
      const files = await new Promise<string[]>((resolve, reject) => {
        fs.readdir(path, (err, files) => {
          if (err) reject(err);
          else resolve(files || []);
        });
      });

      for (const file of files) {
        const fullPath = `${path}/${file}`;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const stats: any = await new Promise((resolve, reject) => {
          fs.stat(fullPath, (err, stats) => {
            if (err) reject(err);
            else resolve(stats);
          });
        });

        if (stats.isDirectory()) {
          await deleteRecursive(fullPath);
          await new Promise<void>((resolve, reject) => {
            fs.rmdir(fullPath, (err) => {
              if (err) reject(err);
              else resolve();
            });
          });
        } else {
          await new Promise<void>((resolve, reject) => {
            fs.unlink(fullPath, (err) => {
              if (err) reject(err);
              else resolve();
            });
          });
        }
      }
    };

    try {
      await deleteRecursive('/');
      await refreshFileList('/');
    } catch (error) {
      console.error('Error formatting file system:', error);
    }
  }, [fs, refreshFileList]);


  
  


  return (
    <FileSystemContext.Provider value={{ 
      fileList, 
      getFileUrl, 
      handleDrop, 
      refreshFileList, 
      createFile, 
      readFile, 
      updateFile, 
      deletePath, 
      createFolder, 
      listFiles, 
      renamePath,
      format
    }}>
      {children}
    </FileSystemContext.Provider>
  );
};

export const useFileSystem = (): FileSystemContextType => {
  const context = useContext(FileSystemContext);
  if (context === undefined) {
    throw new Error('useFileSystem must be used within a FileSystemProvider');
  }
  return context;
};
