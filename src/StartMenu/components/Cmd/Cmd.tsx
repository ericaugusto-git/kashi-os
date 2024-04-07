import { FitAddon } from "@xterm/addon-fit";
import { Terminal } from "@xterm/xterm";
import LocalEchoController from "local-echo";
import { useEffect, useRef } from "react";
import style from "./Cmd.module.scss";
import CmdHeader from "./CmdHeader/CmdHeader";
import useCloseWindow from "../../../hooks/useCloseWindow";
import { osApps } from "../../../constants/osApps";


function Cmd() {
  const terminalRef = useRef(null);
  const terminal = new Terminal();
  const fitAddon = new FitAddon();
  const closeWindow = useCloseWindow();
  useEffect(() => {
    // Create a new Terminal instance
    // Attach the terminal to the DOM
    terminal.loadAddon(fitAddon)
    terminal.open(terminalRef.current!);
    fitAddon.fit();
    // Create a local echo controller (xterm.js v3)]
    const localEcho = new LocalEchoController(terminal);
    // Create a local echo controller (xterm.js >=v4)
    terminal.options = {
      // fontFamily: `'Source Code Pro', 'monospace'`,
      fontFamily: "courier-new, courier, monospace",
      cursorBlink: true,
      fontWeight: 100,
    };
    console.log("called");
    // Read a single line from the user'
    const echo = () => {
      localEcho
        .read("~$ ")
        .then((input: string) => {
          if (input == "clear") {
            terminal.clear();
          } else if(input == "help"){
            localEcho.printWide([
              "jdm.exe",
              "about.exe",
              "discord_clone.exe",
              "recipe.exe",
              "finance.exe",
              "credits.exe",
              "exit"
            ]);
          } else if(input == "exit"){
            closeWindow("command line")
          }
          echo();
        })
        .catch((error: string) => terminal.writeln(`Error reading: ${error}`));
    };
    echo();

    // Run some command in the terminal
    // terminal.write();

    // Clean up function
    const resizeObserver = new ResizeObserver(() => {

      console.log("resize");
      fitAddon.fit();
      // Do what you want to do when the size of the element changes
    });
    resizeObserver.observe(terminalRef.current!);
    // if(terminalRef.current){
    // }
    return () => {
      // Dispose the terminal instance to release resources
      resizeObserver.disconnect();
      terminal.dispose();
    };
  }, []); // Run only once on component mount

  return (
    <div className={style.cmd_container}>
      {/* ASCII art container */}
      <CmdHeader/>

      {/* Xterm container */}
      <div ref={terminalRef} className={style.terminal} />
    </div>
  );
}

export default Cmd;
