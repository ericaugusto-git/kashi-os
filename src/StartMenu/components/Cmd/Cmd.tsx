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

//Starts up xtermjs
function Cmd() {
  const terminalRef = useRef(null);
  const containerRef = useRef(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [localEcho, setLocalEcho] = useState<any>();
  const [terminal, setTerminal] = useState<Terminal>();
  const [echoCalled, setEchoCalled] = useState<boolean>(false);
  const closeWindow = useCloseWindow();
  const openWindow = useOpenWindow();
  const {t, i18n } = useTranslation();
  const [apps, setApps] = useState<CmdApp[]>([]);
  const [theme] = useTheme();

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
      const deviceInfo = [
      {conteudo: `${accentColorAnsi}eric\x1b[0m@${accentColorAnsi}augusto.dev\x1b[0m`},
      {conteudo: '---------------------'},
      {label: 'os1', conteudo: 'ericaugusto-os v1.0.0'},
      {label: 'host', conteudo: device},
      {label: 'Kernel', conteudo: `${rdd.engineName} ${rdd.engineVersion}`},
      {label: 'resolution', conteudo: `${window.screen.width}x${window.screen.height}`},
      {label: 'terminal', conteudo: 'xtermjs'},
      {label: 'terminal_font', conteudo: terminal_config.fontFamily},
      {label: 'theme', conteudo: theme},
      {label: 'locale', conteudo: i18n.resolvedLanguage},
      {label: 'date', conteudo: `${year}年${month}月${day}日`}, 
      ]
      deviceInfo.map((a) => 
        a.label = a.label ? `${accentColorAnsi}${t(a.label)}: \x1b[0m` : ''
    );
          return deviceInfo;
  }
  
  const echo = async () => {
      localEcho
        .read("~$ ")
        .then(async (input: string) => {
          switch (input) {
            case "clear":
              localEcho.clear();
              break;
            case "help":
              
              ["neofetch", "weather || wttr",...apps.map(a=> a.executable), "exit"].forEach((cmd) => {
                localEcho.println(cmd)
              })
              break;
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
                localEcho.println(`${accentColorAnsi}${line}\x1b[0m ${conteudo ? label + conteudo : ''}`);
              });
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
  if(!echoCalled){
    echo();
    setEchoCalled(true)
  }
}
  }, [terminal, localEcho, theme, apps, echoCalled])


  return (
    <div className={style.cmd_container} ref={containerRef}>
      <div ref={terminalRef} className={style.terminal} />
    </div>
  );
}

export default Cmd;
