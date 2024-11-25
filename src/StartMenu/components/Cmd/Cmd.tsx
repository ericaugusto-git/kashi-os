import { FitAddon } from "@xterm/addon-fit";
import { Terminal } from "@xterm/xterm";
import LocalEchoController from "local-echo";
import { useEffect, useRef, useState } from "react";
import * as rdd from "react-device-detect";
import { useTranslation } from "react-i18next";
import { asciiArt } from "../../../constants/asciiArt";
import { FileProps, WindowType } from "../../../constants/window";
import { windowsTemplates } from "../../../constants/windowsTemplate";
import { useFileSystem } from "../../../contexts/FileSystemContext";
import { useTheme } from "../../../contexts/ThemeContext";
import useCloseWindow from "../../../hooks/useCloseWindow";
import style from "./Cmd.module.scss";
import { accentColorAnsi, terminal_config } from "./terminal_config";
import { usePcStatus } from "@/contexts/PcStatusContext";
import { useWindowContext } from "@/contexts/WindowContext";
type CmdApp = {original: string | null | undefined, executable: string | null | undefined}

function Cmd({folderPath}: FileProps) {
  const terminalRef = useRef(null);
  const containerRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [localEcho, setLocalEcho] = useState<any>();
  const [terminal, setTerminal] = useState<Terminal>();
  const [_, setPcStatus] = usePcStatus();
  const [, setWindows] = useWindowContext();
  const closeWindow = useCloseWindow();
  const {t, i18n } = useTranslation();
  const [apps, setApps] = useState<CmdApp[]>([]);
  const [theme] = useTheme();
  const [currentDirectory, setCurrentDirectory] = useState<string>(folderPath || "/home");
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
        if(input == "rm -rf ./" || input == "rm -rf /" || input == "rm -r ./" || input == "rm -r /"){
          fileSystem.format();
          localEcho.println("Deleting everything...");
          setWindows([]);
          localStorage.removeItem("hasInitializedFileSystemFirstTime");
          localStorage.removeItem("theme")
          localStorage.removeItem("app-layouts")
          setPcStatus("game_over");
          return;
        }

          const SPACE_PLACEHOLDER = '†'; 
          
          const escapedInput = input.replaceAll(/\\ /g, SPACE_PLACEHOLDER);
          
          // Regex was generated by AI, it's just so convenient...
          // it handles cd New\ Folder cd "New Folder" cd 'New Folder'
          const parts = escapedInput.match(/[^\s"']+|"([^"]*)"|'([^']*)'/g) || [];
          
          const parsedArgs = parts.map(part => {
            if (part.startsWith('"') || part.startsWith("'")) {
              return part.slice(1, -1);
            }
            return part.replace(new RegExp(SPACE_PLACEHOLDER, 'g'), ' ');
          });
          
          const [command, ...args] = parsedArgs;
          const newPath = command === 'rm' && args.find(arg => arg?.startsWith('-')) ? args[1] : args[0];
          // If paths starts with /, it's an absolute path
          let absolutePath = newPath?.startsWith("/") 
          ? newPath 
          : `${currentDirectory}/${newPath}`;
        // Deals with paths like ../../home
        if (newPath?.includes("..")) {
          const levels = newPath.split("..").length - 1;
          absolutePath = currentDirectory.split("/").slice(0, -levels).join("/") || "/";
          absolutePath += '/' + (newPath?.split('/').pop() || '');
        } 
        absolutePath = absolutePath.replaceAll('//', '/');
        const pathSplit = absolutePath.split('/');
        const fileName = pathSplit.pop() || '';
        const folderPath = pathSplit.join('/');
          
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
                "  df       - Display disk space usage",
                "",
                "File Operations:",
                "  ls       - List directory contents",
                "  pwd      - Print working directory",
                "  cd       - Change directory",
                "  mkdir    - Create new directory",
                "  cat      - View file contents",
                "  rm       - Remove files and folders [-rf -r]",
                "  mv       - Move/rename files",
                "  stat     - Show file information",
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
              if(args[0]){
                localEcho.println("ls: too many arguments");
                break;
              }
              const files = await fileSystem.listFiles(currentDirectory) || [];
              if (files) {
                localEcho.println(files.map(f => f.app).join("  "));
              }
              break;
            }
            case "whoami": {
              localEcho.println("guest");
              break;
            }
            case "stat": {
              const path = args[0] ? absolutePath : currentDirectory;  
              const stats = await fileSystem.getStats(path);
              const size = stats?.isDirectory() ? await fileSystem.getTotalSize(path) : stats?.size;
              if (!stats) {
                localEcho.println(`stat: cannot stat '${path}': No such file or directory`);
                break;
              }
              
              const formatDate = (date: Date) => {
                return date.toLocaleString(i18n.resolvedLanguage, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                });
              };

              localEcho.println(`Path: ${path}`);
              localEcho.println(`Size: ${size} bytes`);
              localEcho.println(`Type: ${stats.isDirectory() ? 'directory' : 'file'}`);
              localEcho.println(`Access: ${formatDate(stats.atime)}`);
              localEcho.println(`Modify: ${formatDate(stats.mtime)}`);
              localEcho.println(`Create: ${formatDate(stats.ctime)}`);
              break;
            }
            case "pwd": {
              if(args[0]){
                localEcho.println("pwd: too many arguments");
                break;
              }
              localEcho.println(currentDirectory);
              break;
            }
            case "cd": {
              if(args.length > 1){
                localEcho.println("cd: too many arguments");
                break;
              }else if(!args[0]){
                localEcho.println("cd: missing operand");
                break;
              }

              const exists = await fileSystem.pathExists(absolutePath);
              if (exists) {
                  setCurrentDirectory(absolutePath.replaceAll("//", "/"));
              } else {
                  localEcho.println(`cd: no such directory: ${absolutePath}`);
                  echo();
              }
              return;
            }
            case "mkdir": {
              if (!args[0]) {
                localEcho.println("mkdir: missing operand");
                break;
              }
              try {
                await fileSystem.createFolder(folderPath, fileName);
                localEcho.println(`Created directory ${fileName}`);
              } catch (error) {
                localEcho.println(`mkdir: cannot create directory '${fileName}': Directory exists`);
              }
              break;
            }
            case "cat": {
              if (!args[0]) {
                localEcho.println("cat: missing operand");
                break;
              }
             
              const content = await fileSystem.readFile(absolutePath);
              if (content) {
                localEcho.println(content.toString());
              } else {
                localEcho.println(`cat: ${args[0]}: No such file`);
              }
              break;
            }
            case "rm": {
              const option = args.find(arg => arg.startsWith('-'));

              if(args.length > 1 && !option){
                localEcho.println("rm: too many arguments.");
                localEcho.println("Tip: if your path has spaces use '\\' to escape the space, or use quotes to escape the entire path Ex: rm 'my file.txt' or rm my\\ file.txt");
                break;
              }
              if ((option && !args[1]) || (!option && !args[0])) {
                localEcho.println("rm: missing operand");
                break;
              }

              if(option && (option != '-r' && option != '-rf')){
                localEcho.println(`rm: invalid option -- '${option}'`);
                break;
              }
              try {
                if(option){
                  await fileSystem.deletePath(folderPath, fileName);
                  fileSystem.refreshFileList(folderPath);
                }else{
                  await fileSystem.deletePath(folderPath, fileName);
                }
                localEcho.println(`Removed ${absolutePath}`);
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              } catch (error: any) {
                if(error?.code == "ENOTEMPTY"){
                  localEcho.println(`rm: cannot remove '${absolutePath}': Directory not empty`);
                  localEcho.println(`Tip: use -r or -rf to remove directories that are not empty`);
                }else{
                  localEcho.println(`rm: cannot remove '${absolutePath}': No such file`);
                }
              }
              break;
            }
            case "mv": {
              if (!args[0] || !args[1]) {
                localEcho.println("mv: missing operand");
                break;
              }
              try {
                const newPath = args[1].startsWith("/") ? args[1] : `${folderPath}/${args[1]}`;
                await fileSystem.renamePath(absolutePath, newPath);
                localEcho.println(`Renamed ${fileName} to ${args[1]}`);
                fileSystem.refreshFileList(folderPath);
              } catch (error) {
                localEcho.println(`mv: cannot move '${args[0]}': No such file`);
              }
              break;
            }
            case "df": {
              if (args[0]) {
                localEcho.println("df: too many arguments");
                break;
              }
              
              const totalSize = await fileSystem.getTotalSize("/");
              const totalSpace = 1024 * 1024 * 1024; // 1GB in bytes
              const usedSpace = totalSize || 0;
              const freeSpace = totalSpace - usedSpace;
              const usePercentage = Math.round((usedSpace / totalSpace) * 100);

              localEcho.println("Filesystem      Size  Used  Avail Use% Mounted on");
              localEcho.println(`kashi-os        1.0G  ${(usedSpace / (1024 * 1024)).toFixed(1)}M  ${(freeSpace / (1024 * 1024)).toFixed(1)}M   ${usePercentage}% /`);
              break;
            }
            default: {
              localEcho.println([`command not found: ${input}. Try 'help' to get started.`]);
              break;
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
