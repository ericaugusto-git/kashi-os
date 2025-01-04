import { AppType, EMULATOR, FILE_EXPLORER } from '@/constants/apps';
import { defaultFolders, deletableDefaultFolders } from '@/constants/defaultFolders';
import { emulatorExtensions } from '@/constants/emulatorCores';
import { fileIcons, folderIcons } from '@/constants/fileIcons';
import { audioMimeTypes, imageMimeTypes, videoMimeTypes } from '@/constants/mimeTypes';
import { themes } from '@/constants/themes';
import { generateVideoThumbnail } from '@/utils/thumbnailGenerator';
import { fetchReadme } from '@/utils/utils';
import * as BrowserFS from 'browserfs';
import { FSModule } from 'browserfs/dist/node/core/FS';
import { Buffer } from 'buffer';
import { Stats } from 'fs';
import * as musicMetadata from 'music-metadata-browser';
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react';
import JSZip from 'jszip';

export type FileAsUrl = {url: string, name: string};

export interface FileSystemContextType {
  fs: FSModule | null,
  fileList: {[folderPath: string]: AppType[]} | null,
  handleDrop: (folderPath: string, event: React.DragEvent<HTMLDivElement>, acceptType?: string[]) => Promise<void>;
  refreshFileList: (folderPath: string) => Promise<void>;
  createFile: (path: string,contentOrFile: string | File,fileSystem?: FSModule | null, dontRefresh?: boolean) => Promise<void>;
  createFileFromUrl: (folderPath: string, fileUrl: string, returnUrl?: boolean) => Promise<string | undefined>;
  readFile: (filePath: string) => Promise<Buffer | null>;
  readDirectory: (folderpath: string) => Promise<string[]>;
  readFilesFromDir: (folderPath: string, getAsUrl?: boolean, filterExtension?: string[]) => Promise<File[] | FileAsUrl[] | null>;
  getFileUrl: (filePath: string, mimeType?: string) => Promise<string | undefined>;
  updateFile: (filePath:string, newContent: string) => Promise<void>;
  deletePath: (folderPath: string, fileName: string) => Promise<void>;
  createFolder: (folderPath: string, folderName: string) => Promise<void>;
  listFiles: (folderPath: string) => Promise<AppType[] | null>;
  renamePath: (oldPath: string, newPath: string) => Promise<void>;
  format: () => void;
  deleteRecursive: (folderPath: string) => Promise<void>;
  pathExists: (path: string) => Promise<boolean>;
  getStats: (path: string) => Promise<Stats | null>;
  getTotalSize: (path: string) => Promise<number>;
  downloadFile: (filePath: string) => Promise<void> | undefined;
  downloadFolderAsZip: (folderPath: string) => Promise<void>;
  downloadPath: (path: string) => Promise<void>;
}

const FileSystemContext = createContext<FileSystemContextType | undefined>(undefined);

