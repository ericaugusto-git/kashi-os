import { FitAddon } from "@xterm/addon-fit";
import { Terminal } from "@xterm/xterm";
import LocalEchoController from "local-echo";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { WindowType } from "../../../constants/window";
import { windowsTemplates } from "../../../constants/windowsTemplate";
import useCloseWindow from "../../../hooks/useCloseWindow";
import useOpenWindow from "../../../hooks/useOpenWindow";
import style from "./Cmd.module.scss";
import { asciiArt } from "../../../constants/asciiArt";
import { accentColorAnsi, terminal_config } from "./terminal_config";
import { useTheme } from "../../../contexts/ThemeContext";
type CmdApp = {original: string | null | undefined, executable: string | null | undefined}
import * as rdd from "react-device-detect";
import { useFileSystem } from "../../../contexts/FileSystemContext";
//Starts up xtermjs
function Cmd() {
  const terminalRef = useRef(null);
  const containerRef = useRef(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [localEcho, setLocalEcho] = useState<any>();
  const [terminal, setTerminal] = useState<Terminal>();
  const closeWindow = useCloseWindow();
  const openWindow = useOpenWindow();
  const {t, i18n } = useTranslation();
  const [apps, setApps] = useState<CmdApp[]>([]);
  const [theme] = useTheme();
  const [currentDirectory, setCurrentDirectory] = useState<string>("/home/desktop");
  const fileSystem = useFileSystem();

  useEffect(() => {
    const terminal = new Terminal();
    const fitAddon = new FitAddon();
    const mountTerminal = () => {
    terminal.loadAddon(fitAddon)
    terminal.open(terminalRef.current!);
    fitAddon.fit();
    terminal.focus();
    const localEcho = new LocalEchoController();
    terminal.loadAddon(localEcho);
    setLocalEcho(localEcho);
    terminal.options = terminal_config;
    setTerminal(terminal);
  }
  if(terminalRef.current){
    mountTerminal();
  }
    const resizeObserver = new ResizeObserver(() => {
      fitAddon.fit();
    });
    resizeObserver.observe(terminalRef.current!);
    return () => {
      resizeObserver.disconnect();
      terminal.dispose();
    };
  }, []);

  useEffect(() => {
    const initialApps = JSON.parse(JSON.stringify(windowsTemplates)).filter((a: WindowType)=> a.app != 'command_line').reduce((acc: CmdApp[] , current: WindowType) => {acc.push({original: current.app, executable: t(current.app)?.toLocaleLowerCase().replaceAll(' ', '_').split('.')[0].normalize('NFD').replace(/[\u0300-\u036f]/g, "")}); return acc},[])
    setApps(initialApps);
  }, [t, i18n]);

  useEffect(() => {
    if(localEcho && terminal){
    const getUserInfo = () => {
      const today = new Date();
      const [day, month, year] = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
      const device = `${rdd.osName} ${rdd.osVersion} • ${rdd.browserName}`;
      const uptime = Math.floor((Date.now() - performance.timing.navigationStart) / 1000);
      const uptimeStr = `${Math.floor(uptime/3600)}h ${Math.floor((uptime%3600)/60)}m ${uptime%60}s`;
      
      const deviceInfo = [
        {conteudo: `${accentColorAnsi}user\x1b[0m@${accentColorAnsi}kashi.os\x1b[0m`},
        {conteudo: '---------------------'},
        {label: 'os1', conteudo: 'kashi-os v2.0.0'},
        {label: 'host', conteudo: device},
        {label: 'kernel', conteudo: `${rdd.engineName} ${rdd.engineVersion}`},
        {label: 'uptime', conteudo: uptimeStr},
        {label: 'resolution', conteudo: `${window.screen.width}x${window.screen.height}`},
        {label: 'memory', conteudo: `${Math.round(performance.memory?.usedJSHeapSize / 1048576)}MB / ${Math.round(performance.memory?.jsHeapSizeLimit / 1048576)}MB`},
        {label: 'cpu_cores', conteudo: navigator.hardwareConcurrency},
        {label: 'terminal', conteudo: 'xtermjs'},
        {label: 'terminal_font', conteudo: terminal_config.fontFamily},
        {label: 'theme', conteudo: theme},
        {label: 'locale', conteudo: i18n.resolvedLanguage},
        {label: 'date', conteudo: `${year}年${month}月${day}日`},
        {label: 'timezone', conteudo: Intl.DateTimeFormat().resolvedOptions().timeZone},
      ];
      deviceInfo.map((a) => 
        a.label = a.label ? `${accentColorAnsi}${t(a.label)}: \x1b[0m` : ''
    );
          return deviceInfo;
  }
  
  const echo = async () => {
      localEcho
        .read(`${currentDirectory}$ `)
        .then(async (input: string) => {
          const [command, ...args] = input.trim().split(" ");
          
          switch (command) {
            case "clear":
              localEcho.clear();
              break;
            case "help": {
              const commands = [
                "System Commands:",
                "  neofetch - Display system information",
                "  clear    - Clear the terminal",
                "  exit     - Exit the terminal",
                "  weather  - Show weather information",
                "",
                "File Operations:",
                "  ls       - List directory contents",
                "  pwd      - Print working directory",
                "  cd       - Change directory",
                "  mkdir    - Create new directory",
                "  cat      - View file contents",
                "  rm       - Remove files",
                "  mv       - Move/rename files",
                ""
              ];
              
              commands.forEach(cmd => localEcho.println(cmd));
              break;
            }
            case "exit":
              closeWindow("command_line");
              break;
            case 'weather': 
            case 'wttr':
            {
              const weatherResponse = await fetch(`https://wttr.in/?1nAF&lang=${i18n.resolvedLanguage?.toLowerCase()}`);
              const weatherText = await weatherResponse.text();
              localEcho.println(weatherText);
              break;
            }
            case "neofetch": {
              const fetchInfo = getUserInfo();
              
              asciiArt.forEach((line, lineIndex) => {
                const { label, conteudo } = fetchInfo?.[lineIndex] ?? '';
                localEcho.println(`${accentColorAnsi}${line}\x1b[0m ${conteudo ? label! + conteudo : ''}`);
              });
              break;
            }
            case "ls": {
              const files = await fileSystem.listFiles(currentDirectory);
              if (files) {
                localEcho.println(files.map(f => f.app).join("  "));
              }
              break;
            }
            case "pwd": {
              localEcho.println(currentDirectory);
              break;
            }
            case "cd": {
              const newPath = args[0] || "/home/desktop";
              const absolutePath = newPath.startsWith("/") 
                ? newPath 
                : `${currentDirectory}/${newPath}`;
              
              // if (newPath === "..") {
              //   const parentDir = currentDirectory.split("/").slice(0, -1).join("/") || "/";
              //   setCurrentDirectory(parentDir);
              // } else {
                const exists = await fileSystem.pathExists(absolutePath);
                if (exists) {
                  setCurrentDirectory(absolutePath);
                } else {
                  localEcho.println(`cd: no such directory: ${newPath}`);
                  echo();
                }
              // }
              return;
            }
            case "mkdir": {
              if (!args[0]) {
                localEcho.println("mkdir: missing operand");
                break;
              }
              try {
                await fileSystem.createFolder(currentDirectory, args[0]);
                localEcho.println(`Created directory ${args[0]}`);
              } catch (error) {
                localEcho.println(`mkdir: cannot create directory '${args[0]}': Directory exists`);
              }
              break;
            }
            case "cat": {
              if (!args[0]) {
                localEcho.println("cat: missing operand");
                break;
              }
              const filePath = `${currentDirectory}/${args[0]}`;
              const content = await fileSystem.readFile(filePath);
              if (content) {
                localEcho.println(content.toString());
              } else {
                localEcho.println(`cat: ${args[0]}: No such file`);
              }
              break;
            }
            case "rm": {
              if (!args[0]) {
                localEcho.println("rm: missing operand");
                break;
              }
              try {
                await fileSystem.deletePath(currentDirectory, args[0]);
                localEcho.println(`Removed ${args[0]}`);
              } catch (error) {
                localEcho.println(`rm: cannot remove '${args[0]}': No such file`);
              }
              break;
            }
            case "mv": {
              if (!args[0] || !args[1]) {
                localEcho.println("mv: missing operand");
                break;
              }
              try {
                await fileSystem.renamePath(currentDirectory, args[0], args[1]);
                localEcho.println(`Renamed ${args[0]} to ${args[1]}`);
              } catch (error) {
                localEcho.println(`mv: cannot move '${args[0]}': No such file`);
              }
              break;
            }
            default: {
              const app = windowsTemplates.find(a => a.app == apps.find(a => a.executable == input)?.original);
              if (app) {
                openWindow(app);
              } else {
                localEcho.printWide([`command not found: ${input}. Try 'help' to get started.`]);
              }
            }
          }
            echo();
          
        }).catch((error: string) => {terminal.writeln(`oopsy daisy! Error reading: ${error}`); echo()});
  };
    echo();

}
  }, [terminal, localEcho, theme, apps, currentDirectory])


  return (
    <div className={style.cmd_container} ref={containerRef}>
      <div ref={terminalRef} className={style.terminal} />
    </div>
  );
}

export default Cmd;
