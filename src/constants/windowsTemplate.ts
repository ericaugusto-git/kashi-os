import React from 'react';
import Cmd from "../StartMenu/components/Cmd/Cmd";
import Paint from "../StartMenu/components/Paint/Paint";
import Playlist from "../StartMenu/components/Playlist/Playlist";
import { WindowType } from "./window";
import playlistIcon from '../assets/startMenu/playlist.svg';
import cmd from '../assets/startMenu/cmd2.png'
import brush from '../assets/startMenu/brush.png'
import handshake from '../assets/startMenu/handshake.svg'

import perfil from "../assets/desktop/avatar.png";
import jdm from "../assets/desktop/jdm.png";
import discord from "../assets/desktop/disc.svg";
import cookBook from "../assets/desktop/food.svg";
import finance from "../assets/desktop/finance.png";

export const windowsTemplates: WindowType[] = [
    {
        app: "playlist",
        icon: playlistIcon,
        mask: '#eb4034',
        conteudo: Playlist, // Specify Playlist as a component type
        bodyStyles: { paddingRight: 0 },
        headerStyles: { paddingLeft: "25px" },
        appType: 'os',
        svgMask: {startMenu: true}
    },
    {
        app: "command_line",
        conteudo: Cmd,
        appType: 'os',
        icon: cmd,
    },
    {
        app: "paint",
        appType: 'os',
        enableResizing: false,
        conteudo: Paint,
        cantMax: true,
        icon: brush,
        height: "95dvh",
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
        desktopStyles: {height: '46px', width: '46px', backgroundSize: '100%'},
        icon: perfil,
    },
    {app: "jdm_store", appType: 'project', icon: jdm, desktopStyles: {backgroundSize: '70%'}},
    {app: "discord_clone", appType: 'project', icon: discord},
    {app: "finance", appType: 'project', icon: finance},
    {app: "recipe_book", appType: 'project', icon: cookBook},
];
