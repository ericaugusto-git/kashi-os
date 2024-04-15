import React from 'react';
import Cmd from "../StartMenu/components/Cmd/Cmd";
import Paint from "../StartMenu/components/Paint/Paint";
import Playlist from "../StartMenu/components/Playlist/Playlist";
import { WindowType } from "./window";
import playlistIcon from '../assets/startMenu/playlist.png';
import cmd from '../assets/startMenu/cmd.png'
import brush from '../assets/startMenu/brush.png'
import handshake from '../assets/startMenu/handshake.svg'

import perfil from "../assets/desktop/perfil.png";
import jdm from "../assets/desktop/jdm.png";
import discord from "../assets/desktop/discord.svg";
import cookBook from "../assets/desktop/cook_book.svg";
import finance from "../assets/desktop/finance.svg";

export const windowsTemplates: WindowType[] = [
    {
        app: "playlist",
        icon: playlistIcon,
        conteudo: Playlist, // Specify Playlist as a component type
        bodyStyles: { paddingRight: 0 },
        headerStyles: { paddingLeft: "25px" },
        appType: 'os'
    },
    {
        app: "command line",
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
    app:"Credits"
    },
    {
        appType: 'os',
        desktop: true,
        app: "About me",
        icon: perfil,
    },
    {app: "JDM Store",appType: 'project', icon: jdm},
    {app: "Discord Clone", appType: 'project', icon: discord},
    {app: "Recipe Book",appType: 'project', icon: cookBook},
    {app: "Finance",appType: 'project', icon: finance},
];
