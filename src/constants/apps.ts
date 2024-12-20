import avatar from '@/assets/desktop/avatar.png';
import jdm from '@/assets/desktop/jdm.png';
import playlistIcon from '@/assets/startMenu/playlist.svg';
import firefox from "../assets/desktop/firefox.svg";
import brush from '../assets/startMenu/brush.png';
import cmd from '../assets/startMenu/cmd2.png';
import handshake from '../assets/startMenu/handshake.svg';
import emulatorJs from '/EmulatorJS.png';
import fav from '/favicon.ico';

// System Applications
export const FILE_EXPLORER: AppType = {
    app: 'file_explorer',
    appType: 'os',
    notUnique: true,
    hideInStartMenu: true,
    icon: 'folder.svg',
    componentPath: "@/Folder/Folder"
};

export const COMPUTER: AppType = {
    ...FILE_EXPLORER,
    app: 'computer',
    instanceName: 'file_explorer',
    desktop: true,
    thumbnail: 'computer.svg'
};

export const TERMINAL: AppType = {
    app: "command_line",
    notUnique: true,
    componentPath: "@/StartMenu/components/Cmd/Cmd",
    appType: 'os',
    icon: cmd,
    windowStyles: { backgroundColor: 'rgb(0 0 0 / 80%)' },
    bodyStyles: { padding: 0 }
};

export const PAINT: AppType = {
    app: "paint",
    appType: 'os',
    enableResizing: false,
    componentPath: "@/StartMenu/components/Paint/Paint",
    cantMax: true,
    icon: brush,
    height: '100%',
    width: "100%",
    x: 0,
    y: 0
};

export const AUDIO_PLAYER: AppType = {
    app: "audio_player",
    hideInStartMenu: true,
    componentPath: "@/Audio/Audio",
    appType: 'os',
    icon: 'audio_icon.svg'
};

// Media and Entertainment
export const PLAYLIST: AppType = {
    app: "playlist",
    icon: playlistIcon,
    hideInStartMenu: true,
    mask: '#eb4034',
    componentPath: "@/StartMenu/components/Playlist/Playlist",
    bodyStyles: { paddingRight: 0 },
    appType: 'os',
    svgMask: { startMenu: true },
    maxHeight: 415
};

export const EMULATOR: AppType = {
    app: "EmulatorJS",
    appType: 'os',
    componentPath: "@/EmulatorJS/EmulatorJS",
    icon: emulatorJs,
    customClose: true
};

export const DINO: AppType = {
    app: "dino",
    hideInStartMenu: true,
    link: 'https://chromedino.com/',
    appType: 'os',
    icon: 'dino.ico'
};

// Web and Browser
export const BROWSER: AppType = {
    app: "browser",
    link: 'https://www.google.com/webhp?igu=1',
    appType: 'os',
    icon: firefox
};

export const VM: AppType = {
    appType: 'os',
    app: "vm",
    link: 'https://ericaugusto-os.pages.dev?interframe=true',
    desktop: false,
    hideInStartMenu: true,
    icon: fav
};

// Personal and Portfolio
export const ABOUT_ME: AppType = {
    app: "about_me",
    appType: 'os',
    link: 'https://ericaugusto.pages.dev',
    icon: avatar,
    desktopStyles: {
        img: { backgroundSize: '100%' }
    }
};

export const CREDITS: AppType = {
    app: "credits",
    appType: 'os',
    componentPath: "@/StartMenu/components/Credits/Credits",
    icon: handshake,
    svgMask: { search: true }
};

// Projects
export const DISCORD_CLONE: AppType = {
    app: "discord_clone",
    appType: 'project',
    icon: 'projects/discourse.svg',
    desktopStyles: {
        img: { backgroundSize: '100%' }
    },
    componentPath: "@/UnderDev/UnderDev"
};

export const JDM_STORE: AppType = {
    app: "jdm_store",
    appType: 'project',
    link: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FjpjNX650FS4XtJrolls9RW%2FJDM%3Fpage-id%3D%26type%3Ddesign%26node-id%3D1-6%26viewport%3D741%252C598%252C0.23%26t%3DfBBVvALWC6PAzlv0-1%26scaling%3Dscale-down-width%26mode%3Ddesign',
    icon: jdm,
    desktopStyles: {
        img: { backgroundSize: '70%' }
    }
};

