import Button from "../Button/Button";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import styles from './Actions.module.scss'

import sunsetIcon from '../../../assets/taskbar/themes_icons/sunset.png'
import moonIcon from '../../../assets/taskbar/themes_icons/moon.png'
import cappuccinoIcon from '../../../assets/taskbar/themes_icons/cappuccino.png'
import brasilFlag from '../../../assets/taskbar/languages_icons/brazil_flag.svg'
import globeIcon from '../../../assets/taskbar/languages_icons/globe.svg'
import { useTheme } from "../../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import 'moment/dist/locale/pt-br';
import moment from "moment";

// Set the locale at the beginning of your file
function Actions(){
    const themeButtons = [
        {icon: sunsetIcon, action: 'light'},
        {icon: moonIcon, action: 'dark'},
        {icon: cappuccinoIcon, action: 'coffe'}
    ];
    const languageButtons = [
        {icon: brasilFlag, action: 'pt-BR', label: "PT-BR"},
        {icon: globeIcon, action: 'en', label: "EN"},
    ];
    const buttonStyles = {
        padding: "8px 10px",
    }

    const { t, i18n } = useTranslation();
    const [theme, setTheme] = useTheme();
    // TODO is it good to have global change inside a component?
    moment.locale(i18n.resolvedLanguage);
    const handleChangeTheme = (theme: string) => {
        setTheme(theme);
    }

    const handleChangeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        console.log(lang)
        moment.locale(lang.toLocaleLowerCase());
    }
    return(
        <Button styles={buttonStyles}>
            <div className={styles.actions}>
                <ButtonGroup selectedValue={theme} buttons={themeButtons} handleClick={handleChangeTheme} stylesProp={{width: "26px"}}></ButtonGroup>
                <hr style={{width: "25px"}} className="dashed_separator"></hr>
                <ButtonGroup selectedValue={i18n.resolvedLanguage} handleClick={handleChangeLanguage} buttons={languageButtons}></ButtonGroup>
            </div>
        </Button>
    )
}

export default Actions; 