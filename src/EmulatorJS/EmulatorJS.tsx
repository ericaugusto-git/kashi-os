import React, { useEffect, useRef, useState } from "react";
import controller from "../assets/emulator/controller.svg";
import info from "../assets/emulator/info.svg";
import { emulatorCores } from "../constants/emulatorCores";
import useCloseWindow from "../hooks/useCloseWindow";
import styles from "./EmulatorJS.module.scss";
import { useTranslation } from "react-i18next";

export default function EmulatorJS({
  closeBtnRefs,
  closeRefIndex,
}: {
  closeBtnRefs?: Array<HTMLButtonElement | null>;
  closeRefIndex?: number;
}) {
  const [gameUrl, setGameUrl] = useState<string | null>("");
  const [stateUrl, setStateUrl] = useState<string | null>(null);
  const dropZoneRef = useRef<HTMLDivElement | null>(null);
  const dbRef = useRef<IDBDatabase | null>(null);
  const [fileList, setFileList] = useState<File[]>([]);
  const [currentGame, setCurrentGame] = useState<File | null>(null);
  const [currentCore, setCurrentCore] = useState<string | null>("");
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const {t, i18n} = useTranslation();
  const [locale,setLocale] = useState(i18n.resolvedLanguage == 'en' ? 'en-US' : i18n.resolvedLanguage);
  const acceptedExtensions = Object.values(emulatorCores)
    .flatMap(core => core.ext)
    .join(',');
  useEffect(() => {
    const openDB = async () => {
      const dbRequest = indexedDB.open("ROMsDatabase", 2);

      dbRequest.onupgradeneeded = function (event) {
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
        console.error(
          "Error opening database:",
          (event.target as IDBOpenDBRequest).error
        );
      };
    };

    openDB();

    return () => {
      if (dbRef.current) {
        dbRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    const closeBtnRef = closeBtnRefs?.[closeRefIndex as number];
    const handleClose = () => {
      saveBeforeLeave("close");
    };
    closeBtnRef?.addEventListener("click", handleClose);
    closeBtnRef?.addEventListener("touchend", handleClose);
    return () => {
      closeBtnRef?.removeEventListener("touchend", handleClose);
      closeBtnRef?.removeEventListener("click", handleClose);
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
    handleFileChange(null, file);
  };

  const handleFileChange = (
    event?: React.ChangeEvent<HTMLInputElement> | null,
    drop_file?: File
  ) => {
    const file = drop_file ?? event?.target.files?.[0];
    if (file) {
      const gameAlreadyExists = fileList.find((game) => game.name == file.name);
      if (gameAlreadyExists) {
        openGame(file);
        return;
      }
      const core = getCoreForFile(file);
      if (core) {
        const db = dbRef.current;
        if (db) {
          const transaction = db.transaction("roms", "readwrite");
          const romsStore = transaction.objectStore("roms");
          const rom = { romFile: file };
          setFileList((prev) => {
            const newList = [...prev, file];
            return newList;
          });
          romsStore.add(rom);
        }
        openGame(file, core);
      }
    }
  };

  const getCoreForFile = (file: File): string | null => {
    for (const system in emulatorCores) {
      const core = emulatorCores[system];
      if (core.ext.some((ext) => file.name.endsWith(ext))) {
        return core.core;
      }
    }
    return null;
  };

  const setGame = (game: File, core?: string | null) => {
    core = core ?? getCoreForFile(game);
    const url = URL.createObjectURL(game);
    setGameUrl(url);
    setCurrentCore(core);
  };

  useEffect(() => {
    saveBeforeLeave('locale_change');
  },[t])

  const openGame = (file: File, core?: string) => {
    setGame(file, core);
    setCurrentGame(file);
    loadSavedState(file.name);
  };

  const loadSavedState = async (gameName: string) => {
    if (dbRef.current) {
      const transaction = dbRef.current.transaction("saveStates", "readonly");
      const store = transaction.objectStore("saveStates");
      const request = store.get(gameName);
      request.onsuccess = function () {
        const result = request.result;
        if (result) {
          const blob = new Blob([result.saveData], {
            type: "application/octet-stream",
          });
          const stateUrl = URL.createObjectURL(blob);
          setStateUrl(stateUrl);
        }
      };
      request.onerror = function () {
        console.error("Error retrieving saved state from IndexedDB");
      };
    }
  };
  const saveBeforeLeave = (leaveMode: string) => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        { type: "REQUEST_SAVE_STATE", leaveMode: leaveMode },
        "*"
      );
    } else if (leaveMode == "close") {
      closeEmulator();
    }
  };

  const closeWindow = useCloseWindow();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const closeEmulator = () => {
    closeWindow("EmulatorJS");
  };

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.data.type === "SAVE_STATE_DATA") {
        const saveData = event.data.state;
        const gameName = currentGame?.name;
        if (dbRef.current && gameName) {
          const transaction = dbRef.current.transaction(
            "saveStates",
            "readwrite"
          );
          const store = transaction.objectStore("saveStates");
          const request = store.put({ gameName, saveData });

          // Listen for the success and error events
          request.onsuccess = () => {
            const leaveMode = event.data.leaveMode;
              if (leaveMode == "game_list") {
                exitGame();
              } else if (leaveMode == "close") {
                closeEmulator();
              } else if(leaveMode == 'locale_change'){
                exitGame();
                handleSetLocale()
              }
          };
  
          request.onerror = (error) => {
            console.error("Failed to save data:", error);
            // Handle the error as needed
          };
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [currentGame, closeEmulator]);

  const handleSetLocale = ()=> {
    setLocale(i18n.resolvedLanguage == 'en' ? 'en-US' : i18n.resolvedLanguage);
  }

  const exitGame = () => {
    setGameUrl("");
    setCurrentCore(null);
  }

  return (
    <div className={styles.container} style={gameUrl ? {padding: 0, height: '100%'} : {padding: '10px', height: 'calc(100% - 15px)'}}>
      <div className={styles.header}>
        {currentCore == 'n64' && <span style={{fontSize: '11px'}}>Save is unstable with Nintendo 64, working on it :)</span>}
        {gameUrl && (
          <div
            title="Voltar para lista de jogos"
            onClick={() => saveBeforeLeave("game_list")}
            className={`svgMask ${styles.icon} ${styles.game_icon}`}
            style={{ maskImage: `url("${controller}")` }}
          ></div>
        )}{" "}
        <div
          className={styles.tooltip}
          data-tooltip2={`${t('systems')} \n \n Atari 2600, Atari 5200, Atari 7800, Atari Jaguar, Atari Lynx, Neo Geo Pocket, Nintendo 64, Nintendo DS, Nintendo Entertainment System, Nintendo Game Boy, Nintendo Game Boy Advance, Nintendo Game Boy Color, PC Engine, Sega 32X, Sega Game Gear, Sega Genesis / Mega Drive, Sega Master System, Super Nintendo Entertainment System, Virtual Boy, WonderSwan`}
        >
          <div
            className={`svgMask ${styles.icon}`}
            style={{ maskImage: `url("${info}")` }}
          ></div>
        </div>
      </div>
      <div
        className={`${styles.emulator_wrapper} ${
          !gameUrl && styles.emulator_grid
        }`}
      >
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
              ref={iframeRef}
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
                                    window.EJS_core = '${currentCore}';
                                    window.EJS_color = '#0064ff';
                                    window.EJS_startOnLoaded = true;
                                    window.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
                                    window.EJS_gameUrl = "${gameUrl}";
                                    window.EJS_language = "${locale}"
                                    ${
                                      stateUrl
                                        ? `window.EJS_loadStateURL = "${stateUrl}";`
                                        : ""
                                    }

                                    let leaveMode = '';
                                    window.EJS_onSaveState = ({ screenshot, state }) => {
                                        window.parent.postMessage({ type: "SAVE_STATE_DATA", state, leaveMode }, "*");
                                    }

                                    window.addEventListener("message", (event) => {
                                        if (event.data.type === "REQUEST_SAVE_STATE") {
                                          leaveMode = event.data.leaveMode;
                                          //this well call EJS_onSaveState that has the state data
                                          window.EJS_emulator.elements.bottomBar.saveState[0].click();
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
            <>
              <label htmlFor="fileInput" className={styles.upload_label}>
                {t('drag')}
              </label>
              <input
                style={{ display: "none" }}
                id="fileInput"
                type="file"
                onChange={handleFileChange}
                className={styles.file_input}
                accept={acceptedExtensions}
              />
            </>
          )}
        </div>
        {!gameUrl && (
          <fieldset className={styles.games_list_wrapper}>
            <legend>
              {t('game_list')} ({fileList.length}){" "}
              <span>{t("save_notice")}</span>
            </legend>
            <ul className={styles.games_list}>
              {fileList.map((file, i) => (
                <li
                  key={i}
                  className={styles.game}
                  onClick={() => openGame(file)}
                >
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
    </div>
  );
}
