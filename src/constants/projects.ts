import jdm from "../assets/desktop/jdm.png";
import discord from "../assets/desktop/discord.svg";
import cookBook from "../assets/desktop/cook_book.svg";
import finance from "../assets/desktop/finance.svg";
import { CSSProperties } from "react";


export const projects = [
    {app: "JDM Store", icon: jdm},
    {app: "Discord Clone", icon: discord},
    {app: "Recipe Book", icon: cookBook},
    {app: "Finance", icon: finance},
]

export type projectsType = {app: string, icon: string, styles?: CSSProperties, active?: boolean, width?: string, height?: string, x?: number, y?: number};