export const RECIPE_BOOK: AppType = {
    app: "recipe_book",
    appType: 'project',
    hideInStartMenu: true,
    icon: 'projects/cookbook.svg',
    componentPath: "@/UnderDev/UnderDev"
};

// Array of all windows, organized by category
export const APPS: AppType[] = [
    // System
    FILE_EXPLORER,
    COMPUTER,
    TERMINAL,
    PAINT,
    AUDIO_PLAYER,
    CREDITS,
    EMULATOR,

    // Web
    PLAYLIST,
    DINO,
    BROWSER,
    VM,
    ABOUT_ME,
    
    // Projects
    DISCORD_CLONE,
    JDM_STORE,
    RECIPE_BOOK
];import { CSSProperties } from "react"

type BaseProps = {closeBtnRefs?: Array<HTMLButtonElement | null>, closeRefIndex?: number};
// re renders where not working very well with the useFileSystem inside the dynamic component, so i pass the getFileUrl as a prop.
export type FileProps = {
    filePath?: string, 
    getFileUrl?: (filePath: string, mimeType?: string) => Promise<string>, 
    updateFile?: (filePath: string, newContent: string) => Promise<void>,
    listFiles?: (folderPath: string) => Promise<AppType[] | null>,
    folderPath?: string,
    fileList?: {[folderPath: string]: AppType[]}
}
type WindowProps = BaseProps & FileProps;
export type WindowConteudo = (props: WindowProps) => JSX.Element;

export type AppType = {
    // WINDOW CONFIG
    /** X position of the window */
    x?: number,
    /** Y position of the window */
    y?: number,
    /** Width of the window (can be px, % or other CSS units) */
    width?: string,
    /** Height of the window (can be px, % or other CSS units) */
    height?: string,
    /** Maximum width of the window in pixels */
    maxWidth?: number,
    /** Maximum height of the window in pixels */
    maxHeight?: number,
    /** If true, window cannot be maximized */
    cantMax?: boolean,
    /** Path to the thumbnail image, only for the desktop icon, on windows title bar the default app icon well be used*/
    thumbnail?: string,
    /** Path to the icon image */
    icon?: string,
    /** Metadata for media files (for now only audio files) */
    metadata?: {
        /** Title of the media */
        title?: string,
        /** Artist name */
        artist?: string,
        /** Album name */
        album?: string,
        /** Duration in seconds */
        duration?: number
    },
    /** Color of the SVG mask */
    mask?: string,
    /** Whether the window is currently active */
    active?: boolean,
    /** Whether the window is minimized */
    minimized?: boolean,
    /** Path to the folder */
    folderPath?: string,
    /** Name of the application */
    app: string,
    /** Unique identifier for the window */
    instanceName?: string,
    /** Type of the application */
    appType: "project" | "os" | "file",
    /** Whether the app should appear on desktop */
    desktop?: boolean,
    /** Whether to hide the app in start menu */
    hideInStartMenu?: boolean,
    /** SVG mask visibility settings */
    svgMask?: {
        /** Show in start menu */
        startMenu?: boolean,
        /** Show on desktop */
        desktop?: boolean,
        /** Show in search */
        search?: boolean
    },
    /** Additional window properties */
    props?: WindowProps,
    /** Path to the component to render */
    componentPath?: string,
    /** Window has custom close behavior, so it wont close by default (EmulatorJS uses it to save before close) */
    customClose?: boolean,
    /** Allow multiple instances */
    notUnique?: boolean,
    /** Path to unique icon */
    uniqueIcon?: string,
    /** Custom window styles */
    windowStyles?: CSSProperties,
    /** Custom window header styles */
    headerStyles?: CSSProperties,
    /** Custom window body styles */
    bodyStyles?: CSSProperties,
    /** Allow window resizing, default is true */
    enableResizing?: boolean,
    /** Custom desktop icon styles */
    desktopStyles?: {
        /** Button styles */
        button?: CSSProperties,
        /** Image styles */
        img?: CSSProperties,
        /** SVG styles */
        svg?: CSSProperties
    },
    /** URL for iframe content */
    link?: string
}