export const FileSystemProvider = ({ children }: { children: ReactNode }) => {
  const [fs, setFs] = useState<FSModule | null>(null);
  const [fileList, setFileList] = useState<{[folderPath: string]: AppType[]} | null>(null);
  const fileListRef = useRef<{[folderPath: string]: AppType[]} | null>(null);




  useEffect(() => {
    fileListRef.current = fileList;
  }, [fileList]);

  

  const createFile = useCallback(
    async (
      path: string = '/',
      contentOrFile: string | File,
      fileSystem?: FSModule | null,
      dontRefresh?: boolean
    ) => {
      fileSystem = fileSystem || fs;
      if (!fileSystem) return;
  
      const isFile = contentOrFile instanceof File;
      const fullPath = isFile
        ? `${path}/${(contentOrFile as File).name}`
        : path;
  
      try {
        return new Promise<void>((resolve, reject) => {
          if (isFile) {
            const reader = new FileReader();
            reader.onload = () => {
              fileSystem.writeFile(fullPath, Buffer.from(reader.result as ArrayBuffer), (err) => {
                if (err) {
                  console.error('Error creating file:', err);
                  reject(err);
                } else {
                  if (!dontRefresh) refreshFileList(path);
                  resolve();
                }
              });
            };
            reader.readAsArrayBuffer(contentOrFile as File);
          } else {
            fileSystem.writeFile(fullPath, contentOrFile as string, (err) => {
              if (err) {
                console.error('Error creating file:', err);
                reject(err);
              } else {
                if (!dontRefresh) refreshFileList(fullPath.split('/').slice(0, -1).join('/'));
                resolve();
              }
            });
          }
        });
      } catch (error) {
        console.error('Error processing file:', error);
        throw error;
      }
    },
    [fs]
  );
  



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
      fs.stat(fullPath, async (err, stats) => {
        if (err) {
          console.error("Error checking path:", err);
          return reject(err);
        }

        if (stats?.isDirectory()) {
          await deleteRecursive(fullPath);
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

  const  getFileMimeType = useCallback((filePath: string) => {
    const extension = filePath.split('.').pop()?.toLowerCase() || '';
    return (extension in audioMimeTypes ? audioMimeTypes[extension!] : extension in videoMimeTypes ? videoMimeTypes[extension!] : extension in imageMimeTypes ? imageMimeTypes[extension!] : undefined)
  }, []);

  const getFileUrl = useCallback(async (filePath: string, mimeType?: string): Promise<string | undefined> => {
    if (!fs) return;
    const buffer = await readFile(filePath!);
    if (!buffer) return;
    const blob = new Blob([buffer!], { type: mimeType ?? getFileMimeType(filePath)});
    const url = URL.createObjectURL(blob);
    return url;
  }, [readFile]);

  const readDirectory = useCallback(async (folderPath: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      if (!fs) return reject("File system not initialized");
      fs.readdir(folderPath, (err, files) => {
        if (err) {
          console.error("Error reading directory:", err);
          return reject(err);
        }
        resolve(files ?? []);
      });
    });
  }, [fs]);

  /**
   * Reads the contents of a directory and returns an array of files or URLs.
   * 
   * @param folderPath The path to the directory to read.
   * @param getAsUrl Optional. If true, returns an array of URLs instead of file objects.
   * 
   * @returns A promise that resolves to an array of file objects or file URLs of the directory.
   */
  const readFilesFromDir = useCallback(async (folderPath: string, getAsUrl?: boolean, filterExtension?: string[]): Promise<File[] | FileAsUrl[] | null>=> {
    return new Promise((resolve, reject) => {
      if (!fs) return resolve(null);
      fs.readdir(folderPath, async (err, files) => {
        if (err) {
          console.error("Error listing files:", err);
          return reject(err)
        }
        files = files ?? [];
        const realFiles: File[] = [];
        const fileUrls: FileAsUrl[] = [];
        for(const file of files){
          const fileExtension = file.split('.').pop()?.toLowerCase();
          if(filterExtension && fileExtension && !filterExtension.includes(fileExtension)){
            continue;
          }
          const buffer = await readFile(`${folderPath}/${file}`);
          if (buffer) {
            if(getAsUrl){
              const blob = new Blob([buffer!], { type: getFileMimeType(file)});
              const url = URL.createObjectURL(blob);
              fileUrls.push({url, name: file});
            }else{
              // application/octet-stream
              const fileObject = new File([buffer], file, { type: getFileMimeType(file)}); // Adjust MIME type as needed
              realFiles.push(fileObject);
            }
          }
        }
        resolve(getAsUrl ? fileUrls : realFiles);
      });
    });
  }, [fs]);

  const createFileFromUrl = useCallback((folderPath: string, fileUrl: string, returnUrl?: boolean): Promise<string | undefined> => {
    return new Promise<string | undefined>((resolve, reject) => {
      if (!fs) return reject("File system not initialized");
      fetch(fileUrl, {cache: "no-store"})
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.blob();
        })
        .then(blob => {
          // Decode the URL in case it contains encoded characters
          const decodedUrl = decodeURIComponent(fileUrl);
          // Extract the file name using split
          const fileName = decodedUrl.split('/').pop();
          // Create a File object from the Blob
          const file = new File([blob], fileName!, {
            type: blob.type,
          });
          createFile(folderPath, file).then(() => {
            resolve(returnUrl ? URL.createObjectURL(blob): file.name);
          });
        })
        .catch(e => {
          reject(e);
        });
    });
  }, [fs]);

  const getStats = useCallback((path: string): Promise<Stats | null> => {
    return new Promise((resolve) => {
      if (!fs) return resolve(null);
      fs.stat(path, (err, stats) => {
        if (err) return resolve(null);
        // Double type assertion to safely convert between incompatible Stats types
        resolve(stats as unknown as Stats);
      });
    });
  }, [fs]);

  const listFiles = useCallback((folderPath: string = '/'): Promise<AppType[] | null> => {
    return new Promise((resolve, reject) => {
      if (!fs) return resolve(null);
      fs.readdir(folderPath, (err, files) => {
        if (err) {
          console.error("Error listing files:", err);
          return reject(err)
        }

        // Use the ref to get the latest fileList
        const existingFiles = fileListRef.current?.[folderPath] || [];

        const fileItems = files?.map(async (name) => {
          const fullPath = `${folderPath !== '/' ? folderPath : ''}/${name}`;

          // Check if file already exists in current fileList
          const existingFile = existingFiles.find(
            existing => existing.name === name && existing.folderPath === folderPath
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
          const baseFile: AppType = { 
            name: name,
            titleBarName: name,
            props: {filePath: fullPath}, 
            folderPath: folderPath, 
            appType: "file", 
            icon: 'non_executable.svg'
          };
          // If it's a directory, use folder icon
          if (stats.isDirectory()) {
            return {
              ...FILE_EXPLORER,
              ...baseFile,
              titleBarName: FILE_EXPLORER.titleBarName,
              icon: folderIcons[fullPath] || 'folder.svg',
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
                componentPath: '@/Photo/Photo',
                thumbnail: thumbnailUrl,
                icon: 'photo_icon.svg' 
              };
            }
          }
          // EmulatorJS
          if (extension && emulatorExtensions.includes('.' + extension)) {
            return { 
              ...EMULATOR,
              ...baseFile,
              titleBarName: EMULATOR.name,
              icon: EMULATOR.icon
            };
          }

          // Code and text files
          if (extension && extension in fileIcons) {
            return {
              ...baseFile,
              componentPath: '@/Monaco/Monaco',
              thumbnail: fileIcons[extension],
              icon: 'code_icon.svg'
            };
          }

          // Videos
          if (extension && extension in videoMimeTypes) {
            const buffer = await readFile(fullPath);
            if (buffer) {
              const videoUrl = await getFileUrl(fullPath);
              try {
                const thumbnailUrl = extension === 'mkv' ? 'video_icon.svg' : await generateVideoThumbnail(videoUrl!);
                return { 
                  ...baseFile,
                  componentPath: '@/Video/Video',
                  thumbnail: thumbnailUrl,
                  icon: 'video_icon.svg' 
                };
              } catch (error) {
                return {
                  ...baseFile,
                  componentPath: '@/Video/Video',
                  icon: 'video_icon.svg'
                };
              }
            }
          }

          // PDFs
          if (extension === 'pdf') {
            return {
              ...baseFile,
              componentPath: '@/Pdf/Pdf',
              icon: 'pdf_icon.svg'
            };
          }


          // Audio files
          if (extension && extension in audioMimeTypes) {
            const buffer = await readFile(fullPath);
            if (buffer) {
              try {
                // Convert buffer to Uint8Array for music-metadata-browser
                const uint8Array = new Uint8Array(buffer);
                
                // Parse audio metadata using Uint8Array
                const metadata = await musicMetadata.parseBuffer(
                  uint8Array, 
                  { mimeType: audioMimeTypes[extension] }
                );

                let thumbnailUrl = 'audio_icon.svg'; // default icon

                // Check if there's album art
                if (metadata.common.picture && metadata.common.picture.length > 0) {
                  const picture = metadata.common.picture[0];
                  const blob = new Blob([picture.data], { type: picture.format });
                  thumbnailUrl = URL.createObjectURL(blob);
                }

                return {
                  ...baseFile,
                  componentPath: '@/Audio/Audio',
                  thumbnail: thumbnailUrl,
                  icon: 'audio_icon.svg',
                  metadata: {
                    title: metadata.common.title,
                    artist: metadata.common.artist,
                    album: metadata.common.album,
                    duration: metadata.format.duration
                  }
                };
              } catch (error) {
                console.error('Error parsing audio metadata:', error);
              }
            }
            
            // Fallback if metadata parsing fails
            return {
              ...baseFile,
              componentPath: '@/Audio/Audio',
              icon: 'audio_icon.svg'
            };
          }
          

          // Default for unsupported types
          return baseFile;
        });
        
        Promise.all(fileItems || []).then(resolve);
      });
    });
  }, [fs, readFile, getFileUrl]);



  const renamePath = useCallback(async (oldPath: string, newPath: string): Promise<void> => {
    if (!fs) return;
    await new Promise<void>((resolve, reject) => {
      fs.exists(newPath, (exists) => {
        if (exists) {
          reject(new Error('A file or folder with this name already exists'));
        }
        resolve();
      });
    });
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

  const refreshFileList = useCallback(async (folderPath: string = '/home/desktop') => {
    if (!fs) return;
    const files = await listFiles(folderPath);
    setFileList((prev) => ({...prev, [folderPath]: files || []}));
  }, [fs, listFiles]);

  const createFolder = useCallback(async (folderPath: string = '/', folderName: string) => {
    if (!fs) return;
    const fullPath = `${folderPath}/${folderName}`;
    await new Promise<void>((resolve, reject) => {
      fs.mkdir(fullPath, '0777', (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
    refreshFileList(folderPath);
  },[fs, refreshFileList]);

  const initializeBrowserFS = useCallback(() => {
    if(fs) return;
    BrowserFS.configure(
      {
        fs: "IndexedDB",
        options: {},
      },
      async (err) => {
        if (err) {
          console.error("Failed to reinitialize BrowserFS:", err);
          return;
        }
        const fileSystem = BrowserFS.BFSRequire("fs");
        const hasInitializedFileSystemFirstTime = localStorage.getItem('hasInitializedFileSystemFirstTime');

        for (const folder of defaultFolders) {
          try {
            if(deletableDefaultFolders.includes(folder) && hasInitializedFileSystemFirstTime === 'true') continue;
            await new Promise<void>((resolve, reject) => {
              fileSystem.exists(folder, (exists) => {
                if (!exists) {
                  fileSystem.mkdir(folder, '0777', (err) => {
                    if (err) reject(err);
                    else resolve();
                  });
                } else {
                  resolve();
                }
              });
            });
          } catch (error) {
            console.error(`Error creating folder ${folder}:`, error);
          }
        }
        // Check if README already exists then creates it if not
        const initializeReadme = async (hasInitializedFileSystemFirstTime: boolean) => {
          try {
            await new Promise<void>((resolve) => {
              fileSystem.exists('/home/desktop/README.md', async (exists) => {
                // If it hasn't been created or if it has been then it's updated
                if ((!exists && !hasInitializedFileSystemFirstTime) || (exists && hasInitializedFileSystemFirstTime)) {
                  const readme = await fetchReadme(); // Using the utility function
                  if (readme) {
                    const file = new File([readme], 'README.md');
                    await createFile('/home/desktop', file, fileSystem);
                  }
                } 
                await new Promise(resolve => setTimeout(resolve, 50));
                resolve();
              });
            });
          } catch (error) {
            console.error('Error creating README file:', error);
          }
        }

        const createConfigFile = async () => {
          // if the user deletes the config file it well recreate it with reload, if the user deletes it the whole app breaks, which is funny
          if(!await pathExists('/.config/themes.json', fileSystem)){
            const formattedJson = JSON.stringify(themes, null, 2); // Add spacing for readability
            await createFile('/.config', new File([formattedJson], 'themes.json',  {
              type: 'application/json'
            }), fileSystem);
          }
          if(!await pathExists('/.config/desktop_icons_coords.json', fileSystem)){
            await createFile('/.config', new File(['{}'], 'desktop_icons_coords.json'), fileSystem);
          }
        }
        await initializeReadme(hasInitializedFileSystemFirstTime === 'true');
        if(hasInitializedFileSystemFirstTime !== 'true') {
          localStorage.setItem('hasInitializedFileSystemFirstTime', 'true');
        }
        await createConfigFile();
        setFs(fileSystem);

      }
    );    
  }, [fs, setFs]);

  useEffect(() => {
    initializeBrowserFS();
  }, [initializeBrowserFS]);

  useEffect(() => {
    refreshFileList();
  }, [fs, refreshFileList]);




  const downloadFile = useCallback((filePath: string): Promise<void> | undefined => {
    if (!fs) return;
    return new Promise<void>((resolve, reject) => {
      getFileUrl(filePath).then(url => {
        const a = document.createElement('a');
        a.href = url!;
        a.download = filePath.split('/').pop() || 'file';
        a.click();
        URL.revokeObjectURL(url!);
        resolve();
      }).catch(reject);
    })
  }, [fs, getFileUrl]);

  const downloadFolderAsZip = useCallback(async (folderPath: string): Promise<void> => {
    if (!fs) return;
    const zip = new JSZip();
    const addFolderToZip = async (folderPath: string, zipFolder: JSZip) => {
      const files = await readDirectory(folderPath);
      for (const file of files) {
        const fullPath = `${folderPath}/${file}`;
        const stats = await getStats(fullPath);
        if (stats?.isDirectory()) {
          const newZipFolder = zipFolder.folder(file);
          await addFolderToZip(fullPath, newZipFolder!);
        } else {
          const fileData = await readFile(fullPath);
          zipFolder.file(file, fileData!);
        }
      }
    };

    

    await addFolderToZip(folderPath, zip);
    const content = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(content);
    a.download = `${folderPath.split('/').pop() || 'folder'}.zip`;
    a.click();
    URL.revokeObjectURL(a.href);
  }, [fs, readDirectory, readFile, getStats]);

  const downloadPath = useCallback(async (path: string) => {
    if (!fs) return;
    const stats = await getStats(path);
    if(stats?.isDirectory()){
      return downloadFolderAsZip(path);
    }else{
      return downloadFile(path);
    }
  }, [fs, downloadFile, downloadFolderAsZip, getStats]);


  interface FileWithPath {
    path: string;
    file: File;
  }
  
  type ProcessEntryResult = Promise<FileWithPath[] | undefined>;
  
  const handleDrop = useCallback(
    async (folderPath: string, event: React.DragEvent<HTMLDivElement>, acceptType?: string[]) => {
      event.preventDefault();
      
      const processEntry = async (
        entry: FileSystemEntry | null,
        currentPath: string
      ): ProcessEntryResult => {
        if (!entry) return undefined;
        const extension = entry.name.split('.').pop()?.toLowerCase();
        if(acceptType && !acceptType.includes(extension!)) return undefined;
        if (entry.isFile) {
          const fileEntry = entry as FileSystemFileEntry;
          return new Promise<FileWithPath[]>((resolve) => {
            fileEntry.file((file) => resolve([{
              path: currentPath,
              file
            }]));
          });
        } else if (entry.isDirectory) {
          const dirEntry = entry as FileSystemDirectoryEntry;
          const dirReader = dirEntry.createReader();
          
          // Read directory contents
          const readEntries = (): Promise<FileSystemEntry[]> => {
            return new Promise((resolve) => {
              dirReader.readEntries((entries) => {
                resolve(entries);
              });
            });
          };
  
          // Process all directory entries
          const entries = await readEntries();
          const newPath = `${currentPath}/${entry.name}`;
          
          // Create the directory first
          await createFolder(currentPath, entry.name);
          
          // Process all contents recursively
          const filePromises = entries.map(entry => 
            processEntry(entry, newPath)
          );
          
          const results = await Promise.all(filePromises);
          return results.flat().filter((item): item is FileWithPath => !!item);
        }
        
        return undefined;
      };
  
      if (event.dataTransfer.items) {
        const items = Array.from(event.dataTransfer.items);
        const entries: (FileSystemEntry | null)[] = items
          .filter((item): item is DataTransferItem => item.kind === 'file')
          .map(item => item.webkitGetAsEntry());
  
        try {
          // Process all dropped items
          const processPromises = entries.map(entry => 
            processEntry(entry, folderPath)
          );
  
          // Wait for all processing to complete
          const results = await Promise.all(processPromises);
          
          // Flatten results and filter out undefined values
          const files = results
            .flat()
            .filter((item): item is FileWithPath => !!item);
          
          // Create all files in their respective folders
          await Promise.all(
            files.map(({ path, file }) => createFile(path, file))
          );
  
          // Refresh the file list after all operations are complete
          await refreshFileList(folderPath);
        } catch (error) {
          console.error('Error processing dropped items:', error);
          throw error;
        }
      }
    },
    [createFile, createFolder, refreshFileList]
  );

  const deleteRecursive = useCallback(async (folderPath: string) => {
    if(!fs) return;
    const files = await new Promise<string[]>((resolve, reject) => {
      fs.readdir(folderPath, (err, files) => {
        if (err) reject(err);
        else resolve(files || []);
      });
    });
    for await (const file of files) {
      const fullPath = `${folderPath}${folderPath === '/' ? '' : "/"}${file}`;
 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const stats: any = await new Promise((resolve, reject) => {
        fs.stat(fullPath, (err, stats) => {
          if (err) reject(err);
          else resolve(stats);
        });
      });

      if (stats.isDirectory()) {
        await deleteRecursive(fullPath);
      // Skip default folders from deletion
      if (defaultFolders.includes(fullPath) && !deletableDefaultFolders.includes(fullPath)) {
          continue;
        }   
        await new Promise<void>((resolve, reject) => {
          fs.rmdir(fullPath, (err) => {
            if (err)  reject(err);
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
  }, [fs]);


  const format = useCallback(async () => {
    if (!fs) return;
    try {
      await deleteRecursive('/');
      await refreshFileList();
    } catch (error) {
      console.error('Error formatting file system:', error);
    }
  }, [fs, deleteRecursive, refreshFileList]);

  const pathExists = useCallback((path: string, fileSystem?: FSModule): Promise<boolean> => {
    fileSystem = fs ?? fileSystem;
    return new Promise((resolve) => {
      if (!fileSystem) return resolve(false);
      fileSystem.exists(path, (exists) => {
        resolve(exists);
      });
    });
  }, [fs]);


  
  const getTotalSize = useCallback(async (path: string): Promise<number> => {
    const files = await listFiles(path);
    if (!files) return 0;

    let totalSize = 0;
    for (const file of files) {
      const filePath = `${path}/${file.name}`.replace(/\/\//g, '/');
      const stats = await getStats(filePath);
      if (!stats) continue;
      
      if (stats.isDirectory()) {
        totalSize += await getTotalSize(filePath);
      }
      totalSize += stats.size;
    }
    return totalSize;
  }, [listFiles, getStats]);

  
  


  return (
    <FileSystemContext.Provider value={{ 
      fs,
      fileList, 
      getFileUrl, 
      handleDrop, 
      refreshFileList, 
      createFile, 
      readFile, 
      updateFile, 
      deletePath, 
      readDirectory,
      deleteRecursive,
      createFolder, 
      listFiles, 
      pathExists,
      readFilesFromDir,
      renamePath,
      format,
      createFileFromUrl,
      getStats,
      getTotalSize,
      downloadFile,
      downloadFolderAsZip,
      downloadPath
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
