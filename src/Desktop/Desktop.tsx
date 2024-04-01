
import styles from "./Destop.module.scss";
import DesktopIcon from "./components/DesktopIcon/DesktopIcon";
import jdm from "../assets/desktop/jdm.png";
import discord from "../assets/desktop/discord.png";
import cookBook from "../assets/desktop/cook_book.png";
import finance from "../assets/desktop/finance.png";
import perfil from "../assets/desktop/perfil.png";

function Desktop(){
    const apps = [
        {app: "About me", icon: perfil, styles: {height: "46px", width: "46px"}},
        {app: "JDM Store", icon: jdm},
        {app: "Discord Clone", icon: discord},
        {app: "Recipe Book", icon: cookBook},
        {app: "Finance", icon: finance},
    ]
    return (
    <menu className={styles.desktop}>
        { apps.map(
                (app) => 
                <li key={app.app}>
                    <DesktopIcon stylesProp={app.styles} app={app}/>
                </li>
            ) 
        }
    </menu>
    ) 
}

export default Desktop;