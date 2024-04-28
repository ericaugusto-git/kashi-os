import Cmd from "../StartMenu/components/Cmd/Cmd";
import Paint from "../StartMenu/components/Paint/Paint";
import Playlist from "../StartMenu/components/Playlist/Playlist";
import brush from '../assets/startMenu/brush.png';
import cmd from '../assets/startMenu/cmd2.png';
import handshake from '../assets/startMenu/handshake.svg';
import playlistIcon from '../assets/startMenu/playlist.svg';
import { WindowType } from "./window";
import resume from "../assets/desktop/resume.svg";
import perfil from "../assets/desktop/avatar.png";
import discord from "../assets/desktop/disc.svg";
import finance from "../assets/desktop/finance.png";
import cookBook from "../assets/desktop/food.svg";
import jdm from "../assets/desktop/jdm.png";
import Resume from "../Resume/Resume";

export const windowsTemplates: WindowType[] = [
    {
        app: "playlist",
        icon: playlistIcon,
        mask: '#eb4034',
        conteudo: Playlist, // Specify Playlist as a component type
        bodyStyles: { paddingRight: 0 },
        headerStyles: { paddingLeft: "25px" },
        appType: 'os',
        svgMask: {startMenu: true},
        maxHeight: 415
    },
    {
        app: "command_line",
        conteudo: Cmd,
        appType: 'os',
        icon: cmd,
        
        bodyStyles: { padding: 0 },
    },
    {
        app: "paint",
        appType: 'os',
        enableResizing: false,
        conteudo: Paint,
        cantMax: true,
        icon: brush,
        height: "94.6dvh",
        width: "100%",
        x: 0,
        y: 0,
    },
    {
        icon: handshake, 
        appType: 'os',
        app: "credits"
    },
    {
        appType: 'os',
        desktop: true,
        hideInStartMenu: true,
        app: "about_me",
        desktopStyles: {img: {height: '46px', width: '46px', backgroundSize: '100%'}},
        icon: perfil,
    },
    {app: "jdm_store", appType: 'project', icon: jdm, desktopStyles: {img: {backgroundSize: '70%'}}},
    {app: "discord_clone", appType: 'project', icon: discord},
    {app: "finance", appType: 'project', icon: finance},
    {app: "recipe_book", appType: 'project', icon: cookBook},
    {app: 'resume', icon: resume, appType: 'os', desktop: true, hideInStartMenu: true, svgMask: {desktop: true}, conteudo: Resume, desktopStyles: {button: {textTransform: 'none'}}, bodyStyles: {overflow: 'auto', height: 'calc(100% - 50px)'}, },
];
