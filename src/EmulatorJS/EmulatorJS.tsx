import React, { useEffect, useRef, useState } from "react";
import styles from "./EmulatorJS.module.scss";

export default function EmulatorJS() {
  const [gameUrl, setGameUrl] = useState<string>("");
  const dropZoneRef = useRef<HTMLDivElement | null>(null);
  const dbRef = useRef<IDBDatabase | null>(null);
  const [fileList, setFileList] = useState<File[]>([]);

  useEffect(() => {
    const openDB = async () => {
      const dbRequest = indexedDB.open("ROMsDatabase", 1);

      dbRequest.onsuccess = function (event) {
        const db = (event.target as IDBOpenDBRequest).result as IDBDatabase;
        dbRef.current = db;

        db.transaction("roms", "readwrite").oncomplete = function () {
          console.log("Database upgrade completed");
        };

        // Retrieve the first ROM from the database if it exists
        const transaction = db.transaction("roms", "readonly");
        const romsStore = transaction.objectStore("roms");
        const request = romsStore.openCursor();
        const romList: File[] = [];
        request.onsuccess = function (event) {
          const cursor = (event.target as IDBRequest<IDBCursorWithValue>)
            .result;
          if (cursor) {
            const rom = cursor.value;
            romList.push(rom.romFile); // Assuming the file name is stored in 'fileName' property
            cursor.continue();
            console.log(romList);
          } else {
            console.log("List of files:", fileList);
            setFileList(romList);
          }
        };
      };

      dbRequest.onerror = function (event) {
        console.error(
          "Error opening database:",
          (event.target as IDBOpenDBRequest).error
        );
      };

      dbRequest.onupgradeneeded = function (event) {
        const db = (event.target as IDBOpenDBRequest).result as IDBDatabase;
        if (!db.objectStoreNames.contains("roms")) {
          db.createObjectStore("roms", { keyPath: "id", autoIncrement: true });
        }
      };
    };

    openDB();

    return () => {
      if (dbRef.current) {
        dbRef.current.close();
      }
    };
  }, []);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dropZoneRef.current?.classList.add(styles.dragOver);
  };

  const handleDragLeave = () => {
    dropZoneRef.current?.classList.remove(styles.dragOver);
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.name.endsWith(".gba")) {
      // Save file to IndexedDB
      const db = dbRef.current;
      if (db) {
        const transaction = db.transaction("roms", "readwrite");
        const romsStore = transaction.objectStore("roms");
        const rom = { romFile: file };
        const request = romsStore.add(rom);
        request.onsuccess = function () {
          console.log("ROM file added to IndexedDB");
        };
        request.onerror = function () {
          console.error("Error adding ROM file to IndexedDB");
        };
      }
      setGame(file)
    //   const url = URL.createObjectURL(file);
    //   setGameUrl(url);
    }
  };

  const setGame = (game: File) => {
    const url = URL.createObjectURL(game);
    setGameUrl(url);
  }

  return (
    <div className={`${styles.emulator_wrapper} ${!gameUrl && styles.emulator_grid}`}>
      <div
        ref={dropZoneRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        className={`${styles.emulator} ${!gameUrl && styles.dropArea}`}
      >
        {gameUrl ? (
          <iframe
            title="Emulator"
            srcDoc={`
                            <!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>EmulatorJS</title>
                                <style>
                                body, html {
                                    margin: 0;
                                    padding: 0;
                                    height: 100%;
                                    overflow: hidden;
                                }
                                #game {
                                    width: 100%;
                                    height: 100%;
                                }
                            </style>
                                <script>
                                    // EmulatorJS initialization code
                                    window.EJS_player = '#game';
                                    window.EJS_core = 'gba';
                                    window.EJS_color = '#0064ff';
                                    window.EJS_startOnLoaded = true;
                                    window.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
                                    window.EJS_gameUrl = "${gameUrl}";
                                </script>
                                <script src="https://cdn.emulatorjs.org/stable/data/loader.js" async></script>
                            </head>
                            <body>
                                <div id="game"></div>
                            </body>
                            </html>
                        `}
            className={styles.game}
          ></iframe>
        ) : (
          <p>drag and drop gae herew</p>
        )}
      </div>
      {!gameUrl && (
          <fieldset>
            <legend>Your games list ({fileList.length})</legend>
            <ul className={styles.games_list}>
              {fileList.map((file, i) => (
                <li key={i} className={styles.game} onClick={() => setGame(file)}>
                  {file.name}
                </li>
              ))}
            </ul>
          </fieldset>
      )}
    </div>
  );
}
