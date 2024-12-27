import * as rdd from "react-device-detect";
import { terminal_config } from "./terminal_config";
import { TFunction } from "i18next";

export default function getUserInfo(theme: string, t: TFunction<"translation", undefined>){
    const today = new Date();
    const [day, month, year] = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
    const device = `${rdd.osName} ${rdd.osVersion} • ${rdd.browserName}`;
    const deviceInfo = [
    {conteudo: '\x1b[36;1meric\x1b[0m@\x1b[36;1maugusto.dev\x1b[0m'},
    {conteudo: '---------------------'},
    {label: 'os1', conteudo: 'ericaugusto-os v1.0.0'},
    {label: 'host', conteudo: device},
    {label: 'resolution', conteudo: `${window.screen.width}x${window.screen.height}`},
    {label: 'terminal', conteudo: 'xtermjs'},
    {label: 'terminal_font', conteudo: terminal_config.fontFamily},
    {label: 'theme', conteudo: theme},
    {label: 'date', conteudo: `${year}年${month}月${day}日`}, 
    ]
    deviceInfo.map((a) =>  a.label = a.label ? `\x1b[36;1m${t(a.label)}: \x1b[0m` : '')
    return deviceInfo;
}