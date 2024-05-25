import React, { useEffect, useRef, useState } from "react";
import styles from "./EmulatorJS.module.scss";

export default function EmulatorJS() {
  const [gameUrl, setGameUrl] = useState<string>("");
  const [stateUrl, setStateUrl] = useState<string | null>(null);
  const dropZoneRef = useRef<HTMLDivElement | null>(null);
  const dbRef = useRef<IDBDatabase | null>(null);
  const [fileList, setFileList] = useState<File[]>([]);
  const [currentGame, setCurrentGame] = useState<File | null>(null);

  useEffect(() => {
    const openDB = async () => {
      const dbRequest = indexedDB.open("ROMsDatabase", 2);

      dbRequest.onupgradeneeded = function (event) {
        console.log("needed")
        const db = (event.target as IDBOpenDBRequest).result as IDBDatabase;
        if (!db.objectStoreNames.contains("roms")) {
          db.createObjectStore("roms", { keyPath: "id", autoIncrement: true });
        }
        if (!db.objectStoreNames.contains("saveStates")) {
          db.createObjectStore("saveStates", { keyPath: "gameName" });
        }
      };

      dbRequest.onsuccess = function (event) {
        const db = (event.target as IDBOpenDBRequest).result as IDBDatabase;
        dbRef.current = db;

        // Retrieve ROMs
        const transaction = db.transaction("roms", "readonly");
        const romsStore = transaction.objectStore("roms");
        const request = romsStore.getAll();
        request.onsuccess = function () {
          const romList: File[] = request.result.map((rom) => rom.romFile);
          setFileList(romList);
        };
      };

      dbRequest.onerror = function (event) {
        console.error("Error opening database:", (event.target as IDBOpenDBRequest).error);
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
      setGame(file);
      setCurrentGame(file);
      loadSavedState(file.name);
    }
  };

  const setGame = (game: File) => {
    const url = URL.createObjectURL(game);
    setGameUrl(url);
  };

  const loadSavedState = async (gameName: string) => {
    if (dbRef.current) {
      const transaction = dbRef.current.transaction("saveStates", "readonly");
      const store = transaction.objectStore("saveStates");
      const request = store.get(gameName);
      request.onsuccess = function () {
        const result = request.result;
        if (result) {
          const blob = new Blob([result.saveData], { type: "application/octet-stream" });
          const stateUrl = URL.createObjectURL(blob);
          setStateUrl(stateUrl);
        }
      };
      request.onerror = function () {
        console.error("Error retrieving saved state from IndexedDB");
      };
    }
  };

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.data.type === "SAVE_STATE_DATA") {
        const saveData = event.data.state;
        console.log('message')
        console.log(saveData);
        const gameName = currentGame?.name;
        if (dbRef.current && gameName) {
          const transaction = dbRef.current.transaction("saveStates", "readwrite");
          const store = transaction.objectStore("saveStates");
          await store.put({ gameName, saveData });
          console.log("Game state saved");
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [currentGame]);

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
                                    window.EJS_player = '#game';
                                    window.EJS_core = 'gba';
                                    window.EJS_color = '#0064ff';
                                    window.EJS_startOnLoaded = true;
                                    window.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
                                    window.EJS_gameUrl = "${gameUrl}";
                                    ${stateUrl ? `window.EJS_loadStateURL = "${stateUrl}";` : ''}
            
                                    window.EJS_onSaveState = ({ screenshot, state }) => {
                                        window.parent.postMessage({ type: "SAVE_STATE_DATA", state }, "*");
                                    }

                                    window.addEventListener("message", (event) => {
                                        if (event.data.type === "SAVE_STATE") {
                                            const saveState = EJS_saveState();
                                            window.parent.postMessage({ type: "SAVE_STATE_DATA", state: saveState }, "*");
                                        }
                                    });

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
          <p>Drag and drop game here</p>
        )}
      </div>
      {!gameUrl && (
        <fieldset>
          <legend>Your game list ({fileList.length})</legend>
          <ul className={styles.games_list}>
            {fileList.map((file, i) => (
              <li key={i} className={styles.game} onClick={() => {
                setGame(file);
                setCurrentGame(file);
                loadSavedState(file.name);
              }}>
                {file.name}
              </li>
            ))}
          </ul>
        </fieldset>
      )}
      {/* {gameUrl && (
        <div>
          <button onClick={saveGameState}>Save Game</button>
        </div>
      )} */}
    </div>
  );
}
