import Cmd from "../StartMenu/components/Cmd/Cmd";
import Paint from "../StartMenu/components/Paint/Paint";
import Playlist from "../StartMenu/components/Playlist/Playlist";
import brush from '../assets/startMenu/brush.png';
import cmd from '../assets/startMenu/cmd2.png';
import handshake from '../assets/startMenu/handshake.svg';
import playlistIcon from '../assets/startMenu/playlist.svg';
import { WindowType } from "./window";
import resume from "../assets/desktop/resume.svg";
import discord from "../assets/desktop/disc.svg";
import finance from "../assets/desktop/finance.png";
import cookBook from "../assets/desktop/food.svg";
import firefox from "../assets/desktop/firefox.svg";
import portfolio from "../assets/portfolio.png";
import jdm from "../assets/desktop/jdm.svg";
import Resume from "../Resume/Resume";
import Credits from "../StartMenu/components/Credits/Credits";
import fav from '/favicon.ico';
import emulatorJs from '/EmulatorJS.png';
import EmulatorJS from '../EmulatorJS/EmulatorJS'
import UnderDev from "../UnderDev/UnderDev";
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
        windowStyles: { backdropFilter: 'blur(20px)', backgroundColor: 'rgb(0 0 0 / 90%)'},
        bodyStyles: { padding: 0 },
    },
    {app: "EmulatorJS", appType: 'os', conteudo: EmulatorJS, icon: emulatorJs, customClose: true},
    {
        app: "paint",
        appType: 'os',
        enableResizing: false,
        conteudo: Paint,
        hideInStartMenu: true,
        cantMax: true,
        icon: brush,
        height: '100%',
        width: "100%",
        x: 0,
        y: 0,
    },
    {
        icon: handshake, 
        appType: 'os',
        conteudo: Credits,
        app: "credits",
        svgMask: {search: true}
    },
    {
        appType: 'os',
        app: "vm",
        link: 'https://ericaugusto-os.pages.dev?interframe=true',
        desktop: false,
        hideInStartMenu: true,
        icon: fav
    },
    {
        appType: 'project',
        desktop: true,
        
        app: "portfolio",
        link: 'https://ericaugusto.pages.dev',
        icon: portfolio
    },
    {app: "jdm_store", link: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FjpjNX650FS4XtJrolls9RW%2FJDM%3Fpage-id%3D%26type%3Ddesign%26node-id%3D1-6%26viewport%3D741%252C598%252C0.23%26t%3DfBBVvALWC6PAzlv0-1%26scaling%3Dscale-down-width%26mode%3Ddesign', appType: 'project', icon: jdm, desktopStyles: {img: {backgroundSize: '70%'}}},
    {app: "dino", link: 'https://chromedino.com/', appType: 'os',  icon: 'dino.ico'},
    {app: "browser", link: 'https://www.google.com/webhp?igu=1',         appType: 'os', icon: firefox},
    // {app: "discord_clone", appType: 'project', icon: discord, link: 'https://www.google.com/webhp?igu=1'},
    // {app: "finance", appType: 'project', icon: finance, conteudo: UnderDev},
    // {app: "recipe_book", appType: 'project', icon: cookBook, conteudo: UnderDev},
    {app: 'resume', icon: resume, appType: 'os', hideInStartMenu: true, desktop: true,  svgMask: {desktop: true, search: true}, conteudo: Resume, desktopStyles: {button: {textTransform: 'none'}, svg: {maskSize: '73%'}}, bodyStyles: {overflow: 'auto', height: 'calc(100% - 50px)'}, },
];
