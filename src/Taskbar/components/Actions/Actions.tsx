import Button from "../Button/Button";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import styles from './Actions.module.scss'

import sunsetIcon from '../../../assets/taskbar/themes_icons/sunset.png'
import moonIcon from '../../../assets/taskbar/themes_icons/moon.png'
import cappuccinoIcon from '../../../assets/taskbar/themes_icons/cappuccino.png'
import brasilFlag from '../../../assets/taskbar/languages_icons/brazil_flag.svg'
import globeIcon from '../../../assets/taskbar/languages_icons/globe.svg'
import { useTheme } from "../../../contexts/ThemeContext";

function Actions(){
    const themeButtons = [
        {icon: sunsetIcon, action: 'light'},
        {icon: moonIcon, action: 'dark'},
        {icon: cappuccinoIcon, action: 'coffe'}
    ];
    const languageButtons = [
        {icon: brasilFlag, action: 'pt', label: "PT-BR"},
        {icon: globeIcon, action: 'eng', label: "ENG"},
    ];
    const buttonStyles = {
        padding: "8px 10px",
    }

    const [theme, setTheme] = useTheme();
    const handleChangeTheme = (theme: string) => {
        setTheme(theme)
    }

    return(
        <Button styles={buttonStyles}>
            <div className={styles.actions}>
                <ButtonGroup selectedValue={theme} buttons={themeButtons} handleClick={handleChangeTheme} stylesProp={{width: "26px"}}></ButtonGroup>
                <hr style={{width: "25px"}} className="dashed_separator"></hr>
                <ButtonGroup selectedValue="eng" buttons={languageButtons}></ButtonGroup>
            </div>
        </Button>
    )
}

export default Actions; 