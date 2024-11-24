import avatar from '@/assets/desktop/avatar.png';
import playlistIcon from '@/assets/startMenu/playlist.svg';
import firefox from "../assets/desktop/firefox.svg";
import resume from "../assets/desktop/resume.svg";
import brush from '../assets/startMenu/brush.png';
import cmd from '../assets/startMenu/cmd2.png';
import handshake from '../assets/startMenu/handshake.svg';
import { WindowType } from "./window";
import emulatorJs from '/EmulatorJS.png';
import fav from '/favicon.ico';
import jdm from '@/assets/desktop/jdm.png';

export const cmdWindow: WindowType = {
    app: "command_line",
    notUnique: true,
    componentPath: "@/StartMenu/components/Cmd/Cmd",
    appType: 'os',
    icon: cmd,
    windowStyles: { backgroundColor: 'rgb(0 0 0 / 80%)'},
    bodyStyles: { padding: 0 },
}

export const windowsTemplates: WindowType[] = [
    {app: 'file_explorer', appType: 'os', icon: 'folder.svg', headerStyles: {background: 'rgb(var(--theme-color))', transition: 'background-color var(--theme-transition-ms) linear'},  componentPath: "@/Folder/Folder"},
    {app: 'computer', appType: 'os', desktop: true, uniqueName: 'file_explorer', uniqueIcon: 'folder.svg', icon: 'computer.svg', headerStyles: {background: 'rgb(var(--theme-color))', transition: 'background-color var(--theme-transition-ms) linear'},  componentPath: "@/Folder/Folder"},
    {app: "about_me",appType: 'os', hideInStartMenu: true,      link: 'https://ericaugusto.pages.dev',
        desktop: true, icon: avatar,  desktopStyles: {img: {backgroundSize: '100%'}}},
    cmdWindow,
    {
        app: "playlist",
        icon: playlistIcon,
        hideInStartMenu: true,
        mask: '#eb4034',
        componentPath: "@/StartMenu/components/Playlist/Playlist",
        bodyStyles: { paddingRight: 0 },
        headerStyles: { paddingLeft: "25px" },
        appType: 'os',
        svgMask: {startMenu: true},
        maxHeight: 415
    },

    {app: "EmulatorJS", appType: 'os', componentPath: "@/EmulatorJS/EmulatorJS", icon: emulatorJs, customClose: true},
    {
        app: "paint",
        appType: 'os',
        enableResizing: false,
        componentPath: "@/StartMenu/components/Paint/Paint",
        cantMax: true,
        icon: brush,
        height: '100%',
        width: "100%",
        x: 0,
        y: 0,
    },
    {app: "browser", link: 'https://www.google.com/webhp?igu=1', appType: 'os', icon: firefox},
    {
        icon: handshake, 
        
        appType: 'os',
        componentPath: "@/StartMenu/components/Credits/Credits",
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
    {app: "dino", hideInStartMenu: true, link: 'https://chromedino.com/', appType: 'os',  icon: 'dino.ico'},
    {app: "audio_player", hideInStartMenu: true, componentPath: "@/Audio/Audio", appType: 'os', icon: 'audio_icon.svg'},
    // {app: "finance", appType: 'project', icon: finance, conteudo: UnderDev},
    {app: 'resume', icon: resume, appType: 'os', hideInStartMenu: true, desktop: false, svgMask: {desktop: true, search: true}, componentPath: "@/Resume/Resume", desktopStyles: {button: {textTransform: 'none'}, svg: {maskSize: '73%'}}, bodyStyles: {overflow: 'auto', height: 'calc(100% - 50px)'}, },
    
    {app: "discord_clone", appType: 'project', icon: 'projects/discourse.svg', desktopStyles: {img: {backgroundSize: '100%'}}, componentPath: "@/UnderDev/UnderDev"},
    {app: "jdm_store",  link: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FjpjNX650FS4XtJrolls9RW%2FJDM%3Fpage-id%3D%26type%3Ddesign%26node-id%3D1-6%26viewport%3D741%252C598%252C0.23%26t%3DfBBVvALWC6PAzlv0-1%26scaling%3Dscale-down-width%26mode%3Ddesign', appType: 'project', icon: jdm, desktopStyles: {img: {backgroundSize: '70%'}}},
    {app: "recipe_book", appType: 'project', hideInStartMenu: true, icon: 'projects/cookbook.svg', componentPath: "@/UnderDev/UnderDev"},
